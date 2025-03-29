import { Calendar, Gift, HandHeart, Users } from "lucide-react";

interface ListCardInfoProps {
  date: string;
  totalGifts: number;
  totalContributors: number;
}

export default function ListCardInfo({ date, totalGifts, totalContributors }: ListCardInfoProps) {
  return (
    <section>
      <ul className="space-y-3">
        <li className="flex items-center">
          <Calendar
            size={20}
            className="text-indigo-500"
          />
          <time className="text-xs lg:text-sm text-text-secondary ml-2">
            {date}
          </time>
        </li>

        <li className="flex items-center">
          <Gift
            size={20}
            className="text-primary"
          />
          <span className="text-xs lg:text-sm text-text-secondary ml-2">
            {totalGifts} {totalGifts === 1 ? 'presente' : 'presentes'}
          </span>
        </li>

        <li className="flex items-center">
          <HandHeart
            size={20}
            className="text-emerald-500"
          />
          <span className="text-xs lg:text-sm text-text-secondary ml-2">
            {totalContributors} {totalContributors === 1 ? 'contribuição' : 'contribuições'}
          </span>
        </li>
      </ul>
    </section>
  );
}