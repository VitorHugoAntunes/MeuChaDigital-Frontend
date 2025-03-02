import Tag from "..";

interface PriorityTagProps {
  priority: "LOW" | "MEDIUM" | "HIGH";
}
export default function PriorityTag({ priority }: PriorityTagProps) {
  const priorityColors = {
    "LOW": "bg-green-200 text-green-800",
    "MEDIUM": "bg-yellow-200 text-yellow-800",
    "HIGH": "bg-red-200 text-red-800",
  };

  return <Tag label={
    priority === "LOW" ? "Baixa prioridade" : priority === "MEDIUM" ? "Média prioridade" : "Alta prioridade"}
    color={priorityColors[priority]}
  />;
};