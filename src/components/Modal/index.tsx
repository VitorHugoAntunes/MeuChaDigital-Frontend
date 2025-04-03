"use client";

import { memo, ReactNode } from "react";
import { ModalWrapper } from "./ModalWrapper";
import { ModalHeader } from "./ModalHeader";
import { AddGiftModal } from "./ModalContent/AddGiftModal";
import { AddPixKeyModal } from "./ModalContent/addPixKeyModal";
import { ActionModal } from "./ModalContent/actionModal";
import { GiftUpdateFormData } from "@/schemas/createGiftSchema";
import { EditInviteeModal } from "./ModalContent/editInviteeModal";
import { UpdateInviteeFormData } from "@/schemas/createInviteeSchema";

interface ModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  modalType: "gift" | "pix" | "invitee" | "action";
  action?: "Sair" | "Excluir" | "Confirmar" | "Rejeitar";
  actionTitle?: string;
  isActionSuccess?: boolean;
  isEdit?: boolean;
  initialValues?: GiftUpdateFormData | UpdateInviteeFormData;
  actionDescription?: string;
  isLoading?: boolean;
  giftListId?: string;
  userId?: string;
  slug?: string;
  onSuccess?: () => void;
}

const Modal = ({ isModalOpen, setIsModalOpen, modalType, giftListId, isActionSuccess, isEdit, initialValues, isLoading, action, actionTitle, actionDescription, userId, slug, onSuccess }: ModalProps) => {
  const closeModal = () => setIsModalOpen(false);

  const modalComponents: Record<string, ReactNode | null> = {
    gift: giftListId && userId ? (
      <AddGiftModal giftListId={giftListId} userId={userId} isEdit={isEdit} initialValues={initialValues as GiftUpdateFormData} onClose={closeModal} onSuccess={onSuccess} />
    ) : null,
    pix: <AddPixKeyModal onClose={closeModal} />,
    invitee: <EditInviteeModal onClose={closeModal} slug={slug as string} initialValues={initialValues as UpdateInviteeFormData} onSuccess={onSuccess} />,
    action: <ActionModal action={action || ""} description={actionDescription || ""} isActionSuccess={isActionSuccess} isLoading={isLoading} onSuccess={onSuccess} onClose={closeModal} />,
  };

  return (
    <ModalWrapper modalTitle={
      {
        gift: "Adicionar presente",
        pix: "Adicionar chave Pix",
        invitee: "Editar convidado",
        action: actionTitle,
      }[modalType] || "Modal"
    } isOpen={isModalOpen} onClose={closeModal}>
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
