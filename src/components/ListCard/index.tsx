"use client";

import { useState } from "react";
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
  const [isLoading, setIsLoading] = useState(true);

  return (
    <article className="bg-white rounded-lg shadow-md flex flex-col flex-1 w-full h-full hover:shadow-lg">
      <figure className="w-full h-32 lg:h-48 relative rounded-t-lg overflow-hidden bg-gray-300">
        {isLoading && <div className="w-full h-32 lg:h-48 bg-gray-300 animate-pulse" />}
        <Image
          src={photo || "/images/banner-placeholder.png"}
          alt={`Imagem da lista ${title}`}
          layout="fill"
          objectFit="cover"
          loading="lazy"
          onLoad={() => (false)}
          onError={() => setIsLoading(false)}
        />
      </figure>

      <section className="flex flex-col gap-4 lg:gap-6 p-4 lg:p-6 flex-1">
        <header>
          <h2 className="text-base lg:text-lg font-semibold text-text-primary line-clamp-2">{title}</h2>
        </header>

        <ListCardInfo date={date} totalGifts={totalGifts} totalContributors={totalContributors} />

        <footer className="mt-auto space-y-4">
          <ProgressBar initialValue={totalRaised} goalValue={totalGoal} />

          <Button variant="default" widthFull>
            Ver detalhes
          </Button>
        </footer>
      </section>
    </article>
  );
}