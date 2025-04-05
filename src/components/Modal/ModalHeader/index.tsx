"use client";

import { X } from "lucide-react";

interface ModalHeaderProps {
  title: string;
  type?: "gift" | "pix" | "invitee" | "paymentConfirmation" | "action";
  onClose: () => void;
}

export const ModalHeader = ({ title, type, onClose }: ModalHeaderProps) => {
  return (
    type !== "paymentConfirmation" && (
      <header className="flex justify-between items-center mb-4">
        <>
          <h2 id="modal-title" className="text-lg font-semibold text-text-primary">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-gray-400 dark:hover:text-text-primary"
            aria-label="Fechar modal"
          >
            <X size={20} />
          </button>
        </>

      </header>
    )
  );
};