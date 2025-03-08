"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useGetInvitationGifts } from "@/hooks/invitation";
import GiftList from "@/components/GiftList";
import InvitationLayout from "@/layouts/InvitationLayout/layout";

export default function InvitationGifts() {
  const { user } = useAuth();
  const { data, isLoading, error } = useGetInvitationGifts();
  const isUserOwner = false;

  return (
    <InvitationLayout title={data?.giftList.name || undefined}>
      <GiftList
        gifts={data?.gifts || []}
        giftList={data?.giftList || { id: "", name: "" }}
        isLoading={isLoading}
        isInvitationPage
        slug={data?.giftList.slug}
        error={error}
        isUserOwner={isUserOwner}
      />
    </InvitationLayout>
  );
}