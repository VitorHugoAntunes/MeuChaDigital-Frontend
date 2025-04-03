"use client";

import Button from "@/components/Button";
import { Loader2, Plus, ShieldCheck, TriangleAlert } from "lucide-react";
import Image from "next/image";
import Card from "@/components/Card";
import KeyInfo from "@/components/ProfilePage/KeyInfo";
import TipCard from "@/components/ProfilePage/TipCard";
import { useState } from "react";
import Modal from "@/components/Modal";
import { useAuth } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";
import { useGetAllPixKeysByUser, useDeletePixKey } from "@/hooks/pixKey";
import { PixKeyCreateData } from "@/api/pixKey";
import { translateString } from "@/utils/translateString";
import { formatCPF, formatPhone } from "@/utils/formatString";
import { ToastContainer } from "react-toastify";
import { useDeleteUser } from "@/hooks/user";

interface PixKey extends PixKeyCreateData {
  id: string;
}

export default function ProfilePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"pix" | "deletePixKey" | "logout" | "deleteAccount" | null>(null);
  const [selectedPixKeyId, setSelectedPixKeyId] = useState<string | null>(null);

  const { user, logoutUser, isLoading, isLoggingOut } = useAuth();

  const { data: pixKeys, isLoading: isGettingAllPixKeysLoading } = useGetAllPixKeysByUser(user?.id || "");
  const { mutateAsync: deletePixKey, isLoading: isDeletingPixKey } = useDeletePixKey();
  const { mutateAsync: deleteUser, isLoading: isDeletingUser } = useDeleteUser();

  const openAddPixKeyModal = () => {
    setModalType("pix");
    setIsModalOpen(true);
  };

  const openDeletePixKeyModal = (pixKeyId: string) => {
    setModalType("deletePixKey");
    setIsModalOpen(true);
    setSelectedPixKeyId(pixKeyId);
  };

  const openLogoutModal = () => {
    setModalType("logout");
    setIsModalOpen(true);
  };

  const openDeleteAccountModal = () => {
    setModalType("deleteAccount");
    setIsModalOpen(true);
  };

  async function handleLogout() {
    await logoutUser();
    redirect("/");
  }

  async function handleDeletePixKey(pixKeyId: string) {
    try {
      await deletePixKey(pixKeyId);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erro ao excluir a chave PIX", error);
    }
  }

  async function handleDeleteAccount() {
    await deleteUser(user?.id || "");
    redirect("/");
  }

  return (
    <main className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 lg:mt-8 py-6 h-fit">
      <section className="flex flex-col gap-6">
        <Card>
          <header className="flex flex-col sm:flex-row items-center gap-4">
            <picture className="w-16 h-16 bg-gray-500 rounded-full overflow-hidden">
              {isLoading ? (
                <div className="w-full h-full bg-gray-dark animate-pulse"></div>
              ) : (
                <Image
                  src={user?.photo.url || "/default-image.png"}
                  alt={user?.name || "User"}
                  width={64}
                  height={64}
                />
              )}

            </picture>
            <div className="text-center sm:text-left">
              {isLoading ? (
                <>
                  <div className="w-24 h-6 bg-gray-dark animate-pulse"></div>
                  <div className="w-32 h-6 bg-gray-dark animate-pulse mt-2"></div>
                </>
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-text-primary">{user?.name || "Vitor Hugo"}</h1>
                  <p className="text-md text-text-secondary">{user?.email || "email@gmail.com"}</p>
                </>
              )}
            </div>
          </header>
        </Card>

        <Card>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-text-primary">Chaves PIX</h2>
            <div className="w-full sm:w-auto">
              <Button onClick={openAddPixKeyModal} widthFull>
                <Plus size={20} />
                Adicionar chave
              </Button>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {isGettingAllPixKeysLoading ? (
              <div className="flex justify-center items-center py-4">
                <Loader2 className="h-12 w-12 text-primary-light animate-spin" />
              </div>
            ) : pixKeys && pixKeys.length > 0 ? (
              pixKeys.map((key: PixKey) => (
                <KeyInfo
                  key={key.id}
                  title={translateString(key.type)}
                  value={key.type === "CPF" ? formatCPF(key.key) : key.type === "PHONE" ? formatPhone(key.key) : key.key}
                  action={() => openDeletePixKeyModal(key.id)}
                />
              ))
            ) : (
              <p className="text-md md:text-center text-text-secondary">Nenhuma chave PIX cadastrada.</p>
            )}
          </div>
        </Card>

        <Card>
          <h3 className="text-xl font-semibold text-text-primary mb-4">Histórico de Transações</h3>
          <p className="text-md md:text-center text-text-secondary">Você ainda não realizou nenhuma transação.</p>
        </Card>

        <Card>
          <h3 className="text-xl font-semibold text-text-primary pb-2">Conta</h3>

          <div className="flex flex-col gap-4">
            <Card className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-text-primary">Sair da conta</h4>
                <p className="text-md text-text-secondary">Saia da sua conta a qualquer momento.</p>
              </div>
              <div className="w-full sm:w-auto">
                <Button variant="outlined-danger" onClick={openLogoutModal} widthFull>
                  Sair da conta
                </Button>
              </div>
            </Card>

            <Card className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-text-primary">Excluir conta</h4>
                <p className="text-md text-text-secondary">
                  Para excluir sua conta, todas as suas listas devem estar com o status &quot;<strong>INATIVA</strong>&quot;.
                </p>
              </div>
              <div className="w-full sm:w-auto">
                <Button variant="danger" onClick={openDeleteAccountModal} widthFull>
                  Excluir conta
                </Button>
              </div>
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
        <>
          {modalType === "pix" && (
            <Modal
              modalType="pix"
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          )}
          {modalType === "deletePixKey" && (
            <Modal
              action="Excluir"
              actionTitle="Excluir chave PIX"
              actionDescription="Tem certeza que deseja excluir esta chave PIX?"
              modalType="action"
              isLoading={isDeletingPixKey}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              onSuccess={() => {
                if (selectedPixKeyId) {
                  handleDeletePixKey(selectedPixKeyId);
                }
              }}
            />
          )}
          {modalType === "logout" && (
            <Modal
              action="Sair"
              actionTitle="Sair da conta"
              actionDescription="Tem certeza que deseja sair da sua conta?"
              modalType="action"
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              isLoading={isLoggingOut}
              onSuccess={handleLogout}
            />
          )}
          {modalType === "deleteAccount" && (
            <Modal
              action="Excluir"
              actionTitle="Excluir conta"
              actionDescription="Tem certeza que deseja excluir sua conta?"
              modalType="action"
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              isLoading={isDeletingUser || isLoggingOut}
              onSuccess={handleDeleteAccount}
            />
          )}
        </>
      )}

      <ToastContainer />
    </main>
  );
}