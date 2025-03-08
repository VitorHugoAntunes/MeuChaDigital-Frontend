"use client";

import Button from "@/components/Button";
import Divider from "@/components/Divider";
import { ClipboardCopy } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useGetCharge, useCreateDefaultCharge, useCreateGuestCharge } from '@/hooks/charge';
import { useAuth } from "@/contexts/AuthContext";
import { Slide, ToastContainer, toast } from "react-toastify";
import { useParams } from "next/navigation";
import calculateTimeRemaining from "@/utils/calculateTimeRemaining";
import Image from "next/image";

interface PixPaymentProps {
  total: number;
}

export default function PixPayment({ total }: PixPaymentProps) {
  const [timeRemaining, setTimeRemaining] = useState<string>("00:00:00");
  const params = useParams();

  const paramsGiftId = params.giftId as string || params.gift as string || params.id as string;

  console.log(paramsGiftId);

  const [isGenerating, setIsGenerating] = useState(false);

  const { user, isAuthenticated } = useAuth();

  const [localId, setLocalId] = useState<string | null>(() => {
    const savedCharge = localStorage.getItem(`charge.${paramsGiftId}`);
    return savedCharge ? JSON.parse(savedCharge).localId : null;
  });

  const { data: charge, isLoading } = useGetCharge(localId, paramsGiftId);

  const createDefaultChargeMutation = useCreateDefaultCharge();
  const createGuestChargeMutation = useCreateGuestCharge();

  const prevTimeRemainingRef = useRef<string>("00:00:00");

  useEffect(() => {
    if (!charge?.expirationDate) return;

    const stopInterval = calculateTimeRemaining(charge.expirationDate, setTimeRemaining);

    return () => stopInterval();
  }, [charge?.expirationDate]);

  useEffect(() => {
    if (prevTimeRemainingRef.current !== "00:00:00" && timeRemaining === "00:00:00" && localId) {
      console.log("Tempo expirado!");

      setLocalId(null);
      localStorage.removeItem(`charge.${paramsGiftId}`);
    }

    prevTimeRemainingRef.current = timeRemaining;
  }, [timeRemaining, localId, paramsGiftId]);

  const handleGenerateCharge = async () => {
    setIsGenerating(true);

    const chargeData = {
      expiration: 3600, // 1 hora
      value: total.toString(),
      pixKey: "03f46041-ace4-4ade-b074-faf9d0b78e5f",
      requestPayer: "Descrição do pagamento",
      giftId: paramsGiftId,
    };

    try {
      let response;
      if (isAuthenticated) {
        response = await createDefaultChargeMutation.mutateAsync({
          ...chargeData,
          payerId: user?.id || "",
        });
      } else {
        response = await createGuestChargeMutation.mutateAsync({
          ...chargeData,
          isGuest: true,
        });
      }

      setLocalId(response.loc.id);
    } catch (error) {
      toast.error("Erro ao gerar cobrança. Tente novamente.");
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  function handleCopyCode() {
    navigator.clipboard.writeText(charge?.pixKey || "");
    toast.success("Código copiado para a área de transferência.");
  }

  if (!localId && timeRemaining === "00:00:00") {
    return (
      <div className="text-center">
        <h2 className="text-lg font-bold text-text-primary">Pagamento via Pix</h2>
        <p className="text-sm text-gray-500 mb-4">
          Gere um QR Code exclusivo para realizar o pagamento via Pix.
        </p>

        <Button widthFull onClick={handleGenerateCharge} disabled={isGenerating}>
          {isGenerating ? "Gerando..." : "Gerar QR Code"}
        </Button>

        {createDefaultChargeMutation.isError || createGuestChargeMutation.isError && <p className="text-sm text-danger mt-4">Erro ao gerar cobrança. Tente novamente.</p>}
      </div>
    );
  }

  return (
    <div className="text-center">
      <ToastContainer position="top-right" hideProgressBar={true} autoClose={3000} transition={Slide} />

      {isLoading ? (
        <div className="animate-pulse">
          <div className="h-6 w-48 bg-gray-200 rounded mx-auto mb-4 animate-pulse"></div> {/* Título */}
          <div className="h-4 w-64 bg-gray-200 rounded mx-auto mb-6 animate-pulse"></div> {/* Descrição */}
          <div className="w-48 h-48 bg-gray-200 rounded-lg mx-auto animate-pulse"></div> {/* QR Code Skeleton */}
          <Divider />
          <div className="h-4 w-56 bg-gray-200 rounded mx-auto mt-4 mb-6 animate-pulse"></div> {/* Texto de expiração */}
          <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse"></div> {/* Botão de copiar código */}
        </div>
      ) : (
        charge && timeRemaining !== "00:00:00" && localId && (
          <>
            <h2 className="text-lg font-bold text-text-primary">Escaneie o QR Code</h2>
            <p className="text-sm text-gray-500">
              Escaneie o QR Code com o aplicativo do seu banco para realizar o pagamento.
            </p>

            <Image src={charge.qrCode} width={200} height={200} alt="QR Code" className="mx-auto mt-4" />

            <Divider />

            <p className="text-sm text-gray-500 mb-4">
              Este QR Code expira em <strong>{timeRemaining}</strong>.
              <br />
              Após a expiração, você precisará gerar um novo QR Code.
            </p>

            <Button widthFull onClick={handleCopyCode}>
              <ClipboardCopy size={20} /> Copiar código
            </Button>
          </>
        )
      )}
    </div>
  );
}