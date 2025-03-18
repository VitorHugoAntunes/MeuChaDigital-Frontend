"use client";

import { GiftForm } from "@/components/Modal/ModalContent/AddGiftModal/AddGiftForm";
import { GiftUpdateFormData } from "@/schemas/createGiftSchema";
import { useEffect, useState } from "react";

interface AddGiftModalProps {
  giftListId: string;
  userId: string;
  isEdit?: boolean;
  initialValues?: GiftUpdateFormData;
  onSuccess?: () => void;
  onClose: () => void;
}

export const AddGiftModal = ({
  giftListId,
  userId,
  isEdit = false,
  initialValues,
  onSuccess,
  onClose,
}: AddGiftModalProps) => {
  const [localInitialValues, setLocalInitialValues] = useState<GiftUpdateFormData | undefined>(initialValues);

  useEffect(() => {
    setLocalInitialValues(initialValues);
  }, [initialValues]);

  return (
    <div>
      <p className="text-sm text-text-secondary mb-6">
        {isEdit ? "Edite o presente da sua lista." : "Adicione um lindo presente para sua lista de presentes."}
      </p>
      <GiftForm

        giftListId={giftListId}
        userId={userId}
        isEdit={isEdit}
        initialValues={localInitialValues}
        onSuccess={onSuccess}
        onClose={onClose}
      />
    </div>
  );
};