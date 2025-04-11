"use client";

import Button from "@/components/Button";
import { Loader2, Plus, ShieldCheck, TriangleAlert } from "lucide-react";
import Image from "next/image";
import Card from "@/components/Card";
import KeyInfo from "@/components/ProfilePage/KeyInfo";
import TipCard from "@/components/ProfilePage/TipCard";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import { useAuth } from "@/contexts/AuthContext";
import { redirect, useRouter } from "next/navigation";
import { useGetAllPixKeysByUser, useDeletePixKey } from "@/hooks/pixKey";
import { PixKeyCreateData } from "@/api/pixKey";
import { BankAccount as BankAccountCreateData } from "@/api/bankAccount";
import { translateBankAccountType, translateString } from "@/utils/translateString";
import { formatCNPJ, formatCPF, formatPhone } from "@/utils/formatString";
import { ToastContainer } from "react-toastify";
import { useDeleteUser } from "@/hooks/user";
import { useContributions } from "@/hooks/contribution";
import ContributionCard from "@/components/ContributionCard";
import { useUserPayment } from "@/contexts/UserPaymentContext";
import { useGetAllUserBankAccounts, useDeleteBankAccount } from "@/hooks/bankAccount";

interface PixKey extends PixKeyCreateData {
  id: string;
}

interface BankAccount extends BankAccountCreateData {
  id: string;
}

export default function ProfilePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"pix" | "bankAccount" | "deleteBankAccount" | "deletePixKey" | "logout" | "deleteAccount" | null>(null);
  const [selectedPixKeyId, setSelectedPixKeyId] = useState<string | null>(null);
  const [selectedBankAccountId, setSelectedBankAccountId] = useState<string | null>(null);

  const { user, logoutUser, isLoading, isLoggingOut } = useAuth();
  const { handleSelectFirstBankAccount } = useUserPayment();

  const router = useRouter();

  const { data: pixKeys, isLoading: isGettingAllPixKeysLoading } = useGetAllPixKeysByUser(user?.id || "");
  const { data: bankAccounts, isLoading: isGettingUserBankAccountsLoading } = useGetAllUserBankAccounts(user?.id || "");
  const { data: contributions, isLoading: isGettingAllContributions } = useContributions(user?.id || "");
  const { mutateAsync: deletePixKey, isLoading: isDeletingPixKey } = useDeletePixKey();
  const { mutateAsync: deleteBankAccount, isLoading: isDeletingBankAccount } = useDeleteBankAccount();
  const { mutateAsync: deleteUser, isLoading: isDeletingUser } = useDeleteUser();

  const openAddPixKeyModal = () => {
    setModalType("bankAccount");
    setIsModalOpen(true);
  };

  // const openDeletePixKeyModal = (pixKeyId: string) => {
  //   setModalType("deletePixKey");
  //   setIsModalOpen(true);
  //   setSelectedPixKeyId(pixKeyId);
  // };

  const openDeleteBankAccountModal = (bankAccountId: string) => {
    setModalType("deleteBankAccount");
    setIsModalOpen(true);
    setSelectedBankAccountId(bankAccountId);
  }

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

  // async function handleDeletePixKey(pixKeyId: string) {
  //   try {
  //     await deletePixKey(pixKeyId);

  //     const updatedKeys = pixKeys?.filter((key: { id: string; }) => key.id !== pixKeyId) || [];

  //     if (updatedKeys.length === 0) {
  //       handleSelectFirstBankAccount([]);
  //     } else {
  //       handleSelectFirstBankAccount(updatedKeys);
  //     }

  //     setIsModalOpen(false);
  //   } catch (error) {
  //     console.error("Erro ao excluir a chave PIX", error);
  //   }
  // }

  async function handleDeleteBankAccount(bankAccountId: string) {
    try {
      await deleteBankAccount({ userId: user?.id || "", accountId: bankAccountId });

      const updatedAccounts = bankAccounts?.filter((account: { id: string; }) => account.id !== bankAccountId) || [];

      if (updatedAccounts.length === 0) {
        handleSelectFirstBankAccount([]);
      } else {
        handleSelectFirstBankAccount(updatedAccounts);
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error("Erro ao excluir a conta bancária", error);
    }
  }

  async function handleDeleteAccount() {
    await deleteUser(user?.id || "");
    redirect("/");
  }

  function handleToAllContributions() {
    router.push("/contributions");
  }

  console.log("bankAccounts", bankAccounts);

  useEffect(() => {
    if (bankAccounts) {
      const storedBankaccountId = localStorage.getItem('selectedBankAccountId');
      if (storedBankaccountId && !bankAccounts.some((bankAccount: { id: string; }) => bankAccount.id === storedBankaccountId)) {
        localStorage.removeItem('selectedBankAccountId');
      }

      handleSelectFirstBankAccount(bankAccounts);
    }
  }, [bankAccounts, handleSelectFirstBankAccount]);

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
            <h2 className="text-xl font-semibold text-text-primary">Contas Bancárias</h2>
            <div className="w-full sm:w-auto">
              <Button onClick={openAddPixKeyModal} widthFull>
                <Plus size={20} />
                Adicionar conta bancária
              </Button>
            </div>
          </div>

          <p className="text-md text-text-secondary mt-4">
            A conta bancária selecionada será utilizada para receber contribuições.
          </p>

          <div className="mt-6 space-y-4">
            {isGettingUserBankAccountsLoading ? (
              <div className="flex justify-center items-center py-4">
                <Loader2 className="h-12 w-12 text-primary-light animate-spin" />
              </div>
            ) : bankAccounts && bankAccounts.length > 0 ? (
              bankAccounts.map((bankAccount: BankAccount) => (
                <KeyInfo
                  key={bankAccount.id}
                  title={translateBankAccountType(bankAccount.type)}
                  type="BANK-ACCOUNT"
                  bankAccount={bankAccount}
                  action={() => openDeleteBankAccountModal(bankAccount.id)}
                />
              ))
            ) : (
              <p className="text-md md:text-center text-text-secondary">Nenhuma conta bancária cadastrada.</p>
            )}
          </div>
        </Card>

        <Card>
          <h3 className="text-xl font-semibold text-text-primary mb-4">Histórico de Contribuições</h3>

          <div className="flex flex-col gap-4">
            {isGettingAllContributions ? (
              <div className="flex justify-center items-center py-4">
                <Loader2 className="h-12 w-12 text-primary-light animate-spin" />
              </div>
            ) : contributions && contributions.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {contributions.slice(0, 4).map((contribution) => (
                    <ContributionCard
                      key={contribution.id}
                      contribution={contribution}
                    />
                  ))}
                </div>
                <div className="w-full sm:w-fit self-center">
                  <Button
                    variant="outlined"
                    widthFull
                    onClick={handleToAllContributions}
                  >
                    Ver tudo
                  </Button>
                </div>
              </>
            ) : (
              <p className="text-md md:text-center text-text-secondary">Nenhuma transação realizada.</p>
            )}
          </div>
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
          {modalType === "bankAccount" && (
            <Modal
              modalType="bankAccount"
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          )}
          {modalType === "deleteBankAccount" && (
            <Modal
              action="Excluir"
              actionTitle="Excluir conta bancária"
              actionDescription="Tem certeza que deseja excluir esta conta bancária?"
              modalType="action"
              isLoading={isDeletingBankAccount}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              onSuccess={() => {
                if (selectedBankAccountId) {
                  handleDeleteBankAccount(selectedBankAccountId);
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