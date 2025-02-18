import { Plus, X } from "lucide-react";
import Button from "../Button";
import { useState, memo } from "react";
import InputField from "../InputField";
import InputFileUpload from "../InputFileUpload";
import InputSelect from "../InputSelect";

interface ModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const Modal = ({ isModalOpen, setIsModalOpen }: ModalProps) => {
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  console.log(bannerImage);

  const closeModal = () => setIsModalOpen(false);

  if (!isModalOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300"
      role="dialog"
      aria-labelledby="modal-title"
      aria-hidden={!isModalOpen}
      onClick={closeModal} // Fecha o modal ao clicar fora dele
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl transition-transform duration-300 transform scale-95"
        style={{ transform: isModalOpen ? 'scale(1)' : 'scale(0.95)' }}
        onClick={(e) => e.stopPropagation()} // Impede que o clique dentro do modal feche o modal
      >
        <header className="flex justify-between items-center mb-4">
          <h2 id="modal-title" className="text-lg font-semibold text-text-primary">
            Adicionar Presente
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
      </div>
    </div>
  );
};

export default memo(Modal);