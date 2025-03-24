"use client";

import Button from "@/components/Button";
import GiftCard from "@/components/GiftCard";
import { Plus, Users, Settings2 } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Modal from "@/components/Modal";
import { useAuth } from "@/contexts/AuthContext";
import { GiftCardSkeleton } from "../Skeleton/giftCardSkeleton";
import { useDeleteGift } from "@/hooks/gifts";
import { ToastContainer } from "react-toastify";
import { GiftUpdateFormData } from "@/schemas/createGiftSchema";

interface Gift {
  id: string;
  name: string;
  photo?: { url: string };
  category?: { id: string; name: string };
  totalValue: number;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  list: { userId: string };
}

interface GiftListProps {
  gifts: Gift[];
  giftList: {
    id: string;
    description: string;
    name: string;
  };
  slug?: string;
  isInvitationPage?: boolean;
  isLoading: boolean;
  error: any;
  isUserOwner: boolean;
  onAddGiftSuccess?: () => void;
}

export default function GiftList({
  gifts,
  giftList,
  slug,
  isInvitationPage,
  isLoading,
  error,
  isUserOwner,
  onAddGiftSuccess,
}: GiftListProps) {
  const [mounted, setMounted] = useState(false);
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"addGift" | "deleteGift" | "editGift">("addGift");
  const [selectedGiftId, setSelectedGiftId] = useState<string | null>(null);
  const [initialValues, setInitialValues] = useState<GiftUpdateFormData | undefined>(undefined);

  const { isLoading: isDeletingGift, mutateAsync: deleteGift } = useDeleteGift(slug || "");

  useEffect(() => {
    setMounted(true);
  }, []);

  const openAddGiftModal = () => {
    setModalType("addGift");
    setIsModalOpen(true);
    setInitialValues(undefined);
  };

  const confirmDeleteGift = async () => {
    if (selectedGiftId) {
      try {
        await deleteGift({ giftListId: giftList.id, giftId: selectedGiftId });
        setIsModalOpen(false);
      } catch (error) {
        console.error("Erro ao excluir presente:", error);
      }
    }
  };

  const openDeleteGiftModal = (giftId: string, event: React.MouseEvent) => {
    event.preventDefault();
    setModalType("deleteGift");
    setIsModalOpen(true);
    setSelectedGiftId(giftId);
  };

  const openEditGiftModal = (giftId: string, event: React.MouseEvent) => {
    event.preventDefault();

    const giftToEdit = gifts.find((gift) => gift.id === giftId);
    if (giftToEdit) {
      setModalType("editGift");
      setIsModalOpen(true);
      setSelectedGiftId(giftId);

      async function getGiftPhotoFile() {
        if (giftToEdit && giftToEdit.photo?.url) {
          const response = await fetch(giftToEdit.photo.url);
          const blob = await response.blob();
          const file = new File([blob], "giftPhoto", { type: "image/jpeg" });
          return file;
        }
        return null;
      }

      getGiftPhotoFile().then((file) => {
        setInitialValues({
          id: giftToEdit.id,
          name: giftToEdit.name,
          totalValue: giftToEdit.totalValue,
          categoryId: giftToEdit.category?.id || "",
          priority: giftToEdit.priority,
          description: giftToEdit.description,
          giftPhoto: file || new File([], "default"),
          userId: user?.id || "",
          giftListId: giftList.id,
        });
      });
    }
  };

  useEffect(() => {
    if (!isModalOpen) {
      setInitialValues(undefined);
    }
  }, [isModalOpen]);

  if (isLoading || !mounted) {
    return (
      <main className="flex flex-col flex-1 w-full min-h-[30vh] md:min-h-[40vh] lg:min-h-[50vh] h-full">
        <header className="mb-8 w-screen relative left-1/2 -translate-x-1/2">
          <div className="gradient-bg bg-gradient-to-r from-[#FFF0F5] to-[#FFE4E9] shadow-sm py-4 lg:py-8">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-8">
              <div className="h-9 w-64 bg-gray-200 rounded mb-3"></div>
              <div className="h-5 w-3/4 bg-gray-200 rounded mb-6"></div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <div className="h-10 w-full sm:w-32 bg-gray-200 rounded"></div>
                  <div className="h-10 w-full sm:w-36 bg-gray-200 rounded"></div>
                  <div className="h-10 w-full sm:w-40 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-8 grid-cols-[repeat(auto-fit,16.8rem)] justify-center lg:mt-4">
          {[...Array(5)].map((_, index) => (
            <GiftCardSkeleton key={index} />
          ))}
        </section>
      </main>
    );
  }

  if (error && error.status !== 404) {
    console.error("Erro ao carregar presentes:", error);
    return (
      <div className="flex flex-col flex-1 w-full my-8 justify-center items-center">
        <p className="text-lg font-semibold text-red-500">Erro ao carregar presentes.</p>
      </div>
    );
  }

  if (error && error.status === 404) {
    return (
      <div className="flex flex-col flex-1 w-full my-8 justify-center items-center">
        <p className="text-lg font-semibold text-red-500">Lista de presentes não encontrada.</p>
      </div>
    );
  }

  return (
    <main className="flex flex-col flex-1 w-full">
      <header className="mb-8 w-screen relative left-1/2 -translate-x-1/2">
        <div className="gradient-bg bg-gradient-to-r from-[#FFF0F5] to-[#FFE4E9] shadow-sm py-4 lg:py-8">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-8">
            <h1 className="text-2xl sm:text-4xl font-bold text-text-primary mb-3">
              {giftList?.name}
            </h1>
            <p className="text-base sm:text-lg text-text-secondary mb-6">
              {giftList?.description || ""}
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {isUserOwner && (
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <Link href="/lists/[slug]/invitee-list" as={`/lists/${slug}/invitee-list`} className="w-full md:w-fit">
                    <Button variant="outlined" widthFull>
                      <Users size={20} />
                      <span>Convidados</span>
                    </Button>
                  </Link>
                  <Link href="/lists/[slug]/settings" as={`/lists/${slug}/settings`} className="w-full md:w-fit">
                    <Button variant="outlined" widthFull>
                      <Settings2 size={20} />
                      <span>Configurações</span>
                    </Button>
                  </Link>

                  <div className="w-full md:w-fit">
                    <Button onClick={openAddGiftModal} widthFull>
                      <Plus size={20} />
                      <span>Adicionar Presente</span>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <section className="lg:mt-4 w-full min-h-[30vh] md:min-h-[40vh] lg:min-h-[50vh]">
        {gifts && gifts.length > 0 ? (
          <div className="grid gap-8 grid-cols-[repeat(auto-fit,16.8rem)] justify-center">
            {gifts.map((gift) => (
              <Link
                href={
                  isInvitationPage
                    ? `http://${slug}.localhost:3000/invitation/gifts/${gift.id}`
                    : `/lists/${slug}/gifts/${gift.id}`
                }
                key={gift.id}
                className="w-full"
              >
                <GiftCard
                  key={gift.id}
                  photo={gift.photo?.url || "/default-gift.jpg"}
                  title={gift.name}
                  category={gift.category?.name || "Sem categoria"}
                  price={gift.totalValue}
                  description={gift.description}
                  priority={gift.priority}
                  isUserOwner={isUserOwner}
                  actionEditFn={(event) => openEditGiftModal(gift.id, event)}
                  actionDeleteFn={(event) => openDeleteGiftModal(gift.id, event)}
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full py-8">
            <h2 className="text-xl font-semibold text-gray-600">Nenhum presente encontrado.</h2>
            {isUserOwner && (
              <p className="text-md text-gray-500">Adicione presentes para começar sua lista!</p>
            )}
          </div>
        )}
      </section>

      {isModalOpen && (
        <>
          {modalType === "addGift" && (
            <Modal
              giftListId={giftList.id}
              userId={user?.id || ""}
              modalType="gift"
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              onSuccess={onAddGiftSuccess}
            />
          )}
          {modalType === "editGift" && (
            <Modal
              giftListId={giftList.id}
              userId={user?.id || ""}
              modalType="gift"
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              initialValues={initialValues}
              isEdit
              onSuccess={onAddGiftSuccess}
            />
          )}
          {modalType === "deleteGift" && (
            <Modal
              giftListId={giftList.id}
              userId={user?.id || ""}
              modalType="action"
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              action="Excluir"
              actionTitle="Excluir Presente"
              actionDescription="Tem certeza que deseja excluir este presente?"
              initialValues={initialValues}
              isLoading={isDeletingGift}
              onSuccess={confirmDeleteGift}
            />
          )}
        </>
      )}
      <ToastContainer />
    </main>
  );
}