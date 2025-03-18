"use client";

import GiftHeader from "@/components/GiftPage/GiftHeader";
import GiftDetails from "@/components/GiftPage/GiftDetails";
import PaymentAside from "@/components/GiftPage/PaymentAside";

interface Gift {
  id: string;
  name: string;
  photo?: { url: string };
  category?: { name: string };
  totalValue: number;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  list: { userId: string };
}

interface GiftContentProps {
  gift: Gift;
  isUserOwner: boolean;
  slug: string;
  isInvitationPage?: boolean;
  giftId: string;
}

export default function GiftContent({ gift, isUserOwner, slug, isInvitationPage, giftId }: GiftContentProps) {
  return (
    <main className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 mt-8 py-6 h-fit w-full">
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

      <PaymentAside
        isUserOwner={isUserOwner}
        slug={slug}
        giftId={giftId}
        giftName={gift.name}
        maxAmount={gift.totalValue}
        isInvitationPage={isInvitationPage}
      />
    </main>
  );
}