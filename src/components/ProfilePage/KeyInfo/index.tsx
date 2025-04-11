import { Trash, Eye, EyeOff } from "lucide-react";
import { useUserPayment } from "@/contexts/UserPaymentContext";
import { formatBankAccount, formatCNPJ, formatCPF } from "@/utils/formatString";
import Tag from "@/components/Tag";
import { useState } from "react";

interface KeyInfoProps {
  title: string;
  type?: "DEFAULT" | "PIX-KEY" | "BANK-ACCOUNT";
  action?: () => void;
  bankAccount?: {
    id: string; userId: string; account: string; type: string; cpf?: string; cnpj?: string;
  }
}

const maskCPF = (cpf: string): string => {
  const clean = cpf.replace(/\D/g, '');
  if (clean.length !== 11) return cpf;
  return `***.${clean.slice(3, 6)}.***-**`;
};

const maskCNPJ = (cnpj: string): string => {
  const clean = cnpj.replace(/\D/g, '');
  if (clean.length !== 14) return cnpj;
  return `**.${clean.slice(2, 5)}.${clean.slice(5, 8)}/****-**`;
};


const maskAccount = (value: string): string => {
  const clean = value.replace(/\D/g, '');
  if (clean.length <= 2) return '*'.repeat(clean.length);
  return `${'*'.repeat(2)}${clean.slice(2, -2)}${'*'.repeat(2)}`;
};

export default function KeyInfo({ title, type, action, bankAccount }: KeyInfoProps) {
  const { bankAccount: selectedBankAccount, handleSetBankAccount } = useUserPayment();
  const isSelected = bankAccount && selectedBankAccount?.id === bankAccount.id;

  const [showSensitive, setShowSensitive] = useState(false);

  const maskedCpfOrCnpj = bankAccount?.type === "PERSONAL"
    ? maskCPF(bankAccount?.cpf || "")
    : maskCNPJ(bankAccount?.cnpj || "");


  const fullCpfOrCnpj = bankAccount?.type === "PERSONAL"
    ? formatCPF(bankAccount?.cpf || "")
    : formatCNPJ(bankAccount?.cnpj || "");

  const maskedAccount = maskAccount(bankAccount?.account || "");
  const fullAccount = formatBankAccount(bankAccount?.account || "");

  return (
    <article className={`
      flex justify-between items-center rounded-lg p-4 border
      dark:border-gray-light border-gray-dark
      transition-all duration-300 ease-in-out
      ${type === "BANK-ACCOUNT" ? `
        cursor-pointer
        hover:bg-gray-50 hover:border-primary hover:shadow-sm
        dark:hover:bg-gray-800 dark:hover:border-primary
        ${isSelected ? 'border-primary-extraDark dark:border-primary-extraDark' : ''}
      ` : ''}
    `}
      onClick={() => type === "BANK-ACCOUNT" && bankAccount && handleSetBankAccount(bankAccount)}
    >
      <div className="flex flex-col flex-grow">
        <div className="flex items-center gap-3">
          {type === "BANK-ACCOUNT" && (
            <div className="relative flex items-center">
              <div className={`w-5 h-5 rounded-full border ${isSelected
                ? 'border-primary bg-primary'
                : 'border-gray-400 dark:border-gray-500'
                } flex items-center justify-center`}>
                {isSelected && (
                  <div className="w-2 h-2 rounded-full bg-white dark:bg-gray-900"></div>
                )}
              </div>
            </div>
          )}

          <div className="w-full flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Tag label={title} color="NEUTRAL" />
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <h3 className="text-xs font-semibold text-text-secondary">
                  {bankAccount?.type === "PERSONAL" ? "CPF" : "CNPJ"}
                </h3>
                <p className="text-sm font-bold text-text-primary">
                  {showSensitive ? fullCpfOrCnpj : maskedCpfOrCnpj}
                </p>
              </div>
              <div className="flex flex-col">
                <h3 className="text-sm font-semibold text-text-secondary">
                  Número da Conta
                </h3>
                <p className="text-sm font-normal text-text-primary">
                  {showSensitive ? fullAccount : maskedAccount}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowSensitive(!showSensitive);
          }}
          className="p-2 rounded-lg transition-colors duration-300 hover:bg-gray-dark dark:hover:bg-gray-light group/eye"
          title={showSensitive ? "Ocultar dados" : "Mostrar dados"}
        >
          {showSensitive ? (
            <EyeOff
              size={18}
              className="text-text-primary transition-colors duration-300"
            />
          ) : (
            <Eye
              size={18}
              className="text-text-primary transition-colors duration-300"
            />
          )}
        </button>

        {/* Trash Button - Danger Color (mantido original) */}
        {action && (
          <button
            className="p-2 rounded-lg hover:bg-danger transition-colors duration-300 group/delete"
            onClick={(e) => {
              e.stopPropagation();
              action();
            }}
            title="Excluir conta bancária"
          >
            <Trash size={18} className="text-danger group-hover/delete:text-white transition-colors duration-300" />
          </button>
        )}
      </div>
    </article>
  );
}
