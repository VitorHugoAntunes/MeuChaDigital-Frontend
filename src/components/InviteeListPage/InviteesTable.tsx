import { Trash, Edit } from "lucide-react";
import Tag from "@/components/Tag";
import InputField from "@/components/InputField";
import InputSelect from "@/components/InputSelect";
import Button from "@/components/Button";
import { FileDown } from "lucide-react";
import Card from "../Card";
import Modal from "@/components/Modal";
import { useState } from "react";

interface Invitee {
  id: string;
  name: string;
  phone: string;
  email: string;
  additionalInvitees: number;
  observation: string;
  status: "ACCEPTED" | "REJECTED";
}

interface InviteeTableProps {
  invitees: Invitee[];
  handleDelete: (id: string) => void;
  isDeleting: boolean;
}

export const InviteeTable = ({ invitees, handleDelete, isDeleting }: InviteeTableProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"editInvitee" | "deleteInvitee" | null>(null);
  const [selectedInviteeId, setSelectedInviteeId] = useState<string | null>(null);

  const handleOpenDeleteInviteeModal = (id: string) => {
    setSelectedInviteeId(id);
    setIsModalOpen(true);
    setModalType("deleteInvitee");
  };

  const handleOpenEditInviteeModal = (id: string) => {
    setSelectedInviteeId(id);
    setIsModalOpen(true);
    setModalType("editInvitee");
  }

  const handleConfirmDelete = async () => {
    if (selectedInviteeId) {
      await handleDelete(selectedInviteeId);
      setIsModalOpen(false);
    }
  };

  return (
    <Card className="w-full mt-8 p-6">
      <h2 className="text-lg font-semibold text-text-primary text-center sm:text-left">Lista de Convidados</h2>

      {invitees && invitees.length > 0 ? (
        <>
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
                  <th className="p-3 text-xs text-left text-text-secondary uppercase">Email</th>
                  <th className="p-3 text-xs text-left text-text-secondary uppercase">Status</th>
                  <th className="p-3 text-xs text-left text-text-secondary uppercase">Convidados Adicionais</th>
                  <th className="p-3 text-xs text-left text-text-secondary uppercase">Observações</th>
                  <th className="p-3 text-xs text-left text-text-secondary uppercase">Ações</th>
                </tr>
              </thead>
              <tbody>
                {invitees.map((invitee, index) => (
                  <tr
                    key={invitee.id}
                    className={`border-b border-gray-300 hover:bg-gray-50 transition ${index === invitees.length - 1 ? "border-b-0" : ""
                      }`}
                  >
                    <td className="p-3 text-text-primary whitespace-nowrap" title={invitee.name}>
                      {invitee.name}
                    </td>
                    <td className="p-3 text-text-secondary whitespace-nowrap" title={invitee.phone}>
                      {invitee.phone}
                    </td>
                    <td className="p-3 text-text-secondary whitespace-nowrap" title={invitee.email}>
                      {invitee.email}
                    </td>
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
                      <button className="text-warning hover:text-warning-dark transition">
                        <Edit size={18} onClick={() => handleOpenEditInviteeModal(invitee.id)} />
                      </button>
                      <button
                        className="text-danger hover:text-danger-dark transition"
                        onClick={() => handleOpenDeleteInviteeModal(invitee.id)}
                      >
                        <Trash size={18} />
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
        </>
      ) : (
        <div className="flex flex-col justify-center items-center p-6">
          <p className="text-text-secondary">Nenhum convidado adicionado ainda.</p>
          <p className="text-text-secondary">Compartilhe o link de convite para que seus convidados possam confirmar presença.</p>
        </div>
      )}

      {isModalOpen && modalType === "deleteInvitee" && (
        <Modal
          action="Excluir"
          actionTitle="Excluir convidado"
          actionDescription="Tem certeza que deseja excluir este convidado?"
          modalType="action"
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          isLoading={isDeleting}
          onSuccess={handleConfirmDelete}
        />
      )}

      {isModalOpen && modalType === "editInvitee" && (
        <Modal
          modalType="invitee"
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </Card>
  );
};