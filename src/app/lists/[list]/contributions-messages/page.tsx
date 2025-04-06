"use client"

import { ContributionMessagesWithoutAccordion } from "@/components/ContributionMessages";
// import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

export default function ContributionsMessagesPage() {

  // const { user } = useAuth();

  return (
    <main className="flex flex-col gap-6 lg:mt-8 py-6 h-fit w-full">
      <section>
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary">
          Mensagens das Contribuições
        </h1>

        <p className="text-md text-text-secondary">
          Aqui você pode acompanhar todas as mensagens que você recebeu de contribuições para sua lista de presentes. As mensagens são exibidas em ordem cronológica, com as mais recentes no topo.
        </p>

        <ContributionMessagesWithoutAccordion />
      </section>
    </main>
  )
}