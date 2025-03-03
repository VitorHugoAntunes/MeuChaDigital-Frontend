import { ReactNode } from "react";

interface TipCardProps {
  icon: ReactNode;
  children: ReactNode;
}

export default function TipCard({ icon, children }: TipCardProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 mt-1">{icon}</div>
      <p className="text-md text-text-secondary leading-relaxed">{children}</p>
    </div>
  );
}