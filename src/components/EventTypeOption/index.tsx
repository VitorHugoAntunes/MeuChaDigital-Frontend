import { ReactNode } from "react";

type EventTypeOptionProps = {
  label: string;
  icon?: ReactNode;
  value: string;
  selected: string | null;
  onSelect: (value: string) => void;
};

export default function EventTypeOption({ label, icon, value, selected, onSelect }: EventTypeOptionProps) {
  return (
    <div
      className={`flex ${icon ? "flex-col" : "flex-row"} justify-center items-center gap-2 p-4 border rounded-md cursor-pointer transition-all ${selected === value ? "border-primary dark:bg-input shadow-lg" : "dark:bg-background border-gray-dark dark:border-input-border hover:border-gray-300 dark:hover:border-gray-light"
        }`}
      onClick={() => onSelect(value)}
    >
      {icon && <div className="text-xl text-text-secondary">{icon}</div>}
      <span className="text-sm text-text-secondary">{label}</span>
    </div>
  );
}
