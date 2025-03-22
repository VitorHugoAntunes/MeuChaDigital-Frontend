"use client";

import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/logo.png';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathName = usePathname();
  const currentUrl = pathName.split('?')[0];

  if (currentUrl === '/sign-in' || currentUrl === '/create-gift-list' || currentUrl.startsWith('/invitation')) {
    return null;
  }

  return (
    <footer className="bg-background text-text-primary border-t-2 border-t-gray-200 mt-8">
      <div className="container mx-auto px-4 py-4 lg:py-8">
        <section className="flex flex-col md:flex-row justify-between gap-4 lg:gap-8 mb-4 lg:mb-8">
          <div className="lg:space-y-4">
            <Link href="/" className="group hover:text-primary-dark transition-colors duration-300">
              <div className="inline-flex items-center space-x-2">
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
            <p className="text-text-secondary">
              Tornando seus momentos especiais inesquecíveis.
            </p>
          </div>

          <nav aria-label="Links úteis" className="space-y-2 lg:space-y-4">
            <h2 className="text-base lg:text-lg font-semibold text-text-primary">Links Úteis</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-text-secondary hover:text-primary-dark transition-colors duration-300">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-text-secondary hover:text-primary-dark transition-colors duration-300">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-text-secondary hover:text-primary-dark transition-colors duration-300">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </nav>

          <div className="space-y-2 lg:space-y-4">
            <h2 className="text-base lg:text-lg font-semibold text-text-primary">Contato</h2>
            <p className="text-text-secondary">
              Dúvidas ou sugestões? Entre em contato conosco:
            </p>
            <ul className="space-y-2">
              <li>
                <a href="mailto:suporte@meuchadigital.com" className="text-text-secondary hover:text-primary-dark transition-colors duration-300">
                  suporte@meuchadigital.com
                </a>
              </li>
              <li>
                <a href="tel:+5511999999999" className="text-text-secondary hover:text-primary-dark transition-colors duration-300">
                  (11) 99999-9999
                </a>
              </li>
            </ul>
          </div>
        </section>

        <section className="border-t border-t-gray-200 pt-4 lg:pt-8 text-center">
          <p className="text-text-secondary">
            © 2025 Meu Chá Digital. Todos os direitos reservados.
          </p>
        </section>
      </div>
    </footer>
  );
}