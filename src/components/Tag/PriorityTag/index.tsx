import Tag from "..";

interface PriorityTagProps {
  priority: "low priority" | "medium priority" | "high priority";
}
export default function PriorityTag({ priority }: PriorityTagProps) {
  const priorityColors = {
    "low priority": "bg-green-200 text-green-800",
    "medium priority": "bg-yellow-200 text-yellow-800",
    "high priority": "bg-red-200 text-red-800",
  };

  return <Tag label={priority} color={priorityColors[priority]} />;
};