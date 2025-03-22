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
  actionEditFn?: (event: any) => void;
  actionDeleteFn?: (event: any) => void;
}

const GiftCard = ({
  photo,
  title,
  category,
  price,
  description,
  priority,
  isUserOwner,
  actionEditFn,
  actionDeleteFn,
}: GiftCardProps) => {
  return (
    <article className="w-full border border-gray-200 rounded-lg bg-white overflow-hidden shadow-md hover:shadow-lg flex flex-col h-full">
      <div className="relative w-full h-48 bg-gray-500">
        <Image
          src={photo}
          alt={`Imagem do presente ${title}`}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>

      <section className="p-4 space-y-4 flex flex-col flex-1">
        <header className="flex items-center justify-between">
          <Tag label={category} color="bg-primary text-white" />
          <span className="text-lg font-bold text-success-dark">
            {formatCurrency(price)}
          </span>
        </header>

        <h3 className="text-lg font-semibold text-text-primary line-clamp-2">
          {title}
        </h3>

        <p className="text-sm text-text-secondary flex-1 line-clamp-3">
          {description}
        </p>

        <footer className="flex justify-between items-center">
          <PriorityTag priority={priority} />
          {isUserOwner && (
            <div className="flex gap-4">

              <button
                className="text-warning hover:text-warning-dark transition-colors duration-200"
                aria-label={`Editar ${title}`}
                onClick={(event) => {
                  event.preventDefault();
                  actionEditFn?.(event);
                }}
              >
                <Edit size={20} />
              </button>

              <button
                className="text-danger hover:text-danger-dark transition-colors duration-200"
                aria-label={`Excluir ${title}`}
                onClick={(event) => {
                  event.preventDefault();

                  actionDeleteFn?.(event);
                }}
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