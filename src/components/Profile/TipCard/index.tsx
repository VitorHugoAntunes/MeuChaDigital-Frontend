import { ReactNode } from "react";

interface TipCardProps {
  icon: ReactNode;
  children: ReactNode;
}

export default function TipCard({ icon, children }: TipCardProps) {
  return (
    <div className="flex items-start gap-3">
      {icon}
      <p className="text-md text-text-secondary leading-relaxed">{children}</p>
    </div>
  );
}