import Tag from "..";

enum PriorityColors {
  LOW = "bg-green-100 text-green-800",
  MEDIUM = "bg-yellow-100 text-yellow-800",
  HIGH = "bg-red-100 text-red-800"
}

interface PriorityTagProps {
  priority: "LOW" | "MEDIUM" | "HIGH";
}

export default function PriorityTag({ priority }: PriorityTagProps) {
  const labels = {
    "LOW": "Baixa prioridade",
    "MEDIUM": "Média prioridade",
    "HIGH": "Alta prioridade"
  };

  return (
    <Tag
      label={labels[priority]}
      color={PriorityColors[priority]}
    />
  );
};