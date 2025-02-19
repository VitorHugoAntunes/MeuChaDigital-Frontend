"use client";

import Button from "@/components/Button";
import GiftCard from "@/components/GiftCard";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Modal from "@/components/Modal";
import StatCard from "@/components/StatCard";

export default function Gifts() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="flex flex-col flex-1 w-screen my-8">
      <header>
        <h1 className="text-2xl font-semibold text-text-primary">Meus Presentes</h1>
        <p className="text-md mt-2 text-text-secondary">
          Gerencie seus presentes de forma fácil e prática.
        </p>
      </header>

      <section className="grid grid-cols-4 gap-4 mt-8">
        <StatCard title="Total de Presentes" value="0" color="blue" />
        <StatCard title="Valor arrecadado" value="R$ 0,00" color="success" />
        <StatCard title="Presentes comprados" value="0" color="purple" />
        <StatCard title="Contribuições" value="0" color="warning" />
      </section>

      <div className="mt-8">
        <Button onClick={() => setIsModalOpen(true)}>Adicionar Presente <Plus /></Button>
      </div>

      <section className="mt-8 grid grid-cols-4 gap-4">
        <Link href="/lists/gifts/1">
          <GiftCard
            photo="/images/gifts/iphone.jpg"
            title="iPhone 13"
            category="Eletrônico"
            price={7999.99}
            description="O novo iPhone 13 é o presente perfeito para quem ama tecnologia."
            priority="alta"
          />
        </Link>
        <GiftCard
          photo="/images/gifts/fritadeira.jpg"
          title="Fritadeira Elétrica"
          category="Casa"
          price={499.99}
          description="Prepare alimentos mais saudáveis com a fritadeira elétrica."
          priority="média"
        />
        <GiftCard
          photo="/images/gifts/ps5.jpg"
          title="PlayStation 5"
          category="Lazer"
          price={4999.99}
          description="O PlayStation 5 é o presente ideal para quem ama jogos."
          priority="baixa"
        />
        <GiftCard
          photo="/images/gifts/iphone.jpg"
          title="iPhone 13"
          category="Eletrônico"
          price={7999.99}
          description="O novo iPhone 13 é o presente perfeito para quem ama tecnologia."
          priority="alta"
        />
      </section>

      {isModalOpen && (
        <Modal modalType="present" isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      )}
    </main>
  );
}