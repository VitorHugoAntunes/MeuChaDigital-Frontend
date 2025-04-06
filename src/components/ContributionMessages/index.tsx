import { useState } from 'react';
import Link from "next/link";
import ContributionMessageCard from "../ContributionMessageCard";
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ContributionMessagesProps {
  slug?: string;
  contributionMessages?: {
    id: string;
    value: number;
    message: string;
    createdAt: string;
    user: {
      name: string;
    };
    gift: {
      name: string;
    };
  }[];
}

export function ContributionMessages({ slug, contributionMessages = [] }: ContributionMessagesProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section className="flex flex-col items-start justify-between gap-4 mb-6">
      <div
        className="flex justify-between items-center w-full cursor-pointer hover:bg-gray-light dark:hover:bg-gray-dark rounded-lg p-4 md:p-6 border border-gray-light dark:border-gray-dark"
        onClick={toggleAccordion}
      >
        <div className="flex items-center gap-2">
          <h3 className="text-md md:text-lg font-semibold text-text-primary">
            Contribuições
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
            className="text-xs md:text-sm font-semibold text-primary-light hover:text-primary-dark"
            onClick={(e) => e.stopPropagation()}
          >
            Ver todas
          </Link>
        )}
      </div>

      {isExpanded && (
        <>
          {contributionMessages.length > 0 ? (
            <>
              <div className="hidden lg:grid w-full gap-8 grid-cols-3">
                {contributionMessages
                  .slice(0, 3)
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .map((contribution) => (
                    <ContributionMessageCard
                      key={contribution.id}
                      contributorName={contribution.user.name}
                      date={contribution.createdAt}
                      message={contribution.message}
                      giftName={contribution.gift.name}
                      value={contribution.value}
                    />
                  ))}
              </div>

              <div className="lg:hidden w-screen -mx-4 px-4 overflow-x-auto pb-4 scrollbar-hide">
                <div className="flex gap-4 w-max">
                  {contributionMessages
                    .slice(0, 3)
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map((contribution) => (
                      <div key={contribution.id} className="min-w-[300px] md:min-w-[400px]">
                        <ContributionMessageCard
                          key={contribution.id}
                          contributorName={contribution.user.name}
                          date={contribution.createdAt}
                          message={contribution.message}
                          giftName={contribution.gift.name}
                          value={contribution.value}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col text-center items-center justify-center w-full">
              <p className="text-md md:text-lg font-semibold text-text-secondary">
                Nenhuma contribuição recebida ainda.
              </p>
              <p className="text-sm md:text-md text-text-secondary">
                Convide amigos e familiares para contribuir com sua lista!
              </p>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export function ContributionMessagesWithoutAccordion({ contributionMessages = [] }: ContributionMessagesProps) {
  return (
    <section className="flex flex-col items-start justify-between gap-4 mb-6 mt-8 w-full">
      {contributionMessages.length > 0 ? (
        <div className="grid w-full gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {contributionMessages
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map((contribution) => (
              <ContributionMessageCard
                key={contribution.id}
                contributorName={contribution.user.name}
                date={contribution.createdAt}
                message={contribution.message}
                giftName={contribution.gift.name}
                value={contribution.value}
              />
            ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full min-h-[30vh] md:min-h-[40vh] lg:min-h-[50vh]">
          <p className="text-lg font-semibold text-center text-text-secondary">
            Nenhuma contribuição recebida ainda.
          </p>
          <p className="text-md text-text-secondary text-center">
            Convide amigos e familiares para contribuir com sua lista!
          </p>
        </div>
      )}
    </section>
  );
}