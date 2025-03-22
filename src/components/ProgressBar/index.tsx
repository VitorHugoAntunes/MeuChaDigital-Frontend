import { formatCurrency } from "@/utils/formatString";

interface ProgressBarProps {
  initialValue: number;
  goalValue: number;
}

export default function ProgressBar({ initialValue, goalValue }: ProgressBarProps) {
  const progress = (initialValue / goalValue) * 100;
  const progressRounded = Math.round(progress);

  return (
    <section>
      <div className="flex justify-between text-sm text-text-secondary mb-2">
        <span className="text-xs lg:text-sm font-semibold text-text-primary">
          Valor arrecadado: {formatCurrency(initialValue)} de {formatCurrency(goalValue)}
        </span>
      </div>

      <div className="relative bg-gray-200 h-2 lg:h-6 rounded-full w-full overflow-hidden" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
        <div
          className="bg-primary h-full rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${progressRounded}%` }}
        />
      </div>

      <div
        className={`mt-1 text-sm lg:text-md font-medium text-text-secondary ${progressRounded === 100 ? 'text-green-500' : ''}`}
      >
        {progressRounded}%
      </div>
    </section>
  );
}
