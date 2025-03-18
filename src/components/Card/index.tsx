import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  bgColor?: string;
  className?: string;
}

export default function Card({ children, bgColor = 'bg-white', className }: CardProps) {
  return (
    <section className={`${bgColor} rounded-lg p-6 border border-gray-200 ${className}`}>
      {children}
    </section>
  );
}