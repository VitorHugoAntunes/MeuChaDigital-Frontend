"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDeleteInvitee, useGetAllInviteesByGiftListSlug } from "@/hooks/invitee";
import { useParams } from "next/navigation";
import { Header } from "@/components/InviteeListPage/Header";
import { StatCards } from "@/components/InviteeListPage/StatsCards";
import { ShareLinkCard } from "@/components/InviteeListPage/ShareLinkCard";
import { InviteeTable } from "@/components/InviteeListPage/InviteesTable";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function InviteeListPage() {
  const { list: slug } = useParams();
  const { data: invitees, isLoading } = useGetAllInviteesByGiftListSlug(slug as string);
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

      {isLoading ? (
        <div className="flex justify-center items-center p-6">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <StatCards invitees={invitees} />
          <ShareLinkCard slug={slug as string} />
          <InviteeTable invitees={invitees} handleDelete={handleDelete} isDeleting={isDeleting} />
        </>
      )}

      <ToastContainer />
    </main>
  );
}