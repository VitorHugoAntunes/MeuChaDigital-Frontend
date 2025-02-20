"use client";

import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/logo.png';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathName = usePathname();
  const currentUrl = pathName.split('?')[0];

  // Não exibe o footer em páginas específicas
  if (currentUrl === '/sign-in' || currentUrl === '/create-gift-list' || currentUrl === '/invitation') {
    return null;
  }

  return (
    <footer className="bg-background text-text-primary border-t-2 border-t-gray-200 mt-8">
      <div className="container mx-auto px-4 py-8">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-4">
            <Link href="/" className="group hover:text-primary-dark transition-colors duration-300">
              <div className="inline-flex items-center space-x-2">
                <Image
                  src={logo}
                  alt="Meu Chá Digital"
                  className="group-hover:brightness-90 transition-all duration-300"
                  width={40}
                  height={40}
                />
                <h1 className="text-2xl font-semibold text-primary-light group-hover:brightness-90 transition-all duration-300">
                  Meu Chá Digital
                </h1>
              </div>
            </Link>
            <p className="text-text-secondary">
              Tornando seus momentos especiais inesquecíveis.
            </p>
          </div>

          <nav aria-label="Links úteis" className="space-y-4">
            <h2 className="text-lg font-semibold text-text-primary">Links Úteis</h2>
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

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-text-primary">Contato</h2>
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

        <section className="border-t border-t-gray-200 pt-6 text-center">
          <p className="text-text-secondary">
            © 2025 Meu Chá Digital. Todos os direitos reservados.
          </p>
        </section>
      </div>
    </footer>
  );
}