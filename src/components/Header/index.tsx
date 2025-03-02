"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png";
import NavLink from "@/components/NavLink";
import Button from "@/components/Button";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  const { isAuthenticated, user, isLoading } = useAuth();
  const pathName = usePathname();
  const currentUrl = pathName.split("?")[0];

  if (currentUrl === "/sign-in" || currentUrl === "/invitation") {
    return null;
  }

  function handleLogin() {
    window.location.href = "/sign-in";
  }

  if (isLoading && isAuthenticated) {
    return (
      <header className="bg-background text-text-primary border-b-2 border-b-gray-200 grid grid-cols-3 items-center py-6 px-8">
        <Link href="/" className="group hover:text-primary-dark transition-colors duration-300 w-fit inline-block">
          <div className="flex items-center space-x-2">
            <Image
              src={logo}
              alt="Meu Chá Digital"
              className="group-hover:brightness-90 transition-all duration-300"
            />
            <h1 className="text-2xl font-semibold text-primary-light group-hover:brightness-90 transition-all duration-300">
              Meu Chá Digital
            </h1>
          </div>
        </Link>

        <nav className="flex justify-center space-x-10 items-center">
          <div className="w-20 h-4 bg-gray-200 rounded-md animate-pulse"></div>
          <div className="w-20 h-4 bg-gray-200 rounded-md animate-pulse"></div>
          <div className="w-20 h-4 bg-gray-200 rounded-md animate-pulse"></div>
        </nav>

        <div className="flex space-x-6 items-center">
          <div className="w-24 h-4 bg-gray-200 rounded-md animate-pulse"></div>
          <div className="w-20 h-[42.3px] bg-gray-200 rounded-md animate-pulse"></div>
          <div className="w-20 h-[42.3px] bg-gray-200 rounded-md animate-pulse"></div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-background text-text-primary border-b-2 border-b-gray-200 grid grid-cols-3 items-center py-6 px-8">
      <Link href="/" className="group hover:text-primary-dark transition-colors duration-300 w-fit inline-block">
        <div className="flex items-center space-x-2">
          <Image
            src={logo}
            alt="Meu Chá Digital"
            className="group-hover:brightness-90 transition-all duration-300"
          />
          <h1 className="text-2xl font-semibold text-primary-light group-hover:brightness-90 transition-all duration-300">
            Meu Chá Digital
          </h1>
        </div>
      </Link>

      {isAuthenticated && user ? (
        <>
          <nav className="flex justify-center space-x-10 items-center">
            <ul className="flex space-x-4">
              <li className="display-block">
                <NavLink href="/">Como funciona?</NavLink>
              </li>
              <li className="display-block">
                <NavLink href="/">Ajuda</NavLink>
              </li>
              <li className="display-block">
                <NavLink href="/lists">Minhas listas de presentes</NavLink>
              </li>
              <li className="display-block">
                <NavLink href="/invitee-list">Convidar amigos</NavLink>
              </li>
            </ul>
          </nav>

          <div className="flex items-center space-x-4 justify-end">
            {user?.name ? (
              <span className="text-text-primary">Olá, {user.name}</span>
            ) : (
              <div className="w-24 h-4 bg-gray-200 rounded-md animate-pulse"></div>
            )}
            <Link href="/profile">
              <Button>Ver perfil</Button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <nav className="flex justify-center space-x-10 items-center">
            <ul className="flex space-x-6">
              <li>
                <NavLink href="/">Como funciona?</NavLink>
              </li>
              <li>
                <NavLink href="/">Ajuda</NavLink>
              </li>
            </ul>
          </nav>
          <div className="flex space-x-6 items-center justify-end">
            <Button variant="outlined" onClick={handleLogin}>
              Entrar
            </Button>
            <Button onClick={handleLogin}>Criar conta</Button>
          </div>
        </>
      )}
    </header>
  );
};