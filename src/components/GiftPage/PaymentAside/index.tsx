"use client";

import { usePayment } from '@/contexts/PaymentContext';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import { Info, Share2 } from 'lucide-react';
import Link from 'next/link';
import { paymentAmountSchema } from '@/schemas/paymentAmountSchema';
import { CurrencyMask } from '@/utils/masks';

interface PaymentAsideProps {
  isUserOwner: boolean;
  slug: string;
  giftId: string;
  giftName: string;
  maxAmount: number;
  isInvitationPage?: boolean;
}

export default function PaymentAside({ isUserOwner, slug, giftId, giftName, maxAmount, isInvitationPage }: PaymentAsideProps) {
  const router = useRouter();
  const { setAmount, setMaxAmount, setCheckoutItem } = usePayment();

  const methods = useForm({
    resolver: zodResolver(paymentAmountSchema(maxAmount)),
    defaultValues: { amount: undefined },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = methods;

  const onSubmit = (data: { amount: number }) => {
    setAmount(data.amount);
    setMaxAmount(maxAmount);
    setCheckoutItem(giftName);

    if (isInvitationPage === true) {
      router.push(`http://${slug}.localhost:3000/invitation/gifts/${giftId}/checkout-${giftName}`);
    } else {
      router.push(`/lists/${slug}/gifts/${giftId}/checkout-${giftName}`);
    }
  };

  return (
    <FormProvider {...methods}>
      <aside className="sticky top-6 h-fit bg-white rounded-lg p-6 border border-gray-200">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          <h2 className="text-lg font-semibold text-text-primary mb-4">Pagamento</h2>

          <div>
            <p className="text-md text-text-secondary mb-4">
              Contribua com o valor que deseja pagar, você pode pagar o valor total ou parcial.
            </p>

            <InputField
              label="Valor"
              type="text"
              placeholder="R$ 0,00"
              register={register("amount", {
                required: "O valor é obrigatório",
                setValueAs: (value) => {
                  const numericValue = Number(value.replace(/\D/g, "")) / 100;
                  return isNaN(numericValue) || numericValue === 0 ? undefined : numericValue;
                },
              })}
              error={isSubmitted ? errors.amount?.message : undefined}
              isNumeric={true}
              mask={CurrencyMask}
              min={0.01}
              max={maxAmount}
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
    </FormProvider>
  );
}