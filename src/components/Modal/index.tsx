"use client";

import { memo, ReactNode } from "react";
import { ModalWrapper } from "./ModalWrapper";
import { ModalHeader } from "./ModalHeader";
import { AddGiftModal } from "./ModalContent/AddGiftModal";
import { AddPixKeyModal } from "./ModalContent/addPixKeyModal";
import { ActionModal } from "./ModalContent/actionModal";

interface ModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  modalType: "gift" | "pix" | "action";
  action?: "Sair" | "Excluir";
  actionTitle?: string;
  actionDescription?: string;
  isLoading?: boolean;
  giftListId?: string;
  userId?: string;
  onSuccess?: () => void;
}

const Modal = ({ isModalOpen, setIsModalOpen, modalType, giftListId, isLoading, action, actionTitle, actionDescription, userId, onSuccess }: ModalProps) => {
  const closeModal = () => setIsModalOpen(false);

  const modalComponents: Record<string, ReactNode | null> = {
    gift: giftListId && userId ? (
      <AddGiftModal giftListId={giftListId} userId={userId} onClose={closeModal} onSuccess={onSuccess} />
    ) : null,
    pix: <AddPixKeyModal onClose={closeModal} />,
    action: <ActionModal action={action || ""} description={actionDescription || ""} isLoading={isLoading} onSuccess={onSuccess} onClose={closeModal} />,
  };

  return (
    <ModalWrapper isOpen={isModalOpen} onClose={closeModal}>
      <ModalHeader
        title={{
          gift: "Adicionar presente",
          pix: "Adicionar chave Pix",
          action: actionTitle,
        }[modalType] || "Modal"}
        onClose={closeModal}
      />
      {modalComponents[modalType] || null}
    </ModalWrapper>
  );
};

export default memo(Modal);
