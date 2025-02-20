"use client"; // Adicione esta linha para marcar o componente como Client Component

import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/logo.png';

import NavLink from '@/components/NavLink';
import Button from '@/components/Button';
import { usePathname } from 'next/navigation'; // Use next/navigation em vez de next/router

export default function Header() {
  const pathName = usePathname();
  const currentUrl = pathName.split('?')[0];

  if (currentUrl === '/sign-in' || currentUrl === '/invitation') {
    return null;
  }

  return (
    <header className="flex items-center justify-between py-6 px-8 bg-background text-text-primary border-b-2 border-b-gray-200">
      <Link href="/" className="group hover:text-primary-dark transition-colors duration-300">
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

      <nav>
        <ul className="flex space-x-6">
          <li>
            <NavLink href="/">Como funciona?</NavLink>
          </li>
          <li>
            <NavLink href="/">Contato</NavLink>
          </li>
        </ul>
      </nav>

      <div className="flex space-x-6">
        <Button variant="outlined">Entrar</Button>
        <Link href="/sign-in">
          <Button>Criar conta</Button>
        </Link>
      </div>

    </header>
  );
}