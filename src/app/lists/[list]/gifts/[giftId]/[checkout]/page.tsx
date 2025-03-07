"use client";

import Card from "@/components/Card";
import BankSlipPayment from "@/components/CheckoutPage/BankSlipPayment";
import CreditCardPayment from "@/components/CheckoutPage/CreditCardPayment";
import InfoBox from "@/components/CheckoutPage/InfoBox";
import OrderSummary from "@/components/CheckoutPage/OrderSummary";
import PixPayment from "@/components/CheckoutPage/PixPayment";
import CheckoutPaymentType from "@/components/CheckoutPaymentType";
import Divider from "@/components/Divider";
import { ShieldCheck, ReceiptText } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

export default function CheckoutPage() {
  const methods = useForm<{ type: string }>({
    defaultValues: { type: "" },
  });

  return (
    <FormProvider {...methods}>
      <Checkout />
    </FormProvider>
  );
}

function Checkout() {
  const { watch } = useFormContext();
  const selectedPaymentType = watch("type") as "PIX" | "CREDIT_CARD" | "BANK_SLIP" | undefined;

  const searchParams = useSearchParams();
  const amount = Number(searchParams.get("amount")) || 0;

  const feePercentage = selectedPaymentType
    ? {
      PIX: 0.05,
      CREDIT_CARD: 0.07,
      BANK_SLIP: 0.03,
    }[selectedPaymentType] || 0
    : 0; // Se nenhum tipo de pagamento estiver selecionado, a taxa é 0

  let fee = amount * feePercentage;

  if (selectedPaymentType && fee < 0.02) {
    fee = 0.02;
  }

  const total = amount + fee;

  return (
    <main className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 py-6 px-4 md:px-8 w-full">
      <section className="md:col-span-2">
        <Card>
          <header className="mb-6">
            <h1 className="text-2xl font-bold text-text-primary">Finalizar pagamento</h1>
          </header>

          <OrderSummary amount={amount} fee={fee} total={total} />

          <Divider />

          <CheckoutPaymentType />

          <Divider />

          <InfoBox
            icon={<ShieldCheck size={20} className="text-success" />}
            text={
              <>
                Pagamento seguro garantido pelo Efi Bank.<br />
                Ao efetuar o pagamento, você concorda com os {" "}
                <Link href="#" className="text-primary underline">termos de serviço</Link> do Efi Bank.
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