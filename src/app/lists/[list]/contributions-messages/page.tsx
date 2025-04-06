"use client"

import { ContributionMessagesWithoutAccordion } from "@/components/ContributionMessages";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAuth } from "@/contexts/AuthContext";
import { useContributionByGiftListSlug } from "@/hooks/contribution";
import { useParams } from "next/navigation";

export default function ContributionsMessagesPage() {

  const { user } = useAuth();

  const slug = useParams().list as string;

  const {
    data: contributions,
    isLoading,
  } = useContributionByGiftListSlug(user?.id || "", slug || "");

  return (
    <main className="flex flex-col gap-6 lg:mt-8 py-6 h-fit w-full">
      <section>
        <div className="space-y-2 md:space-y-4">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary">
            Contribuições recebidas
          </h1>

          <div className="max-w-4xl"> {/* Container para limitar largura do texto */}
            <p className="text-md md:text-lg text-text-secondary leading-relaxed md:leading-normal">
              Acompanhe todas as contribuições para sua lista.
              <span className="block md:inline"> {/* Quebra responsiva */}
                As doações são exibidas em ordem cronológica,
                <span className="hidden sm:inline"> com as mais recentes primeiro.</span>
                <span className="sm:hidden"> das mais novas às mais antigas.</span>
              </span>
            </p>
          </div>
        </div>

        {
          isLoading ? (
            <LoadingSpinner />
          ) : (
            <ContributionMessagesWithoutAccordion
              contributionMessages={contributions}
            />
          )
        }
      </section>
    </main>
  )
}