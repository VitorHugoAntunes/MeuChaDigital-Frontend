"use client";

import Button from "@/components/Button";
import Divider from "@/components/Divider";
import { ClipboardCopy } from "lucide-react";
import { useEffect, useState } from "react";
import { useGetCharge, useCreateDefaultCharge, useCreateGuestCharge } from '@/hooks/charge';
import { useAuth } from "@/contexts/AuthContext";
import { Slide, ToastContainer, toast } from "react-toastify";
import { useParams, useSearchParams } from "next/navigation";
import calculateTimeRemaining from "@/utils/calculateTimeRemaining";
import Image from "next/image";

export default function PixPayment() {
  const [timeRemaining, setTimeRemaining] = useState<string>("00:00:00");
  const searchParams = useSearchParams();
  const params = useParams();

  const paramsGiftId = params.giftId as string;
  const paramsAmount = Number(searchParams.get("amount")) || 0;

  const [isGenerating, setIsGenerating] = useState(false);

  const { user, isAuthenticated } = useAuth();

  const [localId, setLocalId] = useState<string | null>(() => {
    const savedCharge = localStorage.getItem(`charge.${paramsGiftId}`);
    return savedCharge ? JSON.parse(savedCharge).localId : null;
  });

  const { data: charge, isLoading, isError } = useGetCharge(localId, paramsGiftId);

  const createDefaultChargeMutation = useCreateDefaultCharge();
  const createGuestChargeMutation = useCreateGuestCharge();

  useEffect(() => {
    if (!charge?.expirationDate) return;

    const stopInterval = calculateTimeRemaining(charge.expirationDate, setTimeRemaining);

    return () => stopInterval();
  }, [charge?.expirationDate]);

  const handleGenerateCharge = async () => {
    setIsGenerating(true);

    const chargeData = {
      expiration: 3600,
      value: paramsAmount.toString(),
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
      localStorage.setItem(`charge.${paramsGiftId}`, JSON.stringify({ localId: response.loc.id, giftId: paramsGiftId }));
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

  if (!localId) {
    return (
      <div className="text-center">
        <h2 className="text-lg font-bold text-text-primary">Pagamento via Pix</h2>
        <p className="text-sm text-gray-500 mb-4">
          Gere um QR Code exclusivo para realizar o pagamento via Pix.
        </p>

        <Button widthFull onClick={handleGenerateCharge} disabled={isGenerating}>
          {isGenerating ? "Gerando..." : "Gerar QR Code"}
        </Button>
      </div>
    );
  }

  return (
    <div className="text-center">
      <ToastContainer position="top-right" hideProgressBar={true} autoClose={3000} transition={Slide} />
      {isLoading && <p>Carregando cobrança...</p>}

      {!isLoading && charge && (
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
      )}

      {isError && <p className="text-sm text-red-500 mt-4">Erro ao carregar a cobrança. Tente novamente.</p>}
    </div>
  );
}