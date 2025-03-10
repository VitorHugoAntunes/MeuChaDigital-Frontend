"use client";

import Button from "@/components/Button";
import { Plus, ShieldCheck, TriangleAlert } from "lucide-react";
import Image from "next/image";
import Card from "@/components/Card";
import KeyInfo from "@/components/ProfilePage/KeyInfo";
import TipCard from "@/components/ProfilePage/TipCard";
import { useState } from "react";
import Modal from "@/components/Modal";
import { useAuth } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";
import { useGetAllPixKeysByUser } from "@/hooks/pixKey";
import { PixKeyCreateData } from "@/api/pixKey";
import { translateString } from "@/utils/translateString";
import { formatCPF, formatPhone } from "@/utils/formatString";
import { ToastContainer } from "react-toastify";

interface PixKey extends PixKeyCreateData {
  id: string;
}

export default function ProfilePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, logoutUser } = useAuth();

  const { data: pixKeys, isLoading } = useGetAllPixKeysByUser(user?.id || "");

  function handleLogout() {
    logoutUser();
    redirect("/");
  }

  return (
    <main className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 mt-8 py-6 px-4 md:px-8 h-fit">
      <section className="flex flex-col gap-6">
        <Card>
          <header className="flex items-center gap-4">
            <picture className="w-16 h-16 bg-gray-500 rounded-full overflow-hidden">
              <Image
                src={user?.photo.url || "/avatar-placeholder.png"}
                alt={user?.name || "Avatar"}
                width={64}
                height={64}
              />
            </picture>
            <div>
              <h1 className="text-2xl font-bold text-text-primary">{user?.name || "Vitor Hugo"}</h1>
              <p className="text-md text-text-secondary">{user?.email || "email@gmail.com"}</p>
            </div>
          </header>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-text-primary">Chaves PIX</h2>
            <Button onClick={() => setIsModalOpen(true)}>
              Adicionar chave
              <Plus size={20} />
            </Button>
          </div>

          <div className="mt-6 space-y-4">
            {isLoading ? (
              <div className="flex justify-center items-center py-4">
                <span className="text-text-secondary">Carregando...</span>
              </div>
            ) : pixKeys && pixKeys.length > 0 ? (

              pixKeys.map((key: PixKey) => (
                <KeyInfo
                  key={key.id}
                  title={translateString(key.type)}
                  value={key.type === "CPF" ? formatCPF(key.key) : key.type === "PHONE" ? formatPhone(key.key) : key.key}
                />
              ))
            ) : (
              // Exibe uma mensagem se não houver chaves PIX cadastradas
              <p className="text-md text-text-secondary">Nenhuma chave PIX cadastrada.</p>
            )}
          </div>
        </Card>

        <Card>
          <h3 className="text-xl font-semibold text-text-primary mb-4">Histórico de Transações</h3>
          <p className="text-md text-text-secondary">Você ainda não realizou nenhuma transação.</p>
        </Card>

        <Card>
          <h3 className="text-xl font-semibold text-text-primary pb-2">Conta</h3>

          <div className="flex flex-col gap-4">
            <Card className="py-4 flex items-center justify-between gap-4">
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-text-primary">Sair da conta</h4>
                <p className="text-md text-text-secondary">Saia da sua conta a qualquer momento.</p>
              </div>
              <Button variant="outlined-danger" onClick={handleLogout}>
                Sair da conta
              </Button>
            </Card>

            <Card className="py-4 flex items-center justify-between gap-4">
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-text-primary">Excluir conta</h4>
                <p className="text-md text-text-secondary">
                  Para excluir sua conta, todas as suas listas devem estar com o status &quot;<strong>INATIVA</strong>&quot;.
                </p>
              </div>
              <Button variant="danger">
                Excluir conta
              </Button>
            </Card>
          </div>
        </Card>
      </section>

      <aside className="flex flex-col gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-text-primary mb-4">Sobre Chaves Pix</h3>
          <p className="text-md text-text-secondary leading-relaxed">
            Chaves PIX são identificadores que facilitam suas transações. Você pode cadastrar até 5 chaves diferentes para sua conta.
          </p>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-text-primary mb-4">Dicas de Segurança</h3>
          <div className="space-y-4">
            <TipCard icon={<ShieldCheck size={20} className="text-success" />}>
              Não compartilhe suas chaves PIX com ninguém.
            </TipCard>
            <TipCard icon={<TriangleAlert size={20} className="text-warning" />}>
              Mantenha seus dados cadastrais sempre atualizados.
            </TipCard>
          </div>
        </Card>
      </aside>

      {isModalOpen && (
        <Modal modalType="pix" isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      )}

      <ToastContainer /> {/* Adicione o ToastContainer aqui */}
    </main>
  );
}