"use client";

import Card from "@/components/Card";
import BankSlipPayment from "@/components/Checkout/BankSlipPayment";
import CreditCardPayment from "@/components/Checkout/CreditCardPayment";
import InfoBox from "@/components/Checkout/InfoBox";
import OrderSummary from "@/components/Checkout/OrderSummary";
import PixPayment from "@/components/Checkout/PixPayment";
import CheckoutPaymentType from "@/components/CheckoutPaymentType";
import Divider from "@/components/Divider";
import { ShieldCheck, ReceiptText } from "lucide-react";
import Link from "next/link";
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
  const selectedPaymentType = watch("type");

  return (
    <main className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 py-6 px-4 md:px-8 w-full">
      <section className="md:col-span-2">
        <Card>
          <header className="mb-6">
            <h1 className="text-2xl font-bold text-text-primary">Finalizar pagamento</h1>
          </header>

          <OrderSummary />

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
            {selectedPaymentType === "PIX" && <PixPayment />}
            {selectedPaymentType === "CREDIT_CARD" && <CreditCardPayment />}
            {selectedPaymentType === "BANK_SLIP" && <BankSlipPayment />}
          </Card>
        </aside>
      )}
    </main>
  );
}