"use client";

import { useEffect, useState } from "react";
import { useGiftBySlug } from "@/hooks/gifts";
import { useParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import GiftHeader from "@/components/GiftPage/GiftHeader";
import GiftDetails from "@/components/GiftPage/GiftDetails";
import PaymentAside from "@/components/GiftPage/PaymentAside";
import GiftLoading from "@/components/GiftPage/GiftLoading";
import Error from "@/components/Error";
import NotFound from "@/components/NotFound";
import { Link } from "lucide-react";
import Button from "@/components/Button";

export default function GiftPage() {
  const { user, isAuthenticated } = useAuth();
  const [isUserOwner, setIsUserOwner] = useState(false);
  const slug = useParams().list as string;
  const giftId = useParams().giftId as string;
  const { data: gift, isLoading, error } = useGiftBySlug(slug, giftId);

  useEffect(() => {
    if (gift?.list.userId && user?.id) {
      setIsUserOwner(gift.list.userId === user.id);
    }
  }, [gift, user]);

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

  if (isLoading) {
    return <GiftLoading />;
  }

  if (error) {
    return <Error title="Ocorreu um erro ao carregar o presente" />;
  }

  if (!gift) {
    return <NotFound title="Presente não encontrado" />;
  }

  return (
    <main className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 mt-8 py-6 px-4 md:px-8 h-fit w-full">
      <section className="bg-white rounded-lg p-6 border border-gray-200">
        <GiftHeader
          category={gift.category}
          priority={gift.priority}
          name={gift.name}
          description={gift.description}
          totalValue={gift.totalValue}
          isUserOwner={isUserOwner}
        />
        <GiftDetails photo={gift.photo} name={gift.name} description={gift.description} />
      </section>

      <PaymentAside isUserOwner={isUserOwner} slug={slug} giftId={giftId} giftName={gift.name} maxAmount={gift.totalValue} />
    </main>
  );
}