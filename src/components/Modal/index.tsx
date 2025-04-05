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
import { PaymentConfirmation } from "./ModalContent/paymentConfirmationModal";

interface ModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  modalType: "gift" | "pix" | "invitee" | "paymentConfirmation" | "action";
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
  paymentData?: {
    transactionId: string;
    amount: string;
    timestamp: string;
    additionalInfo: {
      payer: {
        name: string;
      }
    }
  }
  onSuccess?: () => void;
}

const Modal = ({ isModalOpen, setIsModalOpen, modalType, giftListId, isActionSuccess, isEdit, initialValues, isLoading, action, actionTitle, actionDescription, userId, slug, paymentData, onSuccess }: ModalProps) => {
  const closeModal = () => setIsModalOpen(false);

  const modalComponents: Record<string, ReactNode | null> = {
    gift: giftListId && userId ? (
      <AddGiftModal giftListId={giftListId} userId={userId} isEdit={isEdit} initialValues={initialValues as GiftUpdateFormData} onClose={closeModal} onSuccess={onSuccess} />
    ) : null,
    pix: <AddPixKeyModal onClose={closeModal} />,
    invitee: <EditInviteeModal onClose={closeModal} slug={slug as string} initialValues={initialValues as UpdateInviteeFormData} onSuccess={onSuccess} />,
    paymentConfirmation: <PaymentConfirmation title="Pagamento confirmado" description="Seu pagamento foi confirmado com sucesso!" paymentData={paymentData} onClose={closeModal} />,
    action: <ActionModal action={action || ""} description={actionDescription || ""} isActionSuccess={isActionSuccess} isLoading={isLoading} onSuccess={onSuccess} onClose={closeModal} />,
  };

  return (
    <ModalWrapper
      modalTitle={
        {
          gift: "Adicionar presente",
          pix: "Adicionar chave Pix",
          paymentConfirmation: "Pagamento confirmado",
          invitee: "Editar convidado",
          action: actionTitle,
        }[modalType] || "Modal"
      }
      type={modalType}
      isOpen={isModalOpen}
      onClose={closeModal}
    >
      <ModalHeader
        title={{
          gift: { add: "Adicionar presente", edit: "Editar presente" }[isEdit ? "edit" : "add"],
          pix: "Adicionar chave Pix",
          invitee: "Editar convidado",
          paymentConfirmation: "",
          action: actionTitle,
        }[modalType] || "Modal"}
        type={modalType}
        onClose={closeModal}
      />
      {modalComponents[modalType] || null}
    </ModalWrapper>
  );
};

export default memo(Modal);
