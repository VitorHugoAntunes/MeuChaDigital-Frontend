"use client";

import { useFormContext } from "react-hook-form";
import EventTypeOption from "@/components/EventTypeOption";
import { QrCode, CreditCard, Barcode } from "lucide-react";
import Link from "next/link";

interface CheckoutPaymentTypeProps {
  anchor: string;
}

export default function CheckoutPaymentType({ anchor }: CheckoutPaymentTypeProps) {
  const {
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext();

  const selectedEventType = watch("type");

  const paymentOptions = [
    { label: "Pix", value: "PIX", icon: <QrCode /> },
    { label: "Cartão de Crédito", value: "CREDIT_CARD", icon: <CreditCard /> },
    { label: "Boleto", value: "BANK_SLIP", icon: <Barcode /> },
  ];

  const content = (
    <>
      <label className="block text-sm font-bold text-gray-700 dark:text-text-primary">Forma de pagamento</label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-1">
        {paymentOptions.map(({ label, value, icon }) => (
          <EventTypeOption
            key={value}
            label={label}
            value={value}
            icon={icon}
            selected={selectedEventType}
            onSelect={(value) => {
              setValue("type", value, { shouldValidate: true });
              trigger("type");
            }}
          />
        ))}
      </div>
      {errors.type?.message && (
        <span className="text-danger text-sm mt-1">{errors.type.message.toString()}</span>
      )}
    </>
  );

  return (
    <>
      <div className="block md:hidden">
        <Link href={anchor} className="flex flex-col mt-4">
          {content}
        </Link>
      </div>

      <div className="hidden md:block mt-4">
        {content}
      </div>
    </>
  );
}