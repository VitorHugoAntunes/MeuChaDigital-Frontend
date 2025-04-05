"use client"

import Button from "@/components/Button";
import Card from "@/components/Card";
import { useAuth } from "@/contexts/AuthContext";
import { useContributions } from "@/hooks/contribution";
import { formatDateToLong, formatDateToTime } from "@/utils/formatDate";
import { formatCurrency } from "@/utils/formatString";
import { translatePaymentMethod, translatePaymentStatus } from "@/utils/translateString";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

export default function ContributionsPage() {

  const { user } = useAuth();

  const { data: contributions, isLoading: isGettingAllContributions } = useContributions(user?.id || "")

  return (
    <main className="flex flex-col gap-6 lg:mt-8 py-6 h-fit w-full">
      <section>
        <h1 className="text-2xl font-bold text-gray-dark dark:text-white">
          Histórico de Contribuições
        </h1>

        <p className="text-md text-text-secondary">
          Aqui você pode acompanhar todas as contribuições que você fez, incluindo informações sobre o presente, lista de presentes e status do pagamento.
        </p>

        <Card className="mt-6">
          <div className="flex flex-col gap-4">
            {isGettingAllContributions ? (
              <div className="flex justify-center items-center py-4">
                <Loader2 className="h-12 w-12 text-primary-light animate-spin" />
              </div>
            ) : contributions && contributions.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {contributions.slice(0, 4).map((contribution) => (
                    <Card key={contribution.id} className="relative py-4 flex flex-col justify-between gap-4" bgColorDark="bg-gray-light">
                      <div className={`absolute w-2 h-2 rounded-full top-4 right-4 md:top-6 md:right-6 ${contribution.payment.status === "PAID" ? "bg-success" : contribution.payment.status === "PENDING" ? "bg-warning" : "bg-danger"}`} />

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
                            {translatePaymentMethod(contribution.payment.paymentMethod)} • {translatePaymentStatus(contribution.payment.status)}
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
                          Ver detalhes do presente
                        </Button>
                      </Link>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-md md:text-center text-text-secondary">Nenhuma transação realizada.</p>
            )}
          </div>
        </Card>
      </section>
    </main>
  )
}