import Button from "@/components/Button";
import { Check } from 'lucide-react';
import { useRouter } from "next/navigation";
import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { formatDateToBR } from "@/utils/formatDate";
import { formatCurrency } from "@/utils/formatString";

interface ActionModalProps {
  title: string;
  description: string;
  paymentData?: {
    transactionId: string;
    amount: string;
    timestamp: string;
    additionalInfo: {
      payer: {
        name: string;
      }
    }
  }
  onClose: () => void;
}

export const PaymentConfirmation = ({ title, description, paymentData, onClose }: ActionModalProps) => {
  const router = useRouter();

  useEffect(() => {
    const duration = 3 * 1000; // 3 segundos
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        zIndex: 999
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const handleClose = () => {
    router.push("/invitation/gifts");
    onClose();
  };

  return (
    <div className="space-y-6 relative overflow-hidden">
      <div className="flex justify-center">
        <div className="flex items-center justify-center p-4 rounded-full bg-green-100 dark:bg-[rgba(34,197,94,0.1)]">
          <div className="flex items-center justify-center p-2 rounded-full bg-green-500">
            <Check size={32} className="text-white" />
          </div>
        </div>
      </div>

      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-text-primary">{title}</h2>
        <p className="text-text-secondary">{description}</p>
      </div>

      <div className="space-y-4 bg-gray-light p-4 rounded-md">
        <div className="flex flex-col md:flex-row justify-between">
          <span className="text-sm font-semibold text-text-primary">Valor pago:</span>
          <span className="text-sm font-semibold text-success">{formatCurrency(Number(paymentData?.amount))}</span>
        </div>

        <div className="flex flex-col md:flex-row justify-between">
          <span className="text-sm font-semibold text-text-primary">Data do pagamento:</span>
          <span className="text-sm font-semibold text-text-secondary">{formatDateToBR(paymentData?.timestamp || "")}</span>
        </div>

        <div className="flex flex-col md:flex-row justify-between">
          <span className="text-sm font-semibold text-text-primary">ID da transação:</span>
          <span className="text-sm font-semibold text-text-secondary">{paymentData?.transactionId}</span>
        </div>

        <div className="flex flex-col md:flex-row justify-between">
          <span className="text-sm font-semibold text-text-primary">Nome do pagador:</span>
          <span className="text-sm font-semibold text-text-secondary">{paymentData?.additionalInfo.payer.name}</span>
        </div>
      </div>

      <p className="text-sm text-center font-semibold text-text-secondary">
        Muito obrigado por contribuir com o presente!
      </p>

      <div className="space-y-4">
        <Button
          type="button"
          onClick={handleClose}
          widthFull
        >
          Voltar para lista de presentes
        </Button>
      </div>
    </div>
  );
};