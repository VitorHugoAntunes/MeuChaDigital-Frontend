"use client";

import { useState } from "react";
import GiftHeader from "@/components/GiftPage/GiftHeader";
import GiftDetails from "@/components/GiftPage/GiftDetails";
import PaymentAside from "@/components/GiftPage/PaymentAside";
import Modal from "@/components/Modal";
import { useDeleteGift } from "@/hooks/gifts";
import { GiftUpdateFormData } from "@/schemas/createGiftSchema";
import { useAuth } from "@/contexts/AuthContext";
import { ToastContainer } from "react-toastify";

interface Gift {
  id: string;
  name: string;
  photo?: { url: string };
  category?: { id: string; name: string };
  totalValue: number;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  list: { userId: string };
  totalContributions: number;
  onGiftUpdated?: () => void;
}

interface GiftContentProps {
  gift: Gift;
  isUserOwner: boolean;
  slug: string;
  isInvitationPage?: boolean;
  giftId: string;
  onGiftUpdated?: () => void;
}

export default function GiftContent({
  gift,
  isUserOwner,
  slug,
  isInvitationPage,
  giftId,
  onGiftUpdated,
}: GiftContentProps) {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"editGift" | "deleteGift">("editGift");
  const [initialValues, setInitialValues] = useState<GiftUpdateFormData | undefined>(undefined);
  const { isLoading: isDeletingGift, mutateAsync: deleteGift } = useDeleteGift(slug);

  const openEditGiftModal = () => {
    setModalType("editGift");
    setIsModalOpen(true);

    async function getGiftPhotoFile() {
      if (gift.photo?.url) {
        const response = await fetch(gift.photo.url);
        const blob = await response.blob();
        return new File([blob], "giftPhoto", { type: "image/jpeg" });
      }
      return new File([], "default");
    }

    getGiftPhotoFile().then((file) => {
      setInitialValues({
        id: gift.id,
        name: gift.name,
        totalValue: gift.totalValue,
        categoryId: gift.category?.id || "",
        priority: gift.priority,
        description: gift.description,
        giftPhoto: file,
        userId: user?.id || "",
        giftListId: gift.list.userId,
      });
    });
  };

  const openDeleteGiftModal = () => {
    setModalType("deleteGift");
    setIsModalOpen(true);
  };

  const confirmDeleteGift = async () => {
    try {
      await deleteGift({ giftListId: gift.list.userId, giftId: gift.id });
      setIsModalOpen(false);
      window.location.href = `/lists/${slug}`;
    } catch (error) {
      console.error("Erro ao excluir presente:", error);
    }
  };

  return (
    <>
      <main className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 lg:mt-8 py-6 h-fit w-full">
        <section className="bg-white rounded-lg p-6 border border-gray-200">
          <GiftHeader
            category={gift.category}
            priority={gift.priority}
            name={gift.name}
            description={gift.description}
            totalValueContributed={gift.totalContributions}
            totalValue={gift.totalValue}
            isUserOwner={isUserOwner}
            onEdit={openEditGiftModal}
            onDelete={openDeleteGiftModal}
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

      {isModalOpen && (
        <>
          {modalType === "editGift" && (
            <Modal
              giftListId={gift.list.userId}
              userId={user?.id || ""}
              modalType="gift"
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              initialValues={initialValues}
              isEdit
              onSuccess={onGiftUpdated}
            />
          )}
          {modalType === "deleteGift" && (
            <Modal
              giftListId={gift.list.userId}
              userId={user?.id || ""}
              modalType="action"
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              action="Excluir"
              actionTitle="Excluir Presente"
              actionDescription="Tem certeza que deseja excluir este presente?"
              isLoading={isDeletingGift}
              onSuccess={confirmDeleteGift}
            />
          )}
        </>
      )}
      <ToastContainer />
    </>
  );
}