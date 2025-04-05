import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  bgColor?: string;
  bgColorDark?: string;
  className?: string;
}

export default function Card({ children, bgColor = 'bg-white', bgColorDark = 'bg-gray-dark', className = '' }: CardProps) {
  return (
    <section className={`dark:${bgColorDark} ${bgColor} rounded-lg p-4 md:p-6 border dark:border-gray-light ${className}`}>
      {children}
    </section>
  );
}