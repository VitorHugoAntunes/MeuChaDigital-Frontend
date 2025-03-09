"use client";

import { ClipboardCopy, Trash, Edit, FileDown } from "lucide-react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import StatCard from "@/components/StatCard";
import Tag from "@/components/Tag";
import InputField from "@/components/InputField";
import InputSelect from "@/components/InputSelect";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useGetAllInviteesByGiftListSlug } from "@/hooks/invitee";
import { useParams } from "next/navigation";

interface Invitee {
  id: string;
  name: string;
  phone: string;
  email: string;
  additionalInvitees: number;
  observation: string;
  status: "ACCEPTED" | "REJECTED";
}

export default function GuestListPage() {
  const { list: slug } = useParams();
  const { data: invitees, isLoading } = useGetAllInviteesByGiftListSlug(slug as string);

  const handleCopyLink = () => {
    const link = `http://${slug}.localhost:3000/invitation`;
    navigator.clipboard.writeText(link);
    toast.success("Link copiado para a área de transferência!");
  };

  return (
    <main className="flex flex-col flex-1 w-full max-w-7xl mx-auto my-8 px-4">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <h1 className="text-2xl font-semibold text-text-primary text-center md:text-left">Lista de Convidados</h1>
      <p className="text-md mt-2 text-text-secondary text-center md:text-left">
        Adicione e organize convidados para sua celebração
      </p>

      {isLoading ? (
        <div className="flex justify-center items-center p-6">
          <span className="text-text-secondary">Carregando...</span>
        </div>
      ) : (
        <>
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
            <StatCard title="Total de Convidados" value={invitees.length} color="blue" />
            <StatCard
              title="Confirmados"
              value={invitees.filter((invitee: Invitee) => invitee.status === "ACCEPTED").length.toString() || "0"}
              color="success"
            />
            <StatCard
              title="Recusados"
              value={invitees.filter((invitee: Invitee) => invitee.status === "REJECTED").length.toString() || "0"}
              color="danger"
            />
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
                value={`http://${slug}.localhost:3000/invitation`}
              />
              <Button onClick={handleCopyLink}>
                <ClipboardCopy size={20} />
                Copiar link
              </Button>
            </div>

            <Link
              href={`http://${slug}.localhost:3000/invitation`}
              className="w-fit mt-4 text-center md:text-left text-primary hover:text-primary-light underline hover:no-underline transition-colors duration-300"
            >
              Ver link de convite
            </Link>
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
              <table className="w-full rounded-md">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-300">
                    <th className="p-3 text-xs text-left text-text-secondary uppercase">Nome</th>
                    <th className="p-3 text-xs text-left text-text-secondary uppercase">Telefone</th>
                    {/* <th className="p-3 text-xs text-left text-text-secondary uppercase">E-mail</th> */}
                    <th className="p-3 text-xs text-left text-text-secondary uppercase">Status</th>
                    <th className="p-3 text-xs text-left text-text-secondary uppercase">Convidados Adicionais</th>
                    <th className="p-3 text-xs text-left text-text-secondary uppercase">Observações</th>
                    <th className="p-3 text-xs text-left text-text-secondary uppercase">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {invitees.map((invitee: Invitee, index) => (
                    <tr
                      key={index}
                      className={`border-b border-gray-300 hover:bg-gray-50 transition ${index === invitees.length - 1 ? "border-b-0" : ""
                        }`}
                    >
                      <td className="p-3 text-text-primary whitespace-nowrap" title={invitee.name}>
                        {invitee.name}
                      </td>
                      <td className="p-3 text-text-secondary whitespace-nowrap" title={invitee.phone}>
                        {invitee.phone}
                      </td>
                      {/* <td
                        className="p-3 text-text-secondary whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]"
                        title={invitee.email}
                      >
                        {invitee.email}
                      </td> */}
                      <td className="p-3 font-semibold">
                        <Tag
                          label={invitee.status === "ACCEPTED" ? "Aceito" : "Recusado"}
                          color={
                            invitee.status === "ACCEPTED"
                              ? "bg-success-extraLight text-success-extraDark"
                              : "bg-danger-extraLight text-danger-extraDark"
                          }
                        />
                      </td>
                      <td className="p-3 text text-text-secondary" title={invitee.additionalInvitees.toString()}>
                        {invitee.additionalInvitees}
                      </td>
                      <td
                        className="p-3 text-text-secondary max-w-[180px] whitespace-normal break-words"
                        title={invitee.observation || "-"}
                      >
                        {invitee.observation || "-"}
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
        </>
      )}
    </main>
  );
}