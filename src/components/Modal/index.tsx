"use client";

import { Plus, X } from "lucide-react";
import Button from "../Button";
import { useState, memo, useEffect } from "react";
import InputField from "../InputField";
import InputFileUpload from "../InputFileUpload";
import InputSelect from "../InputSelect";

interface ModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  modalType: "present" | "pix";
}

const Modal = ({ isModalOpen, setIsModalOpen, modalType }: ModalProps) => {
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  console.log(bannerImage);

  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (isModalOpen) {
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
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ${isModalOpen ? "opacity-100" : "opacity-0"
        } z-50 overflow-y-hidden`}
      role="dialog"
      aria-labelledby="modal-title"
      aria-hidden={!isModalOpen}
      onClick={closeModal}
    >
      <div
        className={`bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl transform transition-all duration-300 ${isModalOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex justify-between items-center mb-4">
          <h2 id="modal-title" className="text-lg font-semibold text-text-primary">
            {modalType === "present" ? "Adicionar Presente" : "Adicionar Chave PIX"}
          </h2>
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeModal();
            }}
            className="text-gray-600 hover:text-gray-900"
            aria-label="Fechar modal"
          >
            <X size={20} />
          </button>
        </header>

        {modalType === "present" ? (
          <>
            <p className="text-sm text-text-secondary mb-6">
              Adicione um lindo presente para sua lista de presentes.
            </p>

            <form className="space-y-6">
              <InputField label="Nome do presente" type="text" placeholder="Digite o nome do presente" />
              <InputField label="Preço estimado" type="text" placeholder="Digite o preço estimado" />
              <InputSelect label="Categoria" options={["Eletrônico", "Casa", "Lazer", "Outros"]} />
              <InputSelect label="Prioridade" options={["Alta", "Média", "Baixa"]} />
              <InputField label="Descrição" type="textarea" placeholder="Descreva o presente" />
              <InputFileUpload label="Foto" onFileSelect={setBannerImage} />

              <div className="flex justify-between gap-4">
                <Button
                  variant="outlined"
                  widthFull
                  onClick={closeModal}
                  aria-label="Cancelar"
                >
                  Cancelar
                </Button>
                <Button widthFull aria-label="Adicionar presente">
                  Adicionar Presente <Plus />
                </Button>
              </div>
            </form>
          </>
        ) : (
          <form className="space-y-6">
            <InputSelect
              label="Tipo da Chave"
              options={["CPF", "E-mail", "Telefone", "Chave Aleatória"]}
            />
            <InputField
              label="Valor da Chave"
              type="text"
              placeholder="Digite o valor da chave"
            />

            <div className="flex justify-between gap-4">
              <Button
                variant="outlined"
                widthFull
                onClick={closeModal}
                aria-label="Cancelar"
              >
                Cancelar
              </Button>
              <Button widthFull aria-label="Salvar chave PIX">
                Salvar Chave PIX
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default memo(Modal);