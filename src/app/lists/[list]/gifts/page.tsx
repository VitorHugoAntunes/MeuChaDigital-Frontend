"use client";

import Button from "@/components/Button";
import GiftCard from "@/components/GiftCard";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Modal from "@/components/Modal";
import StatCard from "@/components/StatCard";
import { useAuth } from "@/contexts/AuthContext";
import { useGiftsBySlug } from "@/hooks/gifts";
import { useParams } from "next/navigation";

interface Gift {
  id: string;
  name: string;
  photo?: { url: string }; // Agora opcional
  category?: { name: string }; // Agora opcional
  list?: { userId: string }; // Agora opcional
  totalValue: number;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
}

export default function GiftsPage() {
  const { user, isAuthenticated } = useAuth();
  const slug = useParams().list as string;
  const { data, isLoading, error } = useGiftsBySlug(slug);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserOwner, setIsUserOwner] = useState(false);

  console.log("PRESENTES:", data?.gifts);

  useEffect(() => {
    if (data?.giftList?.userId && user?.id) {
      setIsUserOwner(data.giftList.userId === user.id);
    }
  }, [data, user]);


  if (isLoading) {
    return (
      <main className="flex flex-col flex-1 w-screen my-8 justify-center items-center">
        <p className="text-lg font-semibold animate-pulse">Carregando presentes...</p>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="flex flex-col flex-1 w-screen my-8 justify-center items-center">
        <h1 className="text-2xl font-semibold text-text-primary">Você não está logado</h1>
        <p className="text-md mt-2 text-text-secondary">
          Faça login para acessar suas listas de presentes.
        </p>
        <Link href="/sign-in" className="mt-6">
          <Button variant="default">Entrar na conta</Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="flex flex-col flex-1 w-screen my-8 px-4">
      <header>
        <h1 className="text-4xl font-bold text-text-primary">{data?.giftList?.name}</h1>
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
              value={data?.gifts?.length.toString() || "0"}
              color="blue"
            />
            <StatCard title="Valor arrecadado" value="R$ 0,00" color="success" />
            <StatCard title="Presentes comprados" value="0" color="purple" />
            <StatCard title="Contribuições" value="0" color="warning" />
          </section>
          <div className="mt-8">
            <Button onClick={() => setIsModalOpen(true)}>
              Adicionar Presente <Plus />
            </Button>
          </div>
        </>
      )}

      <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.gifts && data.gifts.length > 0 ? (
          data.gifts.map((gift: Gift) => (
            <Link href={`/lists/${slug}/gifts/${gift.id}`} key={gift.id}>
              <GiftCard
                key={gift.id}
                photo={gift.photo?.url || "/default-gift.jpg"} // Se não houver foto, exibe um padrão
                title={gift.name}
                category={gift.category?.name || "Sem categoria"} // Se não houver categoria, exibe um padrão
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
        <Modal modalType="present" isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      )}
    </main>
  );
}
