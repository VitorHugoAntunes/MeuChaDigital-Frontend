import Button from "../../Button";
import Image from "next/image";
import bannerImg from "@/assets/banner.jpg";
import { Gift, Mail, ListChecks } from "lucide-react";
import Link from "next/link";

export default function Banner() {
  return (
    <section className="relative w-full lg:w-auto lg:mx-0">
      <div className="md:hidden absolute inset-0 w-screen left-1/2 right-1/2 -mx-[50vw]">
        <div className="absolute inset-0 z-0">
          <Image
            src={bannerImg}
            alt="Banner Meu Chá Digital"
            layout="fill"
            objectFit="cover"
            className="opacity-50"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 py-8 max-w-screen-2xl mx-auto">
        <aside className="flex flex-col justify-center space-y-4 w-full md:text-inherit rounded-2xl md:p-0">
          <h1 className="text-2xl lg:text-4xl font-semibold text-center md:text-left text-[#f0f0f0] md:text-text-primary">
            Planeje o Chá Perfeito do Jeito Que Sempre Sonhou!
          </h1>

          <p className="text-sm sm:text-base lg:text-xl mt-2 sm:mt-4 text-center md:text-left text-[#f0f0f0] md:text-text-primary">
            Planeje, organize e celebre com facilidade. Crie memórias inesquecíveis para toda a vida.
          </p>

          <div className="md:hidden flex flex-col items-center w-full">

            <div className="flex justify-center mt-4 w-full ">
              <Link href="/sign-in">
                <Button widthFull>Comece a Planejar Agora</Button>
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            <ul className="list-inside mt-4 space-y-2">
              <li className="text-base text-text-secondary">
                <Gift size={24} className="inline mr-2 text-primary-light" />
                Crie uma lista de presentes
              </li>
              <li className="text-base text-text-secondary">
                <Mail size={24} className="inline mr-2 text-primary-light" />
                Envie convites digitais
              </li>
              <li className="text-base text-text-secondary">
                <ListChecks size={24} className="inline mr-2 text-primary-light" />
                Receba confirmações de presença
              </li>
            </ul>
            <div className="flex mt-8">
              <Link href="/sign-in">
                <Button>Comece a Planejar Agora</Button>
              </Link>
            </div>
          </div>
        </aside>

        <div className="hidden md:block lg:hidden w-full">
          <Image
            src={bannerImg}
            alt="Banner Meu Chá Digital"
            className="rounded-2xl"
          />
        </div>

        <div className="hidden lg:flex justify-center">
          <Image
            src={bannerImg}
            alt="Banner Meu Chá Digital"
            className="rounded-2xl w-full max-w-md lg:max-w-lg xl:max-w-xl"
          />
        </div>
      </div>
    </section>
  );
}
