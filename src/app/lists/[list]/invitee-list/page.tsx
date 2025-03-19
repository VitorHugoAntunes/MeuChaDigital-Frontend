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

  const { data: allInvitees, isLoading: isInviteesLoading } = useGetAllInviteesByGiftListSlug(
    slug as string,
    currentPage,
    limit
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const { mutateAsync: deleteInvitee, isLoading: isDeleting } = useDeleteInvitee();

  async function handleDelete(id: string) {
    await deleteInvitee({ slug: slug as string, id });
  }

  return (
    <main className="flex flex-col flex-1 w-full max-w-7xl mx-auto my-8 px-4">
      <Header
        title="Lista de Convidados"
        description="Adicione e organize convidados para sua celebração"
      />

      {isFilteredInviteesLoading || isInviteesLoading ? (
        <div className="flex justify-center items-center p-6">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <StatCards
            totalInvitees={allInvitees?.totalWithoutPagination}
            acceptedInvitees={allInvitees?.totalAccepted}
            rejectedInvitees={allInvitees?.totalRejected}
          />
          <ShareLinkCard slug={slug as string} />
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
            isLoading={isFilteredInviteesLoading || isFilteredInviteesFetching}
          />
        </>
      )}

      <ToastContainer />
    </main>
  );
}