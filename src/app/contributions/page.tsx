"use client"

import Card from "@/components/Card";
import ContributionCard from "@/components/ContributionCard";
import { useAuth } from "@/contexts/AuthContext";
import { useContributions } from "@/hooks/contribution";
import { Loader2 } from "lucide-react";

export default function ContributionsPage() {

  const { user } = useAuth();

  const { data: contributions, isLoading: isGettingAllContributions } = useContributions(user?.id || "")

  return (
    <main className="flex flex-col gap-6 lg:mt-8 py-6 h-fit w-full">
      <section>
        <h1 className="text-2xl font-bold text-text-primary">
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
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {contributions.slice(0, 4).map((contribution) => (
                    <ContributionCard
                      key={contribution.id}
                      contribution={contribution}
                    />
                  ))}
                </div>
              </>
            ) : (
              <p className="text-md md:text-center text-text-secondary">Nenhuma contribuição realizada até o momento.</p>
            )}
          </div>
        </Card>
      </section>
    </main>
  )
}