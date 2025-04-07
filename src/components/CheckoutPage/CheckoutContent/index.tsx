"use client";

import Card from "@/components/Card";
import BankSlipPayment from "@/components/CheckoutPage/BankSlipPayment";
import CreditCardPayment from "@/components/CheckoutPage/CreditCardPayment";
import InfoBox from "@/components/CheckoutPage/InfoBox";
import OrderSummary from "@/components/CheckoutPage/OrderSummary";
import PixPayment from "@/components/CheckoutPage/PixPayment";
import CheckoutPaymentType from "@/components/CheckoutPaymentType";
import Divider from "@/components/Divider";
import Modal from "@/components/Modal";
import { usePayment } from "@/contexts/PaymentContext";
import { useCreateContribution } from "@/hooks/contribution";
import usePaymentWebSocket from "@/hooks/paymentWebsocket";
import { ShieldCheck, ReceiptText } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

interface CheckoutContentProps {
  isInvitationPage?: boolean;
}

export default function CheckoutContent({ isInvitationPage }: CheckoutContentProps) {
  const { amount, maxAmount, message, checkoutItem } = usePayment();
  const { mutateAsync } = useCreateContribution();
  const router = useRouter();
  const params = useParams();

  const paramsGiftId = params.giftId as string || params.gift as string || params.id as string;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"paymentConfirmation">("paymentConfirmation");

  const { paymentData } = usePaymentWebSocket();

  const openPaymentConfirmationModal = () => {
    setModalType("paymentConfirmation");
    setIsModalOpen(true);
  }

  const methods = useForm<{ type: string }>({
    defaultValues: { type: "" },
  });

  const [hasProcessed, setHasProcessed] = useState(false);

  useEffect(() => {
    if (paymentData && paymentData.transactionId && paymentData.amount && !hasProcessed) {
      const txId = paymentData.transactionId;
      const value = paymentData.amount;

      const data = {
        txId,
        value: Number(value),
        message: message || "",
      };

      setHasProcessed(true);
      mutateAsync(data);

      openPaymentConfirmationModal();

      localStorage.removeItem(`charge.${paramsGiftId}`);
    }
  }, [paymentData, paramsGiftId, message, mutateAsync, hasProcessed]);

  if (amount <= 0 || amount > maxAmount) {
    router.back();
    return null;
  }

  return (
    <FormProvider {...methods}>
      <Checkout checkoutItem={checkoutItem} isInvitationPage={isInvitationPage} amount={amount} message={message || ""} />
      {isModalOpen && modalType === "paymentConfirmation" && (
        <Modal
          modalType="paymentConfirmation"
          paymentData={paymentData ? {
            ...paymentData,
            additionalInfo: {
              ...paymentData.additionalInfo,
              payer: {
                ...paymentData.additionalInfo.payer,
                name: paymentData.additionalInfo.payer.name || "N/A"
              }
            }
          } : undefined}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </FormProvider>
  );
}

interface CheckoutProps {
  isInvitationPage?: boolean;
  checkoutItem: string;
  amount: number;
  message: string;
}

function Checkout({ isInvitationPage, checkoutItem, amount, message }: CheckoutProps) {
  const { watch } = useFormContext();
  const selectedPaymentType = watch("type") as "PIX" | "CREDIT_CARD" | "BANK_SLIP" | undefined;

  const feePercentage = selectedPaymentType
    ? {
      PIX: 0.05,
      CREDIT_CARD: 0.07,
      BANK_SLIP: 0.03,
    }[selectedPaymentType] || 0
    : 0;

  let fee = amount * feePercentage;

  if (selectedPaymentType && fee < 0.02) {
    fee = 0.02;
  }

  const total = amount + fee;

  return (
    <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:mt-8 py-6 w-full">
      <section className="md:col-span-2">
        <Card>
          <header className="mb-6">
            <h1 className="text-2xl font-bold text-text-primary">Finalizar pagamento</h1>
            {isInvitationPage && (
              <p className="text-text-secondary mt-2">
                Você está contribuindo como convidado. Obrigado pela sua participação!
              </p>
            )}
          </header>

          <OrderSummary checkoutItem={checkoutItem} amount={amount} fee={fee} total={total} />

          <Divider />

          {message && message !== "" && (
            <>
              <div className="mt-6">
                <div className="flex flex-col gap-1 font-bold">
                  <p className="text-sm text-text-primary">
                    Mensagem:
                  </p>
                  <article className="text-sm text-text-secondary text-wrap bg-background rounded-lg p-4 border dark:border-none">
                    <p className="text-md text-text-primary">
                      {message}
                    </p>
                  </article>
                </div>
                <p className="text-md text-text-secondary mt-4">
                  Sua mensagem será enviada junto com o pagamento.
                </p>
              </div>
              <Divider />
            </>
          )}


          <CheckoutPaymentType anchor="#payment" />

          <Divider />

          <InfoBox
            icon={<ShieldCheck size={20} className="text-success" />}
            text={
              <>
                Pagamento seguro garantido pelo Efi Bank.<br />
                Ao efetuar o pagamento, você concorda com os {" "}
                <Link href="https://sejaefi.com.br/termos-e-contratos" className="text-primary underline">termos de serviço</Link> do Efi Bank.
              </>
            }
          />

          <InfoBox
            icon={<ReceiptText size={20} className="text-warning" />}
            text="As taxas de serviço estão inclusas no pagamento. Essas taxas são referentes ao processamento do pagamento e não são reembolsáveis."
          />
        </Card>
      </section>

      {selectedPaymentType && (
        <aside className="sticky top-6 h-fit">
          <Card>
            {selectedPaymentType === "PIX" && <PixPayment total={total} />}
            {selectedPaymentType === "CREDIT_CARD" && <CreditCardPayment total={total} />}
            {selectedPaymentType === "BANK_SLIP" && <BankSlipPayment total={total} />}
          </Card>
        </aside>
      )}
    </main>
  );
}