interface StatCardProps {
  title: string;
  value: string;
  color: string;
}

export default function StatCard({ title, value, color }: StatCardProps) {
  const colors = {
    blue: "bg-blue-100 text-blue-500 dark:bg-blue-200 dark:text-blue-600",
    success: "bg-success-extraLight text-success-dark dark:bg-green-200 dark:text-green-600",
    purple: "bg-purple-extraLight text-purple-dark dark:bg-purple-200 dark:text-purple-600",
    warning: "bg-warning-extraLight text-warning-dark dark:bg-warning-200 dark:text-warning-600",
    danger: "bg-danger-extraLight text-danger-dark dark:bg-danger-200 dark:text-danger-600",
  };

  return (
    <article className={`flex flex-col justify-between p-4 md:p-6 rounded-lg ${colors[color as keyof typeof colors]}`}>
      <h2 className="text-sm font-semibold">{title}</h2>
      <span className="text-2xl font-semibold">{value}</span>
    </article>
  );
}