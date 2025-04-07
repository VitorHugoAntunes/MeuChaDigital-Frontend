import { Trash } from "lucide-react";
import { useUserPayment } from "@/contexts/UserPaymentContext"; // Ajuste o caminho conforme necessário

interface KeyInfoProps {
  title: string;
  value: string;
  type?: "DEFAULT" | "PIX-KEY";
  action?: () => void;
  pixKey?: {
    id: string; userId: string; key: string; type: string;
  }
}

export default function KeyInfo({ title, value, type, action, pixKey }: KeyInfoProps) {
  const { pixKey: selectedPixKey, handleSetPixKey } = useUserPayment();

  const isSelected = pixKey && selectedPixKey?.id === pixKey.id;

  return (
    <article className={`
      flex justify-between items-center rounded-lg p-4 border
      dark:border-gray-light border-gray-dark
      transition-all duration-300 ease-in-out
      ${type === "PIX-KEY" ? `
        cursor-pointer
        hover:bg-gray-50 hover:border-primary hover:shadow-sm
        dark:hover:bg-gray-800 dark:hover:border-primary
        ${isSelected ? 'border-primary-extraDark dark:border-primary-extraDark' : ''}
      ` : ''}
    `}
      onClick={() => type === "PIX-KEY" && pixKey && handleSetPixKey(pixKey)}
    >
      <div
        className="flex flex-col flex-grow"
      >
        <div className="flex items-center gap-3">
          {type === "PIX-KEY" && (
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
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs md:text-sm font-semibold text-gray-400 uppercase">{title}</h3>
            </div>
            <p className="text-md md:text-lg font-bold text-text-secondary">{value}</p>
          </div>
        </div>
      </div>

      {action && (
        <button
          className="p-2 rounded-lg hover:bg-danger transition-colors duration-300 group/delete"
          onClick={(e) => {
            e.stopPropagation();
            action();
          }}
          title="Excluir chave PIX"
        >
          <Trash size={18} className="text-danger group-hover/delete:text-white transition-colors duration-300" />
        </button>
      )}
    </article>
  );
}