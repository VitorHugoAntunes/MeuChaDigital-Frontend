"use client";

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams, useRouter } from 'next/navigation';
import Step1 from './Step_1';
import Step2 from './Step_2';
import Button from '../Button';
import { eventSchema, EventFormData } from '../../schemas/createGiftListSchema';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { useCreateGiftList, useGiftListsByUser } from '@/hooks/giftLists';
import Step3 from './Step_3';

export default function CreateGiftList() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = Number(searchParams.get('step')) || 1;

  const [isLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userId = user?.id ?? "";
  const { } = useGiftListsByUser(userId);
  const { mutate: createGiftListMutation, isSuccess: isCreateSuccess, isLoading: isMutationLoading } = useCreateGiftList();

  useEffect(() => {
    if (isCreateSuccess) {
      router.push('/lists');
    }
  }, [isCreateSuccess, router]);

  const totalSteps = 3;

  const methods = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    mode: "onSubmit",
    shouldUnregister: false,
    defaultValues: {
      type: '',
      name: '',
      slug: '',
      date: '',
      time: '',
      description: '',
      banner: undefined,
      moments_images: [],
      address: {
        zipCode: '',
        streetAddress: '',
        streetNumber: '',
        addressLine2: '',
        neighborhood: '',
        city: '',
        state: '',
      },
    },
  });

  const { handleSubmit, trigger } = methods;

  const goToStep = async (newStep: number, isBackward?: boolean) => {
    if (isBackward) {
      router.push(`/create-gift-list?step=${newStep}`);
      return;
    }

    let fieldsToValidate: string | string[] | readonly ("type" | "name" | "slug" | "date" | "time" | "description" | "banner" | "moments_images" | "address" | "address.zipCode" | "address.streetAddress" | "address.streetNumber" | "address.neighborhood" | "address.city" | "address.state" | `moments_images.${number}` | "address.addressLine2")[] | undefined = [];

    if (step === 1) {
      fieldsToValidate = ["type", "name", "slug", "date", "time", "description"];
    } else if (step === 2) {
      fieldsToValidate = ["banner", "moments_images"];
    } else if (step === 3) {
      fieldsToValidate = ["address.zipCode", "address.streetAddress", "address.streetNumber", "address.neighborhood", "address.city", "address.state"];
    }

    // Valida os campos e redireciona se estiverem válidos
    const isStepValid = await trigger(fieldsToValidate as (keyof EventFormData)[]);
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
      address: {
        ...data.address,
        addressLine2: data.address.addressLine2 === "" ? "-" : data.address.addressLine2,
      },
    };

    console.log("Data to send:", dataToSend);

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
    3: "Local do Evento",
  };

  return (
    <FormProvider {...methods}>
      <div className="max-w-2xl mt-6 md:mb-6 mx-auto flex flex-1 flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Criar Lista de Presentes</h1>
        <p className="text-text-secondary mb-6">Vamos criar sua lista de presentes perfeita!</p>

        <div className="sticky top-0 bg-white py-4 border-y-2 border-y-gray-200 w-screen -mx-4 sm:w-full sm:static sm:py-0 sm:mx-0 sm:bg-transparent sm:border-y-0">
          <div className="w-full px-4 sm:px-0">
            {/* Título do passo atual */}
            <div className="text-sm font-medium mb-2">
              Passo {step}: {stepTitles[step]}
            </div>

            <div className="flex gap-2">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-2 flex-1 rounded-full ${s <= step ? 'bg-primary' : 'bg-gray-200'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-6">
          {step === 1 && <Step1 />}
          {step === 2 && <Step2 />}
          {step === 3 && <Step3 />}

          {/* Container dos botões com comportamento sticky e largura total em telas pequenas */}
          <div className="sticky bottom-0 bg-white py-4 border-t-2 border-t-gray-200 w-screen -mx-4 sm:w-full sm:static sm:py-0 sm:mx-0 sm:bg-transparent sm:border-t-0">
            <div className="flex justify-between w-full px-4 sm:px-0">
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
          </div>
        </form>
      </div>
    </FormProvider>
  );
}