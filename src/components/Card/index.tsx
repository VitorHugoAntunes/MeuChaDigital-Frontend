import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <section className={`bg-white rounded-lg p-6 border border-gray-200 ${className}`}>
      {children}
    </section>
  );
}