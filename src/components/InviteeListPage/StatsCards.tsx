import StatCard from "@/components/StatCard";
interface StatCardsProps {
  totalInvitees: number;
  acceptedInvitees: number;
  rejectedInvitees: number;
}

export const StatCards = ({ totalInvitees, acceptedInvitees, rejectedInvitees }: StatCardsProps) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      <StatCard title="Total de Convidados" value={totalInvitees.toString()} color="blue" />
      <StatCard
        title="Confirmados"
        value={acceptedInvitees.toString()}
        color="success"
      />
      <StatCard
        title="Recusados"
        value={rejectedInvitees.toString()}
        color="danger"
      />
    </section>
  );
};