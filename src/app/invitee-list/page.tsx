import { ClipboardCopy, Trash, Edit, FileDown } from "lucide-react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import StatCard from "@/components/StatCard";
import Tag from "@/components/Tag";
import InputField from "@/components/InputField";
import InputSelect from "@/components/InputSelect";

const invitees = [
  { name: "João Silva", phone: "(11) 99999-1234", email: "teste@gmail.com", status: "Aceito", additionalInvitees: 2, notes: "" },
  { name: "Maria Souza", phone: "(21) 98888-5678", email: "teste@gmail.com", status: "Recusado", additionalInvitees: 0, notes: "Tenho alergia a camarão" },
  { name: "Carlos Lima", phone: "(31) 97777-4321", email: "teste@gmail.com", status: "Aceito", additionalInvitees: 1, notes: "Chegará mais tarde" },
  { name: "Ana Oliveira", phone: "(41) 96666-8765", email: "teste@gmail.com", status: "Aceito", additionalInvitees: 0, notes: "" },
];

export default function GuestListPage() {
  return (
    <main className="flex flex-col flex-1 w-full max-w-7xl mx-auto my-8 px-4">
      <h1 className="text-2xl font-semibold text-text-primary text-center md:text-left">Lista de Convidados</h1>
      <p className="text-md mt-2 text-text-secondary text-center md:text-left">
        Adicione e organize convidados para sua celebração
      </p>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        <StatCard title="Total de Convidados" value="10" color="blue" />
        <StatCard title="Confirmados" value="8" color="success" />
        <StatCard title="Recusados" value="2" color="danger" />
      </section>

      <Card className="flex flex-col w-full mt-8 p-6">
        <h2 className="text-lg font-semibold text-text-primary text-center md:text-left">
          Compartilhar link de convite
        </h2>

        <p className="text-text-secondary mt-2 text-center md:text-left">
          Compartilhe o link abaixo com seus convidados para que eles possam confirmar presença
        </p>

        <div className="flex flex-col md:flex-row items-center w-full mt-4 gap-2">
          <input
            type="text"
            className="flex-1 px-4 py-2 text-text-primary bg-gray-100 border border-gray-300 rounded-lg md:rounded-l-lg focus:outline-none w-full"
            readOnly
            value={`https://meu-evento.com.br/confirmar-presenca/123456`}
          />
          <Button>
            <ClipboardCopy size={20} />
            Copiar link
          </Button>
        </div>
      </Card>

      <Card className="w-full mt-8 p-6">
        <h2 className="text-lg font-semibold text-text-primary text-center sm:text-left">Lista de Convidados</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <div className="col-span-2">
            <InputField label="Pesquisar" placeholder="Buscar por nome, telefone ou e-mail" />
          </div>
          <InputSelect label="Status" options={["Todos", "Aceito", "Recusado"]} />
        </div>

        <div className="overflow-x-auto mt-4 rounded-md border border-gray-300">
          <table className="w-full min-w-[700px] rounded-md">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300">
                <th className="p-3 text-xs text-left text-text-secondary uppercase">Nome</th>
                <th className="p-3 text-xs text-left text-text-secondary uppercase">Telefone</th>
                <th className="p-3 text-xs text-left text-text-secondary uppercase">E-mail</th>
                <th className="p-3 text-xs text-left text-text-secondary uppercase">Status</th>
                <th className="p-3 text-xs text-left text-text-secondary uppercase">Convidados Adicionais</th>
                <th className="p-3 text-xs text-left text-text-secondary uppercase">Observações</th>
                <th className="p-3 text-xs text-left text-text-secondary uppercase">Ações</th>
              </tr>
            </thead>
            <tbody>
              {invitees.map((invitee, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-300 hover:bg-gray-50 transition ${index === invitees.length - 1 ? "border-b-0" : ""
                    }`}
                >
                  <td className="p-3 text-text-primary whitespace-nowrap">{invitee.name}</td>
                  <td className="p-3 text-text-secondary whitespace-nowrap">{invitee.phone}</td>
                  <td className="p-3 text-text-secondary whitespace-nowrap">{invitee.email}</td>
                  <td className="p-3 font-semibold">
                    <Tag
                      label={invitee.status}
                      color={
                        invitee.status === "Aceito"
                          ? "bg-success-extraLight text-success-extraDark"
                          : "bg-danger-extraLight text-danger-extraDark"
                      }
                    />
                  </td>
                  <td className="p-3 text text-text-secondary">{invitee.additionalInvitees}</td>
                  <td className="p-3 text-text-secondary max-w-[180px] whitespace-normal">
                    {invitee.notes || "-"}
                  </td>
                  <td className="p-3 flex justify-center gap-2">
                    <button className="text-danger hover:text-danger-dark transition">
                      <Trash size={18} />
                    </button>
                    <button className="text-warning hover:text-warning-dark transition">
                      <Edit size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-4">
          <Button>
            <FileDown size={20} />
            Exportar lista de convidados
          </Button>
        </div>
      </Card>
    </main>
  );
}