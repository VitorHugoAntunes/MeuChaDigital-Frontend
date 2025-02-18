"use client";

import Button from "@/components/Button";
import GiftCard from "@/components/GiftCard";
import { ImageIcon, Plus, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Gifts() {
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEventType, setSelectedEventType] = useState<string | null>(null);

  return (
    <main className="flex flex-col flex-1 w-screen my-8">
      <h1 className="text-2xl font-semibold text-text-primary">Meus Presentes</h1>
      <p className="text-md mt-2 text-text-secondary">
        Gerencie seus presentes de forma fácil e prática.
      </p>

      <div className="grid grid-cols-4 gap-4 mt-8">
        <div className="flex flex-col justify-between bg-blue-100 p-6 rounded-lg">
          <h2 className="text-sm font-semibold text-blue-500">Total de Presentes</h2>
          <span className="text-2xl font-semibold text-blue-500">0</span>
        </div>
        <div className="flex flex-col justify-between bg-success-extraLight p-6 rounded-lg">
          <h2 className="text-sm font-semibold text-success-dark">Valor arrecadado</h2>
          <span className="text-2xl font-semibold text-success-dark">R$ 0,00</span>
        </div>
        <div className="flex flex-col justify-between bg-purple-extraLight p-6 rounded-lg">
          <h2 className="text-sm font-semibold text-purple-dark">Presentes comprados</h2>
          <span className="text-2xl font-semibold text-purple-dark">0</span>
        </div>
        <div className="flex flex-col justify-between bg-warning-extraLight p-6 rounded-lg">
          <h2 className="text-sm font-semibold text-warning-dark">Contribuições</h2>
          <span className="text-2xl font-semibold text-warning-dark">0</span>
        </div>
      </div>

      <div className="mt-8">
        <Button onClick={() => setIsModalOpen(true)}>Adicionar Presente <Plus /></Button>
      </div>

      <section className="mt-8 grid grid-cols-4 gap-4">
        <GiftCard
          photo="/images/gifts/iphone.jpg"
          title="iPhone 13"
          category="Eletrônico"
          price={7999.99}
          description="O novo iPhone 13 é o presente perfeito para quem ama tecnologia."
          priority="high priority"
        />
        <GiftCard
          photo="/images/gifts/airfryer.jpg"
          title="Fritadeira Elétrica"
          category="Casa"
          price={499.99}
          description="Prepare alimentos mais saudáveis com a fritadeira elétrica."
          priority="medium priority"
        />
        <GiftCard
          photo="/images/gifts/ps5.jpg"
          title="PlayStation 5"
          category="Lazer"
          price={4999.99}
          description="O PlayStation 5 é o presente ideal para quem ama jogos."
          priority="low priority"
        />
        <GiftCard
          photo="/images/gifts/iphone.jpg"
          title="iPhone 13"
          category="Eletrônico"
          price={7999.99}
          description="O novo iPhone 13 é o presente perfeito para quem ama tecnologia."
          priority="high priority"
        />
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="max-w-2xl bg-white p-6 rounded-lg shadow-lg w-full transform transition-all duration-300 ease-out scale-100 opacity-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-text-primary">Adicionar Presente</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-600 hover:text-gray-900">
                <X size={20} />
              </button>
            </div>

            <form className="flex flex-col gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nome do presente</label>
                <input type="text" placeholder="Digite o nome do presente" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-primary focus:outline-none transition-colors" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Preço estimado</label>
                <input type="text" placeholder="Digite o preço estimado" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-primary focus:outline-none transition-colors" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Categoria</label>
                <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-primary focus:outline-none transition-colors bg-white">
                  <option value="">Selecione uma categoria</option>
                  <option value="eletronico">Eletrônico</option>
                  <option value="casa">Casa</option>
                  <option value="lazer">Lazer</option>
                  <option value="outros">Outros</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Prioridade</label>
                <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-primary focus:outline-none transition-colors bg-white">
                  <option value="">Defina a prioridade</option>
                  <option value="alta">Alta</option>
                  <option value="media">Média</option>
                  <option value="baixa">Baixa</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Descrição</label>
                <textarea placeholder="Descreva o presente" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-primary focus:outline-none transition-colors resize-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Foto Banner</label>
                <div className="mt-1 flex flex-col justify-center items-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  {bannerImage ? (
                    <Image src={URL.createObjectURL(bannerImage)} alt="Banner" className="mx-auto h-32 w-full object-cover rounded-md" />
                  ) : (
                    <>
                      <ImageIcon size={32} className='mx-auto text-gray-400' />
                      <p className="mt-1 text-sm text-gray-600">
                        Arraste e solte uma imagem ou <span className="font-medium text-primary">clique para carregar</span>
                      </p>
                    </>
                  )}
                  <input type="file" accept="image/*" className="sr-only" id="banner-upload" />
                  <label htmlFor="banner-upload" className="mt-2 inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    Carregar Imagem
                  </label>
                </div>
              </div>

              <div className="flex justify-between gap-4 w-full">
                <Button variant="outlined" widthFull onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                <Button widthFull>Adicionar Presente <Plus /></Button>
              </div>

            </form>
          </div>
        </div>
      )}
    </main>
  );
}
