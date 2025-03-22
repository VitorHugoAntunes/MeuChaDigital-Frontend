"use client";

import NavLink from '@/components/NavLink';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from '@/components/Button';
import { Gift, Menu, X } from 'lucide-react';

interface InvitationHeaderProps {
  ref?: React.RefObject<HTMLHeadElement | null>;
  title: string | undefined;
}

export default function InvitationHeader({ ref, title }: InvitationHeaderProps) {
  const [subdomain, setSubdomain] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathName = usePathname();
  const currentUrl = pathName.split("?")[0];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      const parts = hostname.split(".");
      if (parts.length >= 2 && parts[1] === "localhost") {
        setSubdomain(parts[0]); // Extrai o subdomínio (ex: "teste-2")
      }
    }
  }, []);

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

  if (!currentUrl.startsWith("/invitation")) {
    return null;
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  if (title === undefined) {
    return (
      <header className="w-screen ml-[calc(-50vw+50%)] flex items-center justify-between py-6 px-8 bg-background text-text-primary border-b-2 border-b-gray-200 animate-pulse">
        <div className="h-8 w-48 bg-gray-300 rounded"></div>

        <nav className="flex space-x-6">
          <div className="h-6 w-32 bg-gray-300 rounded"></div>
          <div className="h-6 w-32 bg-gray-300 rounded"></div>
          <div className="h-6 w-32 bg-gray-300 rounded"></div>
          <div className="h-6 w-32 bg-gray-300 rounded"></div>
        </nav>
      </header>
    );
  }

  return (
    <>
      <header
        ref={ref}
        className="w-screen ml-[calc(-50vw+50%)] flex items-center justify-between py-6 px-8 bg-background text-text-primary border-b-2 border-b-gray-200"
      >
        <Link
          href={`http://${subdomain}.localhost:3000/invitation`}
          className="group hover:text-primary-dark transition-colors duration-300 w-fit inline-block"
        >
          <h2 className="text-2xl font-semibold text-primary-light group-hover:brightness-90 transition-all duration-300">
            {title}
          </h2>
        </Link>

        <nav className="hidden lg:flex space-x-6">
          <NavLink href={`http://${subdomain}.localhost:3000/invitation/#rsvp`}>Confirme sua presença</NavLink>
          <NavLink href={`http://${subdomain}.localhost:3000/invitation/#moments`}>Nossos momentos</NavLink>
          <NavLink href={`http://${subdomain}.localhost:3000/invitation/#location`}>Localização</NavLink>
          <NavLink href={`http://${subdomain}.localhost:3000/invitation/gifts`}>
            <Button borderStyle="rounded">
              <Gift size={20} />
              Lista de presentes
            </Button>
          </NavLink>
        </nav>

        <div className="lg:hidden flex justify-end">
          <button onClick={toggleMenu} className="text-text-primary">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-background z-50 lg:hidden flex flex-col overflow-y-hidden">
          <div className="border-b-2 border-b-gray-200 py-6 px-8 flex justify-between items-center">
            <Link
              href={`http://${subdomain}.localhost:3000/invitation`}
              className="group hover:text-primary-dark transition-colors duration-300 w-fit inline-block"
            >
              <h2 className="text-2xl font-semibold text-primary-light group-hover:brightness-90 transition-all duration-300">
                {title}
              </h2>
            </Link>

            <button onClick={toggleMenu} className="text-text-primary">
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 flex flex-col items-center w-full">
            <ul className="text-center w-full">
              <li className="flex w-full justify-center py-4 border-b-2 border-gray-200 hover:bg-gray-100 transition rounded-md">
                <NavLink href={`http://${subdomain}.localhost:3000/invitation/#rsvp`} onClick={closeMenu}>
                  Confirme sua presença
                </NavLink>
              </li>
              <li className="flex w-full justify-center py-4 border-b-2 border-gray-200 hover:bg-gray-100 transition rounded-md">
                <NavLink href={`http://${subdomain}.localhost:3000/invitation/#moments`} onClick={closeMenu}>
                  Nossos momentos
                </NavLink>
              </li>
              <li className="flex w-full justify-center py-4 border-b-2 border-gray-200 hover:bg-gray-100 transition rounded-md">
                <NavLink href={`http://${subdomain}.localhost:3000/invitation/#location`} onClick={closeMenu}>
                  Localização
                </NavLink>
              </li>
              <li className="flex w-full justify-center py-4 border-b-2 border-gray-200 hover:bg-gray-100 transition rounded-md">
                <NavLink href={`http://${subdomain}.localhost:3000/invitation/gifts`} onClick={closeMenu}>
                  <Button borderStyle="rounded">
                    <Gift size={20} />
                    Lista de presentes
                  </Button>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}