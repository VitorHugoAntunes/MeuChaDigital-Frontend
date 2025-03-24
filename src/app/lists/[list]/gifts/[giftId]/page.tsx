"use client";

import { useEffect, useState } from "react";
import { useGiftBySlug } from "@/hooks/gifts";
import { useParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import GiftLoading from "@/components/GiftPage/GiftLoading";
import Error from "@/components/Error";
import NotFound from "@/components/NotFound";
import GiftContent from "@/components/GiftContent";

export default function GiftPage() {
  const { user, isLoading: isUserLoading } = useAuth();
  const [isUserOwner, setIsUserOwner] = useState(false);
  const slug = useParams().list as string;
  const giftId = useParams().giftId as string;
  const { data: gift, isLoading, error } = useGiftBySlug(slug, giftId);

  useEffect(() => {
    if (gift?.list.userId && user?.id) {
      setIsUserOwner(gift.list.userId === user.id);
    }
  }, [gift, user]);

  if (isLoading || isUserLoading) {
    return <GiftLoading />;
  }

  if (error && (error as { status: number }).status !== 404) {
    return <Error title="Ocorreu um erro ao carregar o presente" />;
  }

  if (error && (error as { status: number }).status === 404) {
    return <NotFound title="Presente não encontrado" />;
  }

  if (!gift) {
    return <NotFound title="Presente não encontrado" />;
  }

  return (
    <GiftContent gift={gift} isUserOwner={isUserOwner} slug={slug} giftId={giftId} />
  );
}