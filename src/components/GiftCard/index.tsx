import { Trash, Edit } from "lucide-react";
import Image from "next/image";
import Tag from "../Tag";
import PriorityTag from "../Tag/PriorityTag";
import { formatCurrency } from "@/utils/formatString";

interface GiftCardProps {
  photo: string;
  title: string;
  category: string;
  price: number;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  isUserOwner?: boolean;
}

const GiftCard = ({ photo, title, category, price, description, priority, isUserOwner }: GiftCardProps) => {
  return (
    <article className="w-full max-w-sm border border-gray-200 rounded-lg bg-white overflow-hidden shadow-md">
      <div className="relative w-full h-40 bg-gray-500">
        <Image
          src={photo}
          alt={`Imagem do presente ${title}`}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>

      <section className="p-4 space-y-4">
        <header className="flex items-center justify-between">
          <Tag label={category} color="bg-primary text-white" />
          <span className="text-lg font-bold text-success-dark">{formatCurrency(price)}</span>
        </header>

        <h3 className="text-lg font-semibold text-text-primary">{title}</h3>

        <p className="text-sm text-text-secondary">{description}</p>

        <footer className="flex justify-between items-center">
          <PriorityTag priority={priority} />
          {isUserOwner && (
            <div className="flex gap-4">
              <button
                className="text-warning hover:text-warning-dark"
                aria-label={`Editar ${title}`}
              >
                <Edit size={20} />
              </button>
              <button
                className="text-danger hover:text-danger-dark"
                aria-label={`Excluir ${title}`}
              >
                <Trash size={20} />
              </button>
            </div>
          )}
        </footer>
      </section>
    </article>
  );
};

export default GiftCard;
