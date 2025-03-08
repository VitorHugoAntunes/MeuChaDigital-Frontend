// app/lists/[list]/gifts/page.tsx
"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useParams } from "next/navigation";
import GiftList from "@/components/GiftList";
import { useGiftsBySlug } from "@/hooks/gifts";

export default function GiftsPage() {
  const { user } = useAuth();
  const slug = useParams().list as string;
  const { data, isLoading, error, refetch } = useGiftsBySlug(slug);
  const isUserOwner = true; // O dono da lista sempre tem permissão de edição

  return (
    <GiftList
      gifts={data?.gifts || []}
      giftList={data?.giftList || { id: "", name: "" }}
      slug={slug}
      isLoading={isLoading}
      error={error}
      isUserOwner={isUserOwner}
      onAddGiftSuccess={refetch} // Atualiza a lista após adicionar um presente
    />
  );
}