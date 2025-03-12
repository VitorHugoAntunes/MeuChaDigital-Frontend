import Card from "@/components/Card";
import Button from "@/components/Button";

export default function DangerZoneSection({ onDeleteList }: { onDeleteList: () => void }) {
  return (
    <section id="zona-de-perigo">
      <Card className="border border-red-500">
        <h2 className="text-xl font-semibold text-red-500 mb-4">Zona de Perigo</h2>
        <Card className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-text-primary">Deletar Lista</h3>
            <p className="text-sm text-text-secondary">
              Esta ação não pode ser desfeita. Todos os presentes, lista de convidados e convite digital serão perdidos.
            </p>
          </div>
          <Button variant="danger" onClick={onDeleteList}>
            Deletar Lista
          </Button>
        </Card>
      </Card>
    </section>
  );
}