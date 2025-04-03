import { formatCurrency } from "@/utils/formatString";

interface ProgressBarProps {
  initialValue: number;
  goalValue: number;
}

export default function ProgressBar({ initialValue, goalValue }: ProgressBarProps) {
  const safeInitialValue = Math.max(0, initialValue);
  const safeGoalValue = Math.max(0, goalValue);

  let progress = 0;
  if (safeGoalValue > 0) {
    progress = (safeInitialValue / safeGoalValue) * 100;
  }

  const progressRounded = Math.min(100, Math.max(0, Math.round(progress)));

  return (
    <section>
      <div className="flex justify-between text-sm text-text-secondary mb-2">
        <span className="text-xs lg:text-sm font-semibold text-text-primary">
          Valor arrecadado: {formatCurrency(safeInitialValue)} de {formatCurrency(safeGoalValue)}
        </span>
      </div>

      <div className="relative bg-gray-dark dark:bg-gray-light h-2 rounded-full w-full overflow-hidden" role="progressbar" aria-valuenow={progressRounded} aria-valuemin={0} aria-valuemax={100}>
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