import { formatCurrency } from "@/utils/formatCurrency";

interface ProgressBarProps {
  initialValue: number;
  goalValue: number;
}

export default function ProgressBar({ initialValue, goalValue }: ProgressBarProps) {
  const progress = (initialValue / goalValue) * 100;
  const progressRounded = Math.round(progress);

  return (
    <section>
      <div className="flex justify-between text-sm text-text-secondary mb-1">
        <span>Valor arrecadado: {formatCurrency(initialValue)} de {formatCurrency(goalValue)}</span>

        <span>{progressRounded}%</span>
      </div>
      <div className="bg-gray-200 h-2 rounded-full w-full" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
        <div className="bg-primary h-2 rounded-full" style={{ width: `${progressRounded}%` }} />
      </div>
    </section>
  );
}
