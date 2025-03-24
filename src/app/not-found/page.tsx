import Button from "@/components/Button";
import NavLink from "@/components/NavLink";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col flex-1 w-full max-w-7xl mx-auto my-8 items-center justify-center text-center">
      <div className="text-6xl lg:text-8xl mb-6 font-bold text-primary-extraLight">404</div>

      <h1 className="text-3xl lg:text-5xl font-bold text-primary-light mb-4">Página não encontrada</h1>

      <p className="text-md text-text-secondary mb-8 max-w-screen-sm">
        A página que você está procurando pode ter sido removida ou está temporariamente indisponível.
      </p>

      <NavLink href="/">
        <Button aria-label="Voltar para a página inicial">
          Voltar para a página inicial
        </Button>
      </NavLink>

      <p className="text-md text-gray-400 mt-8">
        Se você acha que isso é um erro,{" "}
        <Link href="/contato" className={`transition-colors duration-300 text-primary-light hover:text-primary-dark`}>
          entre em contato com o suporte.
        </Link>
      </p>
    </main>
  );
}
