"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDeleteInvitee, useGetAllInviteesByGiftListSlug, useGetAllInviteesByGiftListSlugWithFilters } from "@/hooks/invitee";
import { useParams } from "next/navigation";
import { Header } from "@/components/InviteeListPage/Header";
import { StatCards } from "@/components/InviteeListPage/StatsCards";
import { ShareLinkCard } from "@/components/InviteeListPage/ShareLinkCard";
import { InviteeTable } from "@/components/InviteeListPage/InviteesTable";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useState } from "react";
import exportToExcel from "@/utils/exportToExcel";
import Card from "@/components/Card";

export default function InviteeListPage() {
  const { list: slug } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Todos");
  const limit = 10;

  const { data: filteredInvitees, isLoading: isFilteredInviteesLoading, isFetching: isFilteredInviteesFetching } = useGetAllInviteesByGiftListSlugWithFilters(
    slug as string,
    currentPage,
    limit,
    search,
    status
  );

  const { data: invitees, isFetching: isInviteesExporting, refetch: fetchAllInvitees } = useGetAllInviteesByGiftListSlug(
    slug as string
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const { mutateAsync: deleteInvitee, isLoading: isDeleting } = useDeleteInvitee();

  async function handleDelete(id: string) {
    await deleteInvitee({ slug: slug as string, id });
  }

  async function handleExportToExcel() {
    try {
      const { data: allInviteesData, } = await fetchAllInvitees();

      exportToExcel(allInviteesData, "Lista de Convidados");
    } catch (error) {
      console.error("Erro ao buscar convidados para exportação:", error);
    }
  }

  return (
    <main className="flex flex-col flex-1 w-full max-w-7xl mx-auto my-8">
      <Header
        title="Lista de Convidados"
        description="Adicione e organize convidados para sua celebração"
      />

      {isFilteredInviteesLoading ? (
        <div className="flex justify-center items-center p-6">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <StatCards
            totalInvitees={filteredInvitees?.totalWithoutPagination}
            acceptedInvitees={filteredInvitees?.totalAccepted}
            rejectedInvitees={filteredInvitees?.totalRejected}
          />
          <ShareLinkCard slug={slug as string} />

          <Card className="text-amber-800" bgColor="!bg-amber-50 dark:!bg-amber-50">
            <p className="font-medium mb-2">✨ Dica importante:</p>
            <p>
              Quanto antes você compartilhar, mais tempo seus convidados terão para confirmar presença e você poderá se organizar melhor.
            </p>
          </Card>

          {invitees?.length > 0 ? (
            <InviteeTable
              slug={slug as string}
              invitees={filteredInvitees?.invitees || []}
              total={filteredInvitees?.total || 0}
              totalPages={filteredInvitees?.totalPages || 1}
              handleDelete={handleDelete}
              isDeleting={isDeleting}
              onPageChange={handlePageChange}
              currentPage={currentPage}
              search={search}
              onSearchChange={setSearch}
              status={status}
              onStatusChange={setStatus}
              setCurrentPage={setCurrentPage}
              exportToExcel={handleExportToExcel}
              isExporting={isInviteesExporting}
              isLoading={isFilteredInviteesLoading || isFilteredInviteesFetching}
            />
          ) : (
            <Card className="w-full">
              <h2 className="text-lg font-semibold text-text-primary text-left">Lista de Convidados</h2>

              <p className="text-text-secondary mt-4 text-left md:text-center">
                Você ainda não tem convidados confirmados.
              </p>
              <p className="text-text-secondary text-left md:text-center">
                Compartilhe o convite para começar a receber as respostas!
              </p>
            </Card>
          )}
        </div>
      )}

      <ToastContainer />
    </main>
  );
}