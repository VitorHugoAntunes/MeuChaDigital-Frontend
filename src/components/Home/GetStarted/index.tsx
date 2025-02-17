import Button from "@/components/Button";

export default function GetStarted() {
  return (
    <div>
      <section className="w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-primary-extraLight mt-16 py-16">
        <div className="max-w-screen-xl mx-auto px-8">
          <h2 className="text-3xl font-semibold text-center text-text-primary">
            Pronto para começar a planejar o seu dia perfeito?
          </h2>

          <div className="flex justify-center mt-8">
            <Button>Crie sua conta agora</Button>
          </div>

          <p className="text-center mt-4 text-text-secondary">
            Gratuito para começar. Não é necessário cartão de crédito.
          </p>
        </div>
      </section>
    </div>
  );
}