// app/invitation/gifts/[gift]/checkout/page.tsx
"use client";

import CheckoutContent from "@/components/CheckoutPage/CheckoutContent";
import { useGetInvitationGift } from "@/hooks/invitation";
import InvitationLayout from "@/layouts/InvitationLayout/layout";
import { useParams } from "next/navigation";

export default function CheckoutPage() {
  const giftId = useParams().gift as string;
  const { data: gift, isLoading, error } = useGetInvitationGift(giftId);

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <InvitationLayout title={gift.list.name || undefined}>
      <CheckoutContent isInvitationPage={true} />
    </InvitationLayout>
  );
}