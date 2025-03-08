"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { Info, Share2 } from "lucide-react";
import Link from "next/link";
import { paymentAmountSchema } from "@/schemas/paymentAmountSchema";

interface PaymentAsideProps {
  isUserOwner: boolean;
  slug: string;
  giftId: string;
  giftName: string;
  maxAmount: number;
  isInvitationPage?: boolean;
}

export default function PaymentAside({ isUserOwner, slug, giftId, giftName, maxAmount, isInvitationPage }: PaymentAsideProps) {
  console.log("IS INVITATION PAGE:", isInvitationPage);
  console.log("maxAmount:", maxAmount);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(paymentAmountSchema(maxAmount)), defaultValues: { amount: 0 } });

  const onSubmit = (data: { amount: number }) => {
    console.log("Pagamento enviado:", data);
    console.log("isso e uma isInvitationPage?", isInvitationPage);

    if (isInvitationPage === true) {
      console.log("vai redirecionar para invitation");
      router.push(`http://${slug}.localhost:3000/invitation/gifts/${giftId}/checkout-${giftName}?amount=${data.amount}`);
    } else {
      console.log("vai redirecionar para lists");
      router.push(`/lists/${slug}/gifts/${giftId}/checkout-${giftName}?amount=${data.amount}`);
    }
  };

  return (
    <aside className="sticky top-6 h-fit bg-white rounded-lg p-6 border border-gray-200">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <h2 className="text-lg font-semibold text-text-primary mb-4">Pagamento</h2>

        <div>
          <p className="text-md text-text-secondary mb-4">
            Contribua com o valor que deseja pagar, você pode pagar o valor total ou parcial.
          </p>

          <InputField
            label="Valor"
            type="number"
            placeholder="R$ 0,00"
            min={0.01}
            max={maxAmount}
            register={
              {
                ...register("amount",
                  {
                    valueAsNumber: true,
                    required: "O valor é obrigatório",
                    max:
                      { value: maxAmount, message: "O valor não pode ser maior que o valor total do presente" }
                  })
              }}
            error={errors.amount?.message}
          />
        </div>

        {isUserOwner ? (
          <>
            <div className="mt-6">
              <Button widthFull type="submit">
                <Share2 size={20} />
                Compartilhar link
              </Button>
            </div>

            <div className="mt-6 flex items-start gap-3">
              <Info size={20} className="text-gray-600 flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm text-gray-600">
                  Compartilhe o link para que outras pessoas possam contribuir com o presente.
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mt-6">
              <Button widthFull type="submit">Pagar</Button>
            </div>

            <div className="mt-6 flex items-start gap-3">
              <Info size={20} className="text-gray-600 flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm text-gray-600">
                  Pagamento seguro garantido pelo Efi Bank
                </p>
                <p className="text-sm text-gray-600">
                  Ao clicar em &quot;Pagar&quot;, você concorda com os{" "}
                  <Link href="#" className="text-primary hover:underline">
                    Termos de Uso.
                  </Link>
                </p>
              </div>
            </div>
          </>
        )}
      </form>
    </aside>
  );
}
