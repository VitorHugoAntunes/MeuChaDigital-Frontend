interface StatCardProps {
  title: string;
  value: string;
  color: string;
}

export default function StatCard({ title, value, color }: StatCardProps) {
  const colors = {
    blue: "bg-blue-100 text-blue-500",
    success: "bg-success-extraLight text-success-dark",
    purple: "bg-purple-extraLight text-purple-dark",
    warning: "bg-warning-extraLight text-warning-dark",
    danger: "bg-danger-extraLight text-danger-dark",
  };

  return (
    <article className={`flex flex-col justify-between p-6 rounded-lg ${colors[color as keyof typeof colors]}`}>
      <h2 className="text-sm font-semibold">{title}</h2>
      <span className="text-2xl font-semibold">{value}</span>
    </article>
  );
}