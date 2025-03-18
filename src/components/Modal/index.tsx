"use client";

import { memo, ReactNode } from "react";
import { ModalWrapper } from "./ModalWrapper";
import { ModalHeader } from "./ModalHeader";
import { AddGiftModal } from "./ModalContent/AddGiftModal";
import { AddPixKeyModal } from "./ModalContent/addPixKeyModal";
import { ActionModal } from "./ModalContent/actionModal";
import { GiftUpdateFormData } from "@/schemas/createGiftSchema";

interface ModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  modalType: "gift" | "pix" | "invitee" | "action";
  action?: "Sair" | "Excluir";
  actionTitle?: string;
  isEdit?: boolean;
  initialValues?: GiftUpdateFormData;
  actionDescription?: string;
  isLoading?: boolean;
  giftListId?: string;
  userId?: string;
  onSuccess?: () => void;
}

const Modal = ({ isModalOpen, setIsModalOpen, modalType, giftListId, isEdit, initialValues, isLoading, action, actionTitle, actionDescription, userId, onSuccess }: ModalProps) => {
  const closeModal = () => setIsModalOpen(false);

  const modalComponents: Record<string, ReactNode | null> = {
    gift: giftListId && userId ? (
      <AddGiftModal giftListId={giftListId} userId={userId} isEdit={isEdit} initialValues={initialValues} onClose={closeModal} onSuccess={onSuccess} />
    ) : null,
    pix: <AddPixKeyModal onClose={closeModal} />,
    action: <ActionModal action={action || ""} description={actionDescription || ""} isLoading={isLoading} onSuccess={onSuccess} onClose={closeModal} />,
  };

  return (
    <ModalWrapper isOpen={isModalOpen} onClose={closeModal}>
      <ModalHeader
        title={{
          gift: { add: "Adicionar presente", edit: "Editar presente" }[isEdit ? "edit" : "add"],
          pix: "Adicionar chave Pix",
          invitee: "Editar convidado",
          action: actionTitle,
        }[modalType] || "Modal"}
        onClose={closeModal}
      />
      {modalComponents[modalType] || null}
    </ModalWrapper>
  );
};

export default memo(Modal);
