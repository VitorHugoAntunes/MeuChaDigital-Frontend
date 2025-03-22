import Button from "../Button";
import { ChevronLeft, ChevronRight } from "lucide-react"
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  return (
    <div className="flex gap-2">
      <Button
        variant="neutral"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft size={16} className="sm:hidden" />
        <span className="hidden sm:inline">Anterior</span>
      </Button>

      <span className="px-4 py-2 text-sm text-text-secondary">
        Página {currentPage} de {totalPages}
      </span>

      <Button
        variant="neutral"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <span className="hidden sm:inline">Próxima</span>
        <ChevronRight size={16} className="sm:hidden" />
      </Button>
    </div>
  );
};