"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "@/assets/logo.png";
import NavLink from "@/components/NavLink";
import Button from "@/components/Button";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const { isAuthenticated, user, isLoading } = useAuth();
  const pathName = usePathname();
  const currentUrl = pathName?.split("?")[0] || "";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (isMenuOpen) {
      html.classList.add("overflow-y-hidden");
      body.classList.add("overflow-y-hidden");
    } else {
      html.classList.remove("overflow-y-hidden");
      body.classList.remove("overflow-y-hidden");
    }

    return () => {
      html.classList.remove("overflow-y-hidden");
      body.classList.remove("overflow-y-hidden");
    };
  }, [isMenuOpen]);

  if (currentUrl === "/sign-in" || currentUrl.startsWith("/invitation")) {
    return null;
  }

  function handleLogin() {
    router.push("/sign-in");
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  if (isLoading) {
    return (
      <header className="bg-background text-text-primary border-b-2 border-b-gray-200 py-6 px-4 md:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse lg:h-8 lg:w-8"></div>
          <div className="h-6 w-32 bg-gray-200 rounded-md animate-pulse lg:w-40"></div>
        </div>

        <nav className="hidden lg:flex justify-center space-x-8 items-center">
          <div className="flex space-x-8">
            <div className="h-6 w-16 bg-gray-200 rounded-md animate-pulse"></div>
            <div className="h-6 w-40 bg-gray-200 rounded-md animate-pulse"></div>
          </div>
        </nav>

        <div className="hidden lg:flex space-x-4 items-center justify-end">
          <div className="h-6 w-24 bg-gray-200 rounded-md animate-pulse"></div>
          <div className="h-10 w-24 bg-gray-200 rounded-md animate-pulse"></div>
        </div>

        <div className="lg:hidden flex justify-end">
          <div className="h-6 w-6 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="bg-background text-text-primary border-b-2 border-b-gray-200 py-6 px-4 md:px-6 lg:px-8 flex items-center">
        <div className="flex-1 flex justify-start">
          <Link href="/" className="group hover:text-primary-dark transition-colors duration-300 w-fit inline-block">
            <div className="flex items-center space-x-2">
              <Image
                src={logo}
                alt="Meu Chá Digital"
                className="h-6 w-6 transition-all duration-300 group-hover:brightness-90 lg:h-8 lg:w-8"
              />
              <h1 className="text-base font-semibold text-primary-light transition-all duration-300 group-hover:brightness-90 lg:text-2xl">
                Meu Chá Digital
              </h1>
            </div>
          </Link>
        </div>

        <nav className="hidden lg:flex flex-1 justify-center items-center">
          {isAuthenticated && user ? (
            <ul className="flex space-x-8">
              <li>
                <NavLink href="/lists">Minhas listas de presentes</NavLink>
              </li>
              <li>
                <NavLink href="/help">Ajuda</NavLink>
              </li>
            </ul>
          ) : (
            <ul className="flex space-x-8">
              <li>
                <NavLink href="/help">Ajuda</NavLink>
              </li>
            </ul>
          )}
        </nav>

        <div className="flex-1 flex justify-end items-center space-x-4">
          {isAuthenticated && user ? (
            <>
              {user?.name && (
                <span className="hidden lg:inline text-text-primary">Olá, {user.name}</span>
              )}
              <Link className="hidden lg:inline" href="/profile">
                <Button>Ver perfil</Button>
              </Link>
            </>
          ) : (
            <div className="hidden lg:flex space-x-4">
              <Button variant="outlined" onClick={handleLogin}>
                Entrar
              </Button>
              <Button onClick={handleLogin}>Criar conta</Button>
            </div>
          )}

          <div className="lg:hidden flex justify-center items-center">
            <button onClick={toggleMenu} className="text-text-primary">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-background z-50 lg:hidden flex flex-col overflow-y-hidden">
          <div className="border-b-2 border-b-gray-200 py-6 px-4 md:px-6 lg:px-8 flex justify-between items-center">
            <Link href="/" className="group hover:text-primary-dark transition-colors duration-300 w-fit inline-block">
              <div className="flex items-center space-x-2">
                <Image
                  src={logo}
                  alt="Meu Chá Digital"
                  className="h-6 w-6 transition-all duration-300 group-hover:brightness-90 lg:h-8 lg:w-8"
                />
                <h1 className="text-base font-semibold text-primary-light transition-all duration-300 group-hover:brightness-90 lg:text-2xl">
                  Meu Chá Digital
                </h1>
              </div>
            </Link>

            <button onClick={toggleMenu} className="text-text-primary">
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 flex flex-col items-center w-full">
            <ul className="text-center w-full">
              {isAuthenticated && user && (
                <li className="flex w-full justify-center py-4 border-b-2 border-gray-200 hover:bg-gray-100 transition rounded-md">
                  <NavLink href="/lists" onClick={closeMenu}>
                    Minhas listas de presentes
                  </NavLink>
                </li>
              )}
              <li className="flex w-full justify-center py-4 border-b-2 border-gray-200 hover:bg-gray-100 transition rounded-md">
                <NavLink href="/help" onClick={closeMenu}>
                  Ajuda
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="py-4 px-4 md:px-6 lg:px-8 border-t-2 border-t-gray-200">
            {isAuthenticated && user ? (
              <>
                {user?.name && (
                  <span className="text-text-primary block mb-4">Olá, {user.name}</span>
                )}
                <Link href="/profile">
                  <Button widthFull onClick={closeMenu}>
                    Ver perfil
                  </Button>
                </Link>
              </>
            ) : (
              <div className="flex flex-col gap-4">
                <Button variant="outlined" onClick={handleLogin} widthFull>
                  Entrar
                </Button>
                <Button onClick={handleLogin} widthFull>
                  Criar conta
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}