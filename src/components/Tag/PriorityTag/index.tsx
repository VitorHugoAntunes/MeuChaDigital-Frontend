import Tag from "..";

interface PriorityTagProps {
  priority: "baixa" | "média" | "alta";
}
export default function PriorityTag({ priority }: PriorityTagProps) {
  const priorityColors = {
    "baixa": "bg-green-200 text-green-800",
    "média": "bg-yellow-200 text-yellow-800",
    "alta": "bg-red-200 text-red-800",
  };

  return <Tag label={`${priority} prioridade`} color={priorityColors[priority]} />;
};