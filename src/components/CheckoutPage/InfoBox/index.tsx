import { ReactNode } from "react";

interface InfoBoxProps {
  icon: ReactNode;
  text: string | ReactNode;
}

export default function InfoBox({ icon, text }: InfoBoxProps) {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-3 bg-gray-100 p-4 rounded-lg mt-4">
      <div className="flex-shrink-0 mt-1">{icon}</div>
      <p className="text-md text-text-secondary leading-relaxed">{text}</p>
    </div>
  );
}