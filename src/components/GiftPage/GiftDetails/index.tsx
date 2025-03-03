"use client";

import Image from "next/image";
import Divider from "@/components/Divider";

interface GiftDetailsProps {
  photo?: { url: string };
  name: string;
  description: string;
}

export default function GiftDetails({ photo, name, description }: GiftDetailsProps) {
  return (
    <>
      {photo && (
        <figure className="mt-6 bg-gray-500 rounded-lg">
          <Image
            src={photo.url}
            alt={name}
            width={600}
            height={500}
            className="rounded-lg object-cover w-full h-full"
          />
        </figure>
      )}

      <Divider />

      <article>
        <h2 className="text-lg font-semibold text-text-primary">Descrição do Presente</h2>
        <p className="text-md mt-2 text-text-secondary leading-relaxed">{description}</p>
      </article>
    </>
  );
}