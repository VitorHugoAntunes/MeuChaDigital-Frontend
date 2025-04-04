"use client";

import { useParams } from "next/navigation";
import GiftList from "@/components/GiftList";
import { useGiftsBySlug } from "@/hooks/gifts";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function GiftsPage() {
  const { user } = useAuth();
  const slug = useParams().list as string;
  const { data, isLoading, error, refetch } = useGiftsBySlug(slug, user?.id || "");

  useEffect(() => {
    refetch();
  }, [slug, refetch]);

  return (
    <GiftList
      gifts={data?.gifts || []}
      giftList={data?.giftList || { id: "", name: "" }}
      slug={slug}
      isLoading={isLoading}
      error={error}
      isUserOwner={user?.id === data?.giftList.userId}
      onAddGiftSuccess={refetch}
    />
  );
}