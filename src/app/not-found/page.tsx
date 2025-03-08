import NavLink from "@/components/NavLink";

export default function NotFound() {
  return (
    <main className="flex flex-col flex-1 w-full max-w-7xl mx-auto my-8 px-4 items-center justify-center">

      <div className="text-8xl mb-6">😕</div>

      <h1 className="text-5xl font-bold text-primary-light mb-4">Página não encontrada</h1>

      <p className="text-xl text-text-secondary mb-8">
        A página que você está procurando não foi encontrada.
      </p>
      {/* Botão de Voltar */}
      <NavLink
        href="/"
      >
        Voltar para a página inicial
      </NavLink>
    </main>
  );
}