"use client";
import React from "react";
import Button from "@/components/Button";
import ListCard from "@/components/ListCard";
import { useAuth } from "@/contexts/AuthContext";
import { useGiftListsByUser } from "@/hooks/giftLists";
import { formatDateToBR } from "@/utils/formatDate";
import { Plus } from "lucide-react";
import Link from "next/link";

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
  const { user, isAuthenticated } = useAuth();

  const { data: giftLists, isLoading, isError } = useGiftListsByUser(user?.id ?? "");

  if (!isAuthenticated) {
    return (
      <main className="flex flex-col flex-1 w-screen my-8 justify-center items-center">
        <h1 className="text-2xl font-semibold text-text-primary">Você não está logado ainda.</h1>

        <div className="flex mt-8">
          <Link href="/sign-in">
            <Button variant="default">
              Faça login para ver suas listas
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col flex-1 w-screen my-8">
      <h1 className="text-2xl font-semibold text-text-primary">Minhas Listas de Presentes</h1>
      <p className="text-md mt-2 text-text-secondary">Gerencie suas listas de presentes de forma fácil e prática.</p>

      <div className="flex mt-8 justify-end">
        <Link href="/create-gift-list">
          <Button variant="default">
            Criar nova lista
            <Plus size={20} />
          </Button>
        </Link>
      </div>

      {isLoading && <p className="text-center mt-8">Carregando listas...</p>}
      {isError && <p className="text-center mt-8 text-red-500">Erro ao carregar as listas.</p>}

      {!isLoading && !isError && giftLists?.length === 0 && (
        <p className="text-center mt-8 text-text-secondary">Nenhuma lista encontrada.</p>
      )}

      <section className="mt-8 pb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {giftLists?.map((list: GiftList) => (
          <Link key={list.id} href={`/lists/${list.slug}/gifts`} className="cursor-pointer hover:shadow-lg">
            <ListCard
              key={list.id}
              photo={list.banner?.url}
              title={list.name}
              date={formatDateToBR(list.eventDate)}
              totalGifts={list._count.gifts}
              totalContributors={5}
              totalRaised={5000}
              totalGoal={10000}
            />
          </Link>
        ))}
      </section>
    </main>
  );
};

export default React.memo(ListsPage);