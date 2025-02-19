"use client";

import Image from "next/image";
import Button from "../Button";
import ProgressBar from "../ProgressBar";
import ListCardInfo from "./ListCardInfo";

interface ListCardProps {
  photo?: string;
  title: string;
  date: string;
  totalGifts: number;
  totalContributors: number;
  totalRaised: number;
  totalGoal: number;
}

export default function ListCard({ photo, title, date, totalGifts, totalContributors, totalRaised, totalGoal }: ListCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md flex flex-col flex-1 w-full">
      {/* Imagem do Banner */}
      <figure className="w-full h-48 relative rounded-t-lg overflow-hidden bg-gray-300">
        <Image
          src={photo || "/list-placeholder.jpg"}
          alt={`Imagem da lista ${title}`}
          layout="fill"
          objectFit="cover"
        />
      </figure>

      {/* Conteúdo */}
      <section className="flex flex-col gap-6 p-6">
        <header>
          <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
        </header>

        <ListCardInfo date={date} totalGifts={totalGifts} totalContributors={totalContributors} />

        <ProgressBar initialValue={totalRaised} goalValue={totalGoal} />

        <footer>
          <Button variant="default" widthFull>
            Ver detalhes
          </Button>
        </footer>
      </section>
    </article>
  );
}
