import StatCard from "@/components/StatCard";

interface Invitee {
  id: string;
  name: string;
  phone: string;
  email: string;
  additionalInvitees: number;
  observation: string;
  status: "ACCEPTED" | "REJECTED";
}

interface StatCardsProps {
  invitees: Invitee[];
}

export const StatCards = ({ invitees }: StatCardsProps) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
      <StatCard title="Total de Convidados" value={invitees.length.toString()} color="blue" />
      <StatCard
        title="Confirmados"
        value={invitees.filter((invitee) => invitee.status === "ACCEPTED").length.toString() || "0"}
        color="success"
      />
      <StatCard
        title="Recusados"
        value={invitees.filter((invitee) => invitee.status === "REJECTED").length.toString() || "0"}
        color="danger"
      />
    </section>
  );
};