import { formatCurrency } from "@/utils/formatString";
import Card from "../Card";
import { translatePaymentMethod, translatePaymentStatus } from "@/utils/translateString";
import { formatDateToLong, formatDateToTime } from "@/utils/formatDate";
import { ArrowRight } from "lucide-react";
import Button from "../Button";
import Link from "next/link";

interface ContributionCardProps {
  contribution: {
    id: string;
    giftId: string;
    gift: {
      name: string;
    };
    giftList: {
      name: string;
      shareableLink: string;
    };
    value: number;
    payment: {
      status: string;
      paymentMethod: string;
      txId: string;
    };
    createdAt: string;
  };
}

export default function ContributionCard({ contribution }: ContributionCardProps) {
  return (
    <Card key={contribution.id} className="relative py-4 flex flex-col justify-between gap-4" bgColorDark="bg-gray-light">
      <div className="absolute top-4 right-4 md:top-6 md:right-6 flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${contribution.payment.status === "PAID" ? "bg-success" :
          contribution.payment.status === "PENDING" ? "bg-warning" : "bg-danger"
          }`} />
        <span className={`text-xs font-semibold uppercase ${contribution.payment.status === "PAID" ? "text-success" :
          contribution.payment.status === "PENDING" ? "text-warning" : "text-danger"
          }`}>
          {translatePaymentStatus(contribution.payment.status)}
        </span>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h4 className="text-lg font-semibold text-text-primary">{contribution.gift.name}</h4>
          <h5 className="text-md text-text-secondary">
            {contribution.giftList.name}
          </h5>
        </div>

        <p className="text-2xl font-bold text-success">
          {formatCurrency(contribution.value)}
        </p>

        <div className="flex flex-col gap-2 mt-2">
          <p className="text-md text-text-secondary">
            {translatePaymentMethod(contribution.payment.paymentMethod)}
          </p>
          <p className="text-sm text-text-secondary text-wrap">
            ID da transação: {contribution.payment.txId}
          </p>
          <p className="text-md text-text-secondary">
            {formatDateToLong(contribution.createdAt)} • {formatDateToTime(contribution.createdAt)}
          </p>
        </div>
      </div>


      <Link
        href={`${contribution.giftList.shareableLink}/gifts/${contribution.giftId}`}
      >
        <Button widthFull>
          <ArrowRight size={20} />
          Ver presente
        </Button>
      </Link>
    </Card>
  )
}