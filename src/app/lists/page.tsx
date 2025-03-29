"use client";
import React from "react";
import Button from "@/components/Button";
import ListCard from "@/components/ListCard";
import { useAuth } from "@/contexts/AuthContext";
import { useGiftListsByUser } from "@/hooks/giftLists";
import { formatDateToBR } from "@/utils/formatDate";
import { Plus } from "lucide-react";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";
import { GiftCardSkeleton } from "@/components/Skeleton/giftCardSkeleton";

interface GiftList {
  id: string;
  name: string;
  slug: string;
  banner: {
    url: string;
  };
  eventDate: string;
  _count: {
    gifts: number;
  };
}

const ListsPage = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  const {
    data: giftLists,
    isLoading: isGiftListsLoading,
    isError,
  } = useGiftListsByUser(user?.id || "", {
    enabled: !!user?.id,
  });

  if (isLoading) {
    return (
      <main className="flex flex-col flex-1 w-screen my-8 justify-center items-center">
        <LoadingSpinner />
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="flex flex-col flex-1 w-screen my-8 justify-center items-center">
        <h1 className="text-2xl font-semibold text-text-primary">Você não está logado ainda.</h1>

        <div className="flex mt-8">
          <Link href="/sign-in">
            <Button variant="default">Faça login para ver suas listas</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col flex-1 w-full">
      <header className="mb-8 w-screen relative left-1/2 -translate-x-1/2">
        <div className="gradient-bg bg-gradient-to-r from-[#FFF0F5] to-[#FFE4E9] shadow-sm py-4 lg:py-8">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-8">
            <h1 className="text-2xl sm:text-4xl font-bold text-text-primary mb-3">
              Minhas Listas de Presentes
            </h1>
            <p className="text-base sm:text-lg text-text-secondary mb-6">
              Gerencie suas listas de presentes de forma fácil e prática.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="w-full sm:w-auto md:w-fit">
                <Link href="/create-gift-list">
                  <Button widthFull>
                    <Plus size={20} />
                    <span>Criar nova lista</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {isError && <p className="text-center mt-8 text-red-500">Erro ao carregar as listas.</p>}

      {!isGiftListsLoading && !isError && giftLists?.length === 0 && (
        <div className="flex flex-col items-center justify-center w-full mt-8 lg:mt-4 min-h-[30vh] md:min-h-[40vh] lg:min-h-[50vh]">
          <h2 className="text-lg text-center lg:text-xl font-semibold text-gray-600">Você ainda não tem nenhuma lista de presentes.</h2>

          <p className="text-md text-gray-500">Crie sua primeira lista de presentes agora mesmo.</p>
        </div>
      )}

      <section className="lg:mt-4 w-full">
        <div className="grid gap-12 grid-cols-[repeat(auto-fit,20rem)] lg:gap-16 lg:grid-cols-[repeat(auto-fit,28rem)] justify-center lg:justify-start">
          {isGiftListsLoading ? (
            [...Array(3)].map((_, index) => (
              <GiftCardSkeleton key={index} />
            ))
          ) : (
            giftLists?.map((list: GiftList) => (
              <Link
                key={list.id}
                href={`/lists/${list.slug}/gifts`}
                className="w-full cursor-pointer"
              >
                <ListCard
                  key={list.id}
                  photo={list.banner?.url}
                  title={list.name}
                  date={formatDateToBR(list.eventDate)}
                  totalGifts={list._count.gifts}
                  totalContributors={5}
                  totalRaised={40}
                  totalGoal={100}
                />
              </Link>
            ))
          )}
        </div>
      </section>
    </main>
  );
};

export default React.memo(ListsPage);