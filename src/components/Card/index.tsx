import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  bgColor?: string;
  className?: string;
}

export default function Card({ children, bgColor = 'bg-white', className }: CardProps) {
  return (
    <section className={`dark:bg-gray-dark ${bgColor} rounded-lg p-4 md:p-6 border dark:border-gray-light ${className}`}>
      {children}
    </section>
  );
}