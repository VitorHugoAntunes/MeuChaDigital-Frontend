import { Trash, Edit } from "lucide-react";
import Image from "next/image";

interface GiftCardProps {
  photo: string;
  title: string;
  category: string;
  price: number;
  description: string;
  priority: "low priority" | "medium priority" | "high priority";
}

export default function GiftCard({ photo, title, category, price, description, priority }: GiftCardProps) {
  return (
    <div className="w-full border border-gray-200 rounded-lg bg-white overflow-hidden">

      <div className="w-full h-40 relative bg-gray-300">
        <Image src={photo} alt="Lista de Presentes" layout="fill" objectFit="cover" />
      </div>

      <div className="p-4">

        <div className="flex items-center justify-between mb-2">
          <div className="bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full">
            {category}
          </div>
          <span className="text-sm font-semibold text-text-primary">{price}</span>
        </div>

        <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>

        <span className="block text-sm text-text-secondary mb-4">{description}</span>

        <div className="bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full w-fit mb-4">
          {priority}
        </div>

        <div className="flex items-center gap-4 justify-end">
          <button className="text-warning hover:text-warning-dark">
            <Edit size={20} />
          </button>
          <button className="text-danger hover:text-danger-dark">
            <Trash size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
