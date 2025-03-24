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
    <article className="w-full relative border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full group">
      <div className="absolute top-4 left-4 z-10">
        <PriorityTag priority={priority} />
      </div>

      <div className="relative w-full h-52 bg-gray-100 overflow-hidden">
        <Image
          src={photo}
          alt={`Imagem do presente ${title}`}
          layout="fill"
          objectFit="cover"
          className="group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <section className="p-5 flex flex-col flex-1">
        <header className="mb-2">
          <Tag label={category} />
        </header>

        <div className="mb-4 flex-1">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">
            {title}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold text-success">
            {formatCurrency(price)}
          </span>

          {isUserOwner && (
            <div className="flex gap-3">
              <button
                className="p-2 rounded-lg hover:bg-warning/20 transition-colors duration-300 group"
                aria-label={`Editar ${title}`}
                title="Editar presente"
                onClick={(event) => {
                  event.preventDefault();
                  actionEditFn?.(event);
                }}
              >
                <Edit size={18} className="text-warning group-hover:text-warning-dark transition-colors duration-300" />
              </button>
              <button
                className="p-2 rounded-lg hover:bg-danger/20 transition-colors duration-300 group"
                aria-label={`Excluir ${title}`}
                title="Excluir presente"
                onClick={(event) => {
                  event.preventDefault();
                  actionDeleteFn?.(event);
                }}
              >
                <Trash size={18} className="text-danger group-hover:text-danger-dark transition-colors duration-300" />
              </button>
            </div>
          )}
        </div>
      </section>
    </article>
  );
};

export default GiftCard;