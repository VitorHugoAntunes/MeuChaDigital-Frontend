"use client"
import { getGiftLists } from "@/api/giftLists";
import Button from "@/components/Button";
import ListCard from "@/components/ListCard";
import { Plus } from 'lucide-react';
import Link from "next/link";

import { useEffect, useState } from "react";

export default function ListsPage() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    getGiftLists().then(data => setLists(data));
  }, []);

  return (
    <main className="flex flex-col flex-1 w-screen my-8">
      <h1 className="text-2xl font-semibold text-text-primary">
        Minhas Listas de Presentes
      </h1>

      <p className="text-md mt-2 text-text-secondary">
        Gerencie suas listas de presentes de forma fácil e prática.
      </p>

      <div className="flex mt-8 justify-end">

        <Link href="/create-gift-list">
          <Button variant="default">
            Criar nova lista
            <Plus size={20} />
          </Button>
        </Link>
      </div>

      <section className="mt-8 pb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {lists.map((list) => (
          <ListCard
            key={list.id}
            title={list.name}
            date="10/10/2021"
            totalGifts={10}
            totalContributors={5}
            totalRaised={5000}
            totalGoal={10000}
          />
        ))}
      </section>
    </main>
  )
}