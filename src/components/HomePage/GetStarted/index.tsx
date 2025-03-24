import Button from "@/components/Button";
import Link from "next/link";

export default function GetStarted() {
  return (
    <section className="w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-primary-extraLight mt-16 py-8 md:py-16">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-text-primary">
          Pronto para começar a planejar o seu dia perfeito?
        </h2>

        <div className="flex justify-center mt-4 md:mt-8">
          <Link href="/sign-in">
            <Button>Crie sua conta agora</Button>
          </Link>
        </div>

        <p className="text-center mt-2 md:mt-4 text-text-secondary">
          Gratuito para começar. Não é necessário cartão de crédito.
        </p>
      </div>
    </section>
  );
}