// app/invitation/gift/[gift]/page.tsx
"use client";

import { useGetInvitationGift } from "@/hooks/invitation";
import InvitationLayout from "@/layouts/InvitationLayout/layout";
import { useParams } from "next/navigation";
import GiftContent from "@/components/GiftContent"; // Importe o componente compartilhado
import GiftLoading from "@/components/GiftPage/GiftLoading";
import Error from "@/components/Error";
import NotFound from "@/components/NotFound";

export default function InvitationGiftPage() {
  const giftId = useParams().gift as string;
  const { data: gift, isLoading, error } = useGetInvitationGift(giftId);

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
    <InvitationLayout title={gift.list.name || undefined}>
      <GiftContent gift={gift} isUserOwner={false} slug={gift.list.slug} giftId={giftId} isInvitationPage />
    </InvitationLayout>
  );
}