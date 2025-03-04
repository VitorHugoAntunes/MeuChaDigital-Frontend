"use client";

import { memo, ReactNode } from "react";
import { ModalWrapper } from "./ModalWrapper";
import { ModalHeader } from "./ModalHeader";
import { AddGiftModal } from "./ModalContent/AddGiftModal";
import { AddPixKeyModal } from "./ModalContent/addPixKeyModal";

interface ModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  modalType: "gift" | "pix";
  giftListId: string;
  userId: string;
  onSuccess?: () => void;
}

const Modal = ({ isModalOpen, setIsModalOpen, modalType, giftListId, userId, onSuccess }: ModalProps) => {
  const closeModal = () => setIsModalOpen(false);

  const modalComponents: Record<string, ReactNode | null> = {
    gift: <AddGiftModal giftListId={giftListId} userId={userId} onClose={closeModal} onSuccess={onSuccess} />,
    pix: <AddPixKeyModal onClose={closeModal} />,
  };

  return (
    <ModalWrapper isOpen={isModalOpen} onClose={closeModal}>
      <ModalHeader
        title={{
          gift: "Adicionar presente",
          pix: "Adicionar chave Pix",
        }[modalType] || "Modal"}
        onClose={closeModal}
      />
      {modalComponents[modalType] || null}
    </ModalWrapper>
  );
};

export default memo(Modal);
