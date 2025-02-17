import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/logo.png';

export default function Footer() {
  return (
    <footer className="flex flex-col bg-background text-text-primary mt-8">
      <section className='py-6 border-b-2 border-b-gray-200'>
        <Link href="/" className="group hover:text-primary-dark transition-colors duration-300">
          <div className="inline-flex items-center space-x-2">
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

        <p className="text-text-secondary mt-4">
          Tornando seus momentos especiais inesquecíveis.
        </p>
      </section>

      <section className="flex py-6 justify-center">
        <p className="text-text-secondary">
          © 2025 Meu Chá Digital. Todos os direitos reservados.
        </p>
      </section>
    </footer>
  )
}