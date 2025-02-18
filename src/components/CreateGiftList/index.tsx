"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import Step1 from './Step_1';
import Step2 from './Step_2';
import Button from '../Button';

export default function CreateGiftList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = Number(searchParams.get('step')) || 1;

  const totalSteps = 2;

  const goToStep = (newStep: number) => {
    router.push(`/create-gift-list?step=${newStep}`);
  };

  const stepTitles: { [key: number]: string } = {
    1: "Detalhes do Evento",
    2: "Foto e compartilhamento",
  };

  return (
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

      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}

      <div className="flex justify-between w-full mt-6">
        {step === 1 && (
          <Button
            variant="outlined"
            onClick={() => router.push('/lists')}
          >
            Cancelar
          </Button>
        )}

        {step > 1 && (
          <Button
            variant="outlined"
            onClick={() => goToStep(step - 1)}
          >
            Voltar
          </Button>
        )}

        {step === totalSteps && (
          <Button
            onClick={() => {
              router.push('/lists/gifts');
            }}
          >
            Finalizar
          </Button>
        )}

        {step < totalSteps && (
          <Button
            onClick={() => goToStep(step + 1)}
          >
            Prosseguir
          </Button>
        )}
      </div>
    </div>
  );
}