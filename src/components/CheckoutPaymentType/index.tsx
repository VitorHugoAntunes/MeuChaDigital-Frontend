"use client";

import { useFormContext } from "react-hook-form";
import EventTypeOption from "@/components/EventTypeOption";
import { QrCode, CreditCard, Barcode } from "lucide-react";

export default function CheckoutPaymentType() {
  const {
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext();

  const selectedEventType = watch("type");

  // Mapeia os ícones para cada opção
  const paymentOptions = [
    { label: "Pix", value: "PIX", icon: <QrCode /> },
    { label: "Cartão de Crédito", value: "CREDIT_CARD", icon: <CreditCard /> },
    { label: "Boleto", value: "BANK_SLIP", icon: <Barcode /> },
  ];

  return (
    <div className="flex flex-col mt-4">
      <label className="block text-sm font-bold text-gray-700">Forma de pagamento</label>
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
    </div>
  );
}
