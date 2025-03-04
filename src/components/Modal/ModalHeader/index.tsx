"use client";

import { X } from "lucide-react";

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
}

export const ModalHeader = ({ title, onClose }: ModalHeaderProps) => {
  return (
    <header className="flex justify-between items-center mb-4">
      <h2 id="modal-title" className="text-lg font-semibold text-text-primary">
        {title}
      </h2>
      <button
        onClick={onClose}
        className="text-gray-600 hover:text-gray-900"
        aria-label="Fechar modal"
      >
        <X size={20} />
      </button>
    </header>
  );
};