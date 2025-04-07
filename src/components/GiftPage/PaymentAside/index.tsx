"use client";

import { usePayment } from '@/contexts/PaymentContext';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import { Info, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { paymentAmountSchema } from '@/schemas/paymentAmountSchema';
import { CurrencyMask } from '@/utils/masks';
import InputTextArea from '@/components/InputTextArea';

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
  const { setAmount, setMaxAmount, setMessage, setCheckoutItem } = usePayment();

  const methods = useForm({
    resolver: zodResolver(paymentAmountSchema(maxAmount)),
    defaultValues: {
      amount: undefined,
      message: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = methods;

  const handleToSharing = () => {
    // router.push(`http://${slug}.localhost:3000/invitation/gifts/${giftId}`);
    router.push(`https://${slug}.meuchadigital.com/invitation/gifts/${giftId}`);
  };

  const onSubmit = (data: { amount: number, message?: string }) => {
    setAmount(data.amount);
    setMaxAmount(maxAmount);
    setMessage(data.message ?? "");
    setCheckoutItem(giftName);

    if (isInvitationPage === true) {
      // router.push(`http://${slug}.localhost:3000/invitation/gifts/${giftId}/checkout-${giftName}`);
      router.push(`https://${slug}.meuchadigital.com/invitation/gifts/${giftId}/checkout-${giftName}`);
    } else {
      router.push(`/lists/${slug}/gifts/${giftId}/checkout-${giftName}`);
    }
  };

  return (
    <FormProvider {...methods}>
      <aside className="sticky top-6 h-fit bg-white dark:bg-gray-dark rounded-lg p-6 border border-gray-dark">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          <h2 className="text-lg font-semibold text-text-primary mb-4">Pagamento</h2>

          {isUserOwner ? (
            <>
              <div className="mt-6">
                <Button widthFull onClick={handleToSharing}>
                  <ArrowRight size={20} />
                  Ver como convidado
                </Button>
              </div>

              <div className="mt-6 flex items-start gap-3">
                <Info size={20} className="text-text-secondary flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-text-secondary">
                    Compartilhe o link para que outras pessoas possam contribuir com o presente.
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
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

                <InputTextArea
                  label="Mensagem (opcional)"
                  placeholder="Digite sua mensagem"
                  register={register("message")}
                  error={isSubmitted ? errors.message?.message : undefined}
                  maxLength={150}
                  name='message'
                  description="Essa mensagem será enviada junto com sua contribuição."
                />
              </div>

              <div className="mt-6">
                <Button widthFull type="submit">Pagar</Button>
              </div>

              <div className="mt-6 flex items-start gap-3">
                <Info size={20} className="text-text-secondary flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-text-secondary">
                    Pagamento seguro garantido pelo Efi Bank.
                  </p>
                  <p className="text-sm text-text-secondary">
                    Ao clicar em &quot;Pagar&quot;, você concorda com os{" "}
                    <Link href="/terms" className="text-primary hover:underline">
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