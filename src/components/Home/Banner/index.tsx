import Button from "../../Button";
import Image from "next/image";
import bannerImg from "@/assets/banner.jpg";

import { Gift, Mail, ListChecks } from 'lucide-react';

export default function Banner() {
  return (
    <section className="grid grid-cols-2 gap-16 my-16">
      <aside className="flex flex-col justify-center space-y-4 w-fit">
        <h1 className="text-4xl font-semibold">
          Planeje o Chá Perfeito do Jeito Que Sempre Sonhou!
        </h1>

        <p className="text-xl mt-4">
          Planeje, organize e celebre com facilidade. Crie memórias inesquecíveis para toda a vida.
        </p>

        <ul className="list-inside mt-4 space-y-2">
          <li className="text-base">
            <Gift size={24} className="inline mr-2 text-primary-light" />
            Crie uma lista de presentes
          </li>
          <li className="text-base">
            <Mail size={24} className="inline mr-2 text-primary-light" />
            Envie convites digitais
          </li>
          <li className="text-base">
            <ListChecks size={24} className="inline mr-2 text-primary-light" />
            Receba confirmações de presença
          </li>
        </ul>

        <Button>Comece a Planejar Agora</Button>
      </aside>

      <Image
        src={bannerImg}
        alt="Banner Meu Chá Digital"
        className="rounded-2xl"
      />
    </section>
  );
}
