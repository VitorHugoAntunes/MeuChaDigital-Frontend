import { useState } from 'react';
import Link from "next/link";
import ContributionMessageCard from "../ContributionMessageCard";
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ContributionMessagesProps {
  slug?: string;
}

export function ContributionMessages({ slug }: ContributionMessagesProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section className="flex flex-col items-start justify-between gap-4 mb-6">
      <div
        className="flex justify-between items-center w-full cursor-pointer"
        onClick={toggleAccordion}
      >
        <div className="flex items-center gap-2">
          <h3 className="text-lg sm:text-xl font-semibold text-text-primary">
            Mensagens de Doação
          </h3>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-text-primary" />
          ) : (
            <ChevronDown className="h-5 w-5 text-text-primary" />
          )}
        </div>

        {slug && (
          <Link
            href="/lists/[slug]/contributions-messages"
            as={`/lists/${slug}/contributions-messages`}
            className="text-sm font-semibold text-primary-light hover:text-primary-dark"
            onClick={(e) => e.stopPropagation()}
          >
            Ver todas
          </Link>
        )}
      </div>

      {isExpanded && (
        <>
          <div className="hidden lg:grid w-full gap-8 grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <ContributionMessageCard
                key={index}
                contributorName={`Contribuidor ${index + 1}`}
                date={"2025-03-01T12:00:00Z"}
                message={`Mensagem de exemplo ${index + 1}`}
                giftName={`Presente ${index + 1}`}
                value={(index + 1) * 50}
              />
            ))}
          </div>

          <div className="lg:hidden w-screen -mx-4 px-4 overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex gap-4 w-max">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="min-w-[300px]">
                  <ContributionMessageCard
                    contributorName={`Contribuidor ${index + 1}`}
                    date={"2025-03-01T12:00:00Z"}
                    message={`Mensagem de exemplo ${index + 1}`}
                    giftName={`Presente ${index + 1}`}
                    value={(index + 1) * 50}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export function ContributionMessagesWithoutAccordion() {
  return (
    <section className="flex flex-col items-start justify-between gap-4 mb-6 mt-8 w-full">
      <div className="grid w-full gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 10 }).map((_, index) => (
          <ContributionMessageCard
            key={index}
            contributorName={`Contribuidor ${index + 1}`}
            date={"2025-03-01T12:00:00Z"}
            message={`Mensagem de exemplo ${index + 1}`}
            giftName={`Presente ${index + 1}`}
            value={(index + 1) * 50}
          />
        ))}
      </div>
    </section>
  );
}