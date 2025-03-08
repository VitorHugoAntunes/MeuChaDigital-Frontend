// components/GiftList.tsx
"use client";

import Button from "@/components/Button";
import GiftCard from "@/components/GiftCard";
import { Plus, Users } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import Modal from "@/components/Modal";
import StatCard from "@/components/StatCard";
import { useAuth } from "@/contexts/AuthContext";
import { formatCurrency } from "@/utils/formatCurrency";
import GiftCardSkeleton from "../Skeleton/giftCardSkeleton";

interface Gift {
  id: string;
  name: string;
  photo?: { url: string };
  category?: { name: string };
  totalValue: number;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  list: { userId: string };
}

interface GiftListProps {
  gifts: Gift[];
  giftList: {
    id: string;
    name: string;
  };
  slug?: string;
  isInvitationPage?: boolean;
  isLoading: boolean;
  error: any;
  isUserOwner: boolean;
  onAddGiftSuccess?: () => void; // Callback para quando um presente é adicionado com sucesso
}

export default function GiftList({
  gifts,
  giftList,
  slug,
  isInvitationPage,
  isLoading,
  error,
  isUserOwner,
  onAddGiftSuccess,
}: GiftListProps) {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) {
    return (
      <main className="flex flex-col flex-1 w-full my-8 px-4">
        <header>
          <h1 className="text-4xl font-bold text-text-primary">{giftList?.name}</h1>
          <h2 className="text-2xl font-semibold text-text-primary mt-2">
            {isUserOwner ? "Meus Presentes" : "Presentes"}
          </h2>
          <p className="text-md mt-2 text-text-secondary">
            {isUserOwner
              ? "Gerencie seus presentes de forma fácil e prática."
              : "Veja os presentes disponíveis para contribuição."}
          </p>
        </header>

        {/* Exibir Skeletons enquanto carrega */}
        <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <GiftCardSkeleton key={index} />
          ))}
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col flex-1 w-full my-8 justify-center items-center">
        <p className="text-lg font-semibold text-red-500">Erro ao carregar presentes.</p>
      </div>
    );
  }

  return (
    <main className="flex flex-col flex-1 w-full my-8 px-4">
      <header>
        <h1 className="text-4xl font-bold text-text-primary">{giftList?.name}</h1>
        <h2 className="text-2xl font-semibold text-text-primary mt-2">
          {isUserOwner ? "Meus Presentes" : "Presentes"}
        </h2>
        <p className="text-md mt-2 text-text-secondary">
          {isUserOwner
            ? "Gerencie seus presentes de forma fácil e prática."
            : "Veja os presentes disponíveis para contribuição."}
        </p>
      </header>

      {isUserOwner && (
        <>
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <StatCard
              title="Total de Presentes"
              value={gifts?.length.toString() || "0"}
              color="blue"
            />
            <StatCard title="Valor arrecadado" value={formatCurrency(0)} color="success" />
            <StatCard title="Presentes comprados" value="0" color="purple" />
            <StatCard title="Contribuições" value="0" color="warning" />
          </section>
          <div className="mt-8 flex justify-end gap-4">
            <Link href="/lists/[slug]/invitee-list" as={`/lists/${slug}/invitee-list`}>
              <Button variant="outlined">
                Ver lista de convidados
                <Users size={20} />
              </Button>
            </Link>

            <Button onClick={() => setIsModalOpen(true)}>
              Adicionar Presente <Plus />
            </Button>
          </div>
        </>
      )}

      <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {gifts && gifts.length > 0 ? (
          gifts.map((gift) => (
            <Link href={
              isInvitationPage
                ? `http://${slug}.localhost:3000/invitation/gifts/${gift.id}`
                : `/lists/${slug}/gifts/${gift.id}`
            } key={gift.id}>
              <GiftCard
                key={gift.id}
                photo={gift.photo?.url || "/default-gift.jpg"}
                title={gift.name}
                category={gift.category?.name || "Sem categoria"}
                price={gift.totalValue}
                description={gift.description}
                priority={gift.priority}
                isUserOwner={isUserOwner}
              />
            </Link>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center w-full col-span-4 mt-8">
            <h2 className="text-xl font-semibold text-gray-600">Nenhum presente encontrado.</h2>
            {isUserOwner && (
              <p className="text-md text-gray-500">Adicione presentes para começar sua lista!</p>
            )}
          </div>
        )}
      </section>

      {isModalOpen && (
        <Modal
          giftListId={giftList.id}
          userId={user?.id || ""}
          modalType="gift"
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          onSuccess={onAddGiftSuccess} // Atualiza a lista após adicionar um presente
        />
      )}
    </main>
  );
}