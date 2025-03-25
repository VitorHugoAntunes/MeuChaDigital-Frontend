"use client";

import { useGetInvitationGifts } from "@/hooks/invitation";
import GiftList from "@/components/GiftList";
import InvitationLayout from "@/layouts/InvitationLayout/layout";
import { useEffect } from "react";

export default function InvitationGifts() {
  const subdomain = window.location.hostname.split('.')[0];
  const { data, isLoading, error, refetch } = useGetInvitationGifts();
  const isUserOwner = false;

  useEffect(() => {
    console.log(subdomain);
    refetch();
  }, [subdomain, refetch]);

  return (
    <InvitationLayout title={data?.giftList.name || undefined}>
      <GiftList
        gifts={data?.gifts || []}
        giftList={data?.giftList || { id: "", name: "", description: "" }}
        isLoading={isLoading}
        isInvitationPage
        slug={data?.giftList.slug}
        error={error as { status: number; message: string } | null}
        isUserOwner={isUserOwner}
      />
    </InvitationLayout>
  );
}