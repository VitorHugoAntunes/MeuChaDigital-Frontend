"use client";

import { useParams } from "next/navigation";
import GiftList from "@/components/GiftList";
import { useGiftsBySlug } from "@/hooks/gifts";
import { useEffect } from "react";

export default function GiftsPage() {
  const slug = useParams().list as string;
  const { data, isLoading, error, refetch } = useGiftsBySlug(slug);
  const isUserOwner = true;

  useEffect(() => {
    refetch();
  }, [slug, refetch]);

  return (
    <GiftList
      gifts={data?.gifts || []}
      giftList={data?.giftList || { id: "", name: "" }}
      slug={slug}
      isLoading={isLoading}
      error={error as { status: number; message: string } | null}
      isUserOwner={isUserOwner}
      onAddGiftSuccess={refetch}
    />
  );
}