interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <section>
      <div className="flex justify-between text-sm text-text-secondary mb-1">
        <span>Progresso das contribuições</span>
        <span>{progress}%</span>
      </div>
      <div className="bg-gray-200 h-2 rounded-full w-full" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
        <div className="bg-primary h-2 rounded-full" style={{ width: `${progress}%` }} />
      </div>
    </section>
  );
}
