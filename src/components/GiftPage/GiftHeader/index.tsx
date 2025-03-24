"use client";

import Tag from "@/components/Tag";
import PriorityTag from "@/components/Tag/PriorityTag";
import ProgressBar from "@/components/ProgressBar";
import { Edit, Trash } from 'lucide-react';
import Button from "@/components/Button";
import { formatCurrency } from "@/utils/formatString";

interface GiftHeaderProps {
  category?: { name: string };
  priority: "LOW" | "MEDIUM" | "HIGH";
  name: string;
  description: string;
  totalValue: number;
  isUserOwner: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function GiftHeader({
  category,
  priority,
  name,
  description,
  totalValue,
  isUserOwner,
  onEdit,
  onDelete
}: GiftHeaderProps) {
  return (
    <header>
      <div className="flex items-center gap-2">
        {category && <Tag label={category.name} color="bg-green-100 text-green-800" />}
        <PriorityTag priority={priority} />
      </div>

      <h1 className="text-2xl font-bold text-text-primary mt-2">{name}</h1>
      <p className="text-md mt-2 text-text-secondary font-medium">{description}</p>

      <p className="text-2xl text-success-dark font-bold mt-2">
        {formatCurrency(totalValue)}
      </p>

      <div className="mt-4">
        <ProgressBar initialValue={totalValue} goalValue={totalValue} />
      </div>

      {isUserOwner && (
        <div className="flex items-center mt-4 gap-4 justify-end w-full sm:w-auto md:w-fit">
          <Button variant="outlined-warning" onClick={onEdit} widthFull>
            <Edit size={20} />
            Editar
          </Button>

          <Button variant="outlined-danger" onClick={onDelete} widthFull>
            <Trash size={20} />
            Excluir
          </Button>
        </div>
      )}
    </header>
  );
}