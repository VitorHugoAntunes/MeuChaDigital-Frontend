import { Calendar, Gift, Users } from "lucide-react";

interface ListCardInfoProps {
  date: string;
  totalGifts: number;
  totalContributors: number;
}

export default function ListCardInfo({ date, totalGifts, totalContributors }: ListCardInfoProps) {
  return (
    <section>
      <ul className="space-y-2">
        <li className="flex items-center">
          <Calendar size={20} className="text-text-secondary" />
          <time className="text-xs lg:text-sm text-text-secondary ml-2">{date}</time>
        </li>
        <li className="flex items-center">
          <Gift size={20} className="text-text-secondary" />
          <span className="text-xs lg:text-sm text-text-secondary ml-2">{totalGifts} presentes</span>
        </li>
        <li className="flex items-center">
          <Users size={20} className="text-text-secondary" />
          <span className="text-xs lg:text-sm text-text-secondary ml-2">{totalContributors} contribuidores</span>
        </li>
      </ul>
    </section>
  );
}
