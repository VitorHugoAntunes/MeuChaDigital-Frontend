import { Trash } from "lucide-react";

interface KeyInfoProps {
  title: string;
  value: string;
  action?: () => void;
}

export default function KeyInfo({ title, value, action }: KeyInfoProps) {

  return (
    <article className="flex justify-between items-center rounded-lg p-4 border border-gray-200">
      <div className="flex flex-col">
        <h3 className="text-sm font-semibold text-gray-400 uppercase">{title}</h3>
        <p className="text-lg font-bold text-text-secondary">{value}</p>
      </div>

      <button className="p-2 rounded-lg hover:bg-danger/20 transition-colors duration-300 group" onClick={action} title="Excluir chave PIX">
        <Trash size={20} className="text-danger group-hover:text-danger-dark transition-colors duration-300" />
      </button>
    </article>
  );
}