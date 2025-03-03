interface SummaryItemProps {
  label: string;
  value: string;
  isTotal?: boolean;
}

export default function SummaryItem({ label, value, isTotal }: SummaryItemProps) {
  return (
    <div className={`flex justify-between ${isTotal ? "text-xl font-bold text-text-primary" : ""}`}>
      <span>{label}</span>
      <span className={`${isTotal && "text-success"}`}>{value}</span>
    </div>
  );
}