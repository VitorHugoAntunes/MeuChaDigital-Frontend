type EventTypeOptionProps = {
  label: string;
  value: string;
  selected: string | null;
  onSelect: (value: string) => void;
};

export default function EventTypeOption({ label, value, selected, onSelect }: EventTypeOptionProps) {
  return (
    <div
      className={`flex justify-center items-center gap-2 p-4 border rounded-md cursor-pointer transition-all ${selected === value ? "border-primary shadow-lg" : "border-gray-200 hover:border-gray-300"
        }`}
      onClick={() => onSelect(value)}
    >
      <span className="text-sm">{label}</span>
    </div>
  )
}
