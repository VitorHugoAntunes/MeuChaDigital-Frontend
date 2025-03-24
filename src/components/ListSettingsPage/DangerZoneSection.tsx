import Card from "@/components/Card";
import Button from "@/components/Button";

interface DangerZoneSectionProps {
  listStatus: "ACTIVE" | "INACTIVE";
  isLoading: boolean;
  onDeleteList: () => void;
}

export default function DangerZoneSection({ listStatus, isLoading, onDeleteList }: DangerZoneSectionProps) {
  return (
    <section id="zona-de-perigo">
      <Card className="border border-red-500">
        <h2 className="text-xl font-semibold text-red-500 mb-4">Zona de Risco</h2>
        <Card className="py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-text-primary">Excluir Lista</h3>
            <p className="text-sm text-text-secondary">
              Atenção! Esta ação é irreversível. Todos os convidados e o convite digital serão removidos. Para prosseguir, a lista deve estar inativa.
            </p>
          </div>

          <div className="w-full sm:w-auto">
            <Button variant="danger" onClick={onDeleteList} disabled={listStatus === "ACTIVE" || isLoading} widthFull>
              Excluir Lista
            </Button>
          </div>
        </Card>
      </Card>
    </section>
  );
}
