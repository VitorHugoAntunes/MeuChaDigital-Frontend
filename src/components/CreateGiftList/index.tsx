"use client";

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams, useRouter } from 'next/navigation';
import Step1 from './Step_1';
import Step2 from './Step_2';
import Button from '../Button';
import { eventSchema, EventFormData } from '../../schemas/createGiftListValidator';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { useCreateGiftList, useGiftListsByUser } from '@/hooks/giftLists';

export default function CreateGiftList() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = Number(searchParams.get('step')) || 1;

  const [isLoading, setIsLoading] = useState(false); // Estado geral de carregamento
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado específico para o envio do formulário

  const userId = user?.id ?? "";
  const { refetch } = useGiftListsByUser(userId);
  const { mutate: createGiftListMutation, isSuccess: isCreateSuccess, isLoading: isMutationLoading } = useCreateGiftList();

  useEffect(() => {
    if (isCreateSuccess) {
      router.push('/lists');
    }
  }, [isCreateSuccess, router]);

  const totalSteps = 2;

  const methods = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    mode: "onChange",
    defaultValues: {
      type: '',
      name: '',
      slug: '',
      date: '',
      description: '',
      banner: undefined,
      moments_images: [],
    },
  });

  const { handleSubmit, trigger, formState: { errors } } = methods;

  const goToStep = async (newStep: number, isBackward?: boolean) => {
    if (isBackward) {
      router.push(`/create-gift-list?step=${newStep}`);
      return;
    }

    let fieldsToValidate: (keyof EventFormData)[] = [];

    if (step === 1) {
      fieldsToValidate = ["type", "name", "slug", "date", "description"];
    } else if (step === 2) {
      fieldsToValidate = ["banner", "moments_images"];
    }

    // Valida os campos e redireciona se estiverem válidos
    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      router.push(`/create-gift-list?step=${newStep}`);
    }
  };

  const onSubmit = async (data: EventFormData) => {
    if (!user) {
      console.error("User is not authenticated");
      return;
    }

    setIsSubmitting(true);

    const dataToSend = {
      userId: user.id,
      ...data,
      status: "ACTIVE",
      gifts: [],
    };

    try {
      createGiftListMutation(dataToSend);
    } catch (error) {
      console.error("Erro ao criar lista de presentes:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepTitles: { [key: number]: string } = {
    1: "Detalhes do Evento",
    2: "Imagens do Evento",
  };

  return (
    <FormProvider {...methods}>
      <div className="max-w-2xl mx-auto p-6 flex flex-1 flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Criar Lista de Presentes</h1>
        <p className="text-text-secondary mb-6">Vamos criar sua lista de presentes perfeita!</p>

        <div className="w-full mb-6">
          <div className="text-sm font-medium mb-2">
            Passo {step}: {stepTitles[step]}
          </div>
          <div className="flex gap-2">
            {[1, 2].map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full ${s <= step ? 'bg-primary' : 'bg-gray-200'
                  }`}
              />
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          {step === 1 && <Step1 />}
          {step === 2 && <Step2 />}

          <div className="flex justify-between w-full mt-6">
            {step === 1 && (
              <Button
                variant="outlined-danger"
                onClick={() => router.push('/lists')}
                disabled={isSubmitting || isMutationLoading} // Desabilita o botão durante o envio
              >
                Cancelar
              </Button>
            )}

            {step > 1 && (
              <Button
                variant="outlined"
                onClick={() => goToStep(step - 1, true)}
                disabled={isSubmitting || isMutationLoading} // Desabilita o botão durante o envio
              >
                Voltar
              </Button>
            )}

            {step === totalSteps && (
              <Button
                type="submit"
                loading={isSubmitting || isMutationLoading} // Exibe o estado de carregamento no botão
                disabled={isSubmitting || isMutationLoading} // Desabilita o botão durante o envio
              >
                {isSubmitting || isMutationLoading ? "Finalizando..." : "Finalizar"}
              </Button>
            )}

            {step < totalSteps && (
              <Button
                onClick={() => goToStep(step + 1)}
                loading={isLoading} // Exibe o estado de carregamento no botão
                disabled={isLoading || isSubmitting || isMutationLoading} // Desabilita o botão durante o carregamento ou envio
              >
                Prosseguir
              </Button>
            )}
          </div>
        </form>
      </div>
    </FormProvider>
  );
}