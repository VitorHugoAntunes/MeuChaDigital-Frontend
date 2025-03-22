"use client";

import { useEffect } from "react";

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const ModalWrapper = ({ isOpen, onClose, children }: ModalWrapperProps) => {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (isOpen) {
      html.classList.add("overflow-y-hidden");
      body.classList.add("overflow-y-hidden");
    } else {
      html.classList.remove("overflow-y-hidden");
      body.classList.remove("overflow-y-hidden");
    }

    return () => {
      html.classList.remove("overflow-y-hidden");
      body.classList.remove("overflow-y-hidden");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"
      role="dialog"
      aria-labelledby="modal-title"
      aria-hidden={!isOpen}
      onClick={onClose} // Fecha o modal ao clicar fora
    >
      <div
        className="bg-white p-4 m-4 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300"
        onClick={(e) => e.stopPropagation()} // Impede que o modal feche ao clicar dentro
      >
        {children}
      </div>
    </div>
  );
};