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
}

export default function GiftHeader({ category, priority, name, description, totalValue, isUserOwner }: GiftHeaderProps) {
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
        <div className="flex items-center mt-4 gap-4 justify-end">
          <Button variant="outlined-warning">
            <Edit size={20} />
            Editar
          </Button>

          <Button variant="outlined-danger">
            <Trash size={20} />
            Excluir
          </Button>
        </div>
      )}
    </header>
  );
}