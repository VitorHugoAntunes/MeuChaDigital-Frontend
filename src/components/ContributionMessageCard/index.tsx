import { formatCurrency } from "@/utils/formatString";
import Card from "../Card";
import { formatDateToRelativeTime } from "@/utils/formatDate";

interface ContributionMessageCardProps {
  contributorName: string;
  date: string;
  message: string;
  giftName: string;
  value: number;
}

export default function ContributionMessageCard({ contributorName, date, message, giftName, value }: ContributionMessageCardProps) {
  return (
    <Card className="relative py-4 flex flex-col h-full justify-between gap-4" bgColor="bg-[#FFF0F5]" bgColorDark="bg-gray-dark">
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex flex-col items-start lg:flex-row lg:justify-between lg:items-center">
          <h5 className="text-md text-text-primary">
            {contributorName}
          </h5>

          <span className="text-xs font-semibold first-letter:uppercase text-text-secondary mt-1 md:mt-0">
            {formatDateToRelativeTime(date)}
          </span>
        </div>

        <div className="text-sm text-text-secondary text-wrap">
          <p className="text-md text-primary-dark dark:text-primary-light">
            {giftName}
          </p>
          <p className="text-lg font-bold text-success">
            {formatCurrency(value)}
          </p>
        </div>

        {message && (
          <article className="text-sm text-text-secondary text-wrap bg-background rounded-lg p-4 border dark:border-none">
            <p className="text-md text-text-primary">
              {message}
            </p>
          </article>
        )}
      </div>
    </Card>
  )
}