"use client";

import { useEffect, useState } from "react";
import { Trash, Edit, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import Tag from "@/components/Tag";
import InputField from "@/components/InputField";
import InputSelect from "@/components/InputSelect";
import Button from "@/components/Button";
import { FileDown } from "lucide-react";
import Card from "../Card";
import Modal from "@/components/Modal";
import { UpdateInviteeFormData } from "@/schemas/createInviteeSchema";
import { formatPhone } from "@/utils/formatString";
import { Pagination } from "@/components/Pagination";

interface Invitee {
  id: string;
  giftListId: string;
  name: string;
  phone: string;
  email: string;
  additionalInvitees: number;
  observation: string;
  status: "ACCEPTED" | "REJECTED";
}

interface InviteeTableProps {
  slug: string;
  invitees: Invitee[];
  total: number;
  totalPages: number;
  handleDelete: (id: string) => void;
  isDeleting: boolean;
  onPageChange: (page: number) => void;
  currentPage: number;
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  setCurrentPage: (page: number) => void;
  exportToExcel: () => void;
  isExporting: boolean;
  isLoading: boolean;
}

interface FilterFormData {
  search: string;
  status: string;
}

export const InviteeTable = ({
  slug,
  invitees,
  totalPages,
  handleDelete,
  isDeleting,
  onPageChange,
  currentPage,
  search,
  onSearchChange,
  status,
  onStatusChange,
  setCurrentPage,
  exportToExcel,
  isExporting,
  isLoading,
}: InviteeTableProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"editInvitee" | "deleteInvitee" | null>(null);
  const [selectedInviteeId, setSelectedInviteeId] = useState<string | null>(null);
  const [initialValues, setInitialValues] = useState<UpdateInviteeFormData | undefined>(undefined);

  const { register, watch, setValue } = useForm<FilterFormData>({
    defaultValues: {
      search,
      status,
    },
  });

  const filters = watch();

  useEffect(() => {
    onSearchChange(filters.search);
    setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.search, onSearchChange]);

  useEffect(() => {
    onStatusChange(filters.status);
    setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.status, onStatusChange]);

  useEffect(() => {
    setValue("search", search);
  }, [search, setValue]);

  useEffect(() => {
    setValue("status", status);
  }, [status, setValue]);

  const filteredInvitees = invitees.filter((invitee) => {
    const matchesSearch =
      invitee.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      invitee.phone.includes(filters.search) ||
      invitee.email.toLowerCase().includes(filters.search.toLowerCase());

    const matchesStatus =
      filters.status === "Todos" ||
      filters.status === "" ||
      (filters.status === "Aceito" && invitee.status === "ACCEPTED") ||
      (filters.status === "Recusado" && invitee.status === "REJECTED");

    return matchesSearch && matchesStatus;
  });

  const handleOpenDeleteInviteeModal = (id: string) => {
    setSelectedInviteeId(id);
    setIsModalOpen(true);
    setModalType("deleteInvitee");
  };

  const handleOpenEditInviteeModal = (id: string) => {
    setSelectedInviteeId(id);

    const invitee = invitees.find((invitee) => invitee.id === id);

    setInitialValues({
      id: invitee?.id || "",
      name: invitee?.name || "",
      phone: invitee?.phone || "",
      email: invitee?.email || "",
      additionalInvitees: invitee?.additionalInvitees || 0,
      observation: invitee?.observation || "",
      giftListId: invitee?.giftListId || "",
      status: invitee?.status || "ACCEPTED",
    });

    setIsModalOpen(true);
    setModalType("editInvitee");
  };

  const handleConfirmDelete = async () => {
    if (selectedInviteeId) {
      await handleDelete(selectedInviteeId);
      setIsModalOpen(false);
    }
  };

  return (
    <Card className="w-full mt-8">
      <h2 className="text-lg font-semibold text-text-primary text-center sm:text-left">Lista de Convidados</h2>

      <div className="flex flex-col sm:flex-row mt-4 gap-4">
        <div className="w-full sm:w-2/3">
          <InputField
            label="Pesquisar"
            placeholder="Buscar por nome, telefone ou e-mail"
            inputValue={filters.search}
            register={register("search")}
          />
        </div>
        <div className="w-full sm:w-1/3">
          <InputSelect
            label="Status"
            options={["Todos", "Aceito", "Recusado"]}
            register={register("status")}
          />
        </div>
      </div>

      <div className="w-full md:w-fit mt-6">
        <Button
          onClick={exportToExcel}
          loading={isExporting}
          disabled={isExporting}
          widthFull
        >
          <FileDown size={20} />
          Exportar para Excel
        </Button>
      </div>

      <div className="overflow-x-auto mt-4 rounded-md border border-gray-300">
        {isLoading ? (
          <div className="flex justify-center items-center p-6">
            <Loader2 size={40} className="animate-spin text-primary-light" />
          </div>
        ) : filteredInvitees.length === 0 ? (
          <div className="flex justify-center items-center p-6">
            <p className="text-text-secondary">Nenhum convidado encontrado com os filtros aplicados.</p>
          </div>
        ) : (
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
              {filteredInvitees.map((invitee, index) => (
                <tr
                  key={invitee.id}
                  className={`border-b border-gray-300 hover:bg-gray-50 transition ${index === filteredInvitees.length - 1 ? "border-b-0" : ""
                    }`}
                >
                  <td className="p-3 text-text-primary whitespace-nowrap" title={invitee.name}>
                    {invitee.name}
                  </td>
                  <td className="p-3 text-text-secondary whitespace-nowrap" title={formatPhone(invitee.phone)}>
                    {formatPhone(invitee.phone)}
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
        )}
      </div>

      <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <p className="text-md text-text-secondary">
          Resultados: <span className="font-bold">{filteredInvitees.length}</span>
        </p>
        <div className="flex justify-center w-full md:w-auto">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
        </div>
      </div>

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
          slug={slug}
          initialValues={initialValues}
        />
      )}
    </Card>
  );
};