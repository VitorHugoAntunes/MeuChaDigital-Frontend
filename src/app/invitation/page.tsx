"use client";

import inviteImage from '@/assets/invite.png';
import Button from '@/components/Button';
import Card from '@/components/Card';
import InputField from '@/components/InputField';
import InputTextArea from '@/components/InputTextArea';
import NavLink from '@/components/NavLink';
import { motion } from 'framer-motion';
import { Calendar, Clock, Heart, MapPin, ArrowUp } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function InvitationPage() {
  const [showButton, setShowButton] = useState(false);
  const headerRef = useRef<HTMLHeadElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    if (headerRef.current) {
      setHeaderHeight(headerRef.current.clientHeight);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="flex flex-col w-full">
      <header ref={headerRef} className="flex items-center justify-between py-6 bg-background text-text-primary border-b-2 border-b-gray-200">
        <h2 className="text-2xl font-semibold text-primary-light">Ana & Vitor</h2>

        <nav className="flex space-x-6">
          <a href="#rsvp" className="hover:text-primary transition">Confirme sua presença</a>
          <NavLink href="/lists/gifts">Lista de presentes</NavLink>
          <a href="#moments" className="hover:text-primary transition">Nossos momentos</a>
          <a href="#location" className="hover:text-primary transition">Localização</a>
        </nav>
      </header>

      <main className="flex flex-col flex-1 w-full">
        <section
          className="w-screen relative left-1/2 right-1/2 -mx-[50vw] flex items-center justify-center bg-no-repeat bg-center bg-cover"
          style={
            {
              height: `calc(100vh - ${headerHeight}px)`,
              backgroundImage: `url(${inviteImage.src})`,
            }
          }
        >
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>

          <motion.article initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-screen-lg mx-auto px-8 text-center relative z-10">
            <h1 className="text-5xl text-white mb-6 drop-shadow-lg tracking-wide">Você está convidado!</h1>
            <p className="text-6xl font-extrabold text-white mt-2 drop-shadow-lg">Ana & Vitor</p>
            <time dateTime="2030-12-20" className="text-2xl text-white mt-4 block drop-shadow-lg italic">Segunda-feira, 20 de Outubro de 2030</time>
          </motion.article>
        </section>

        <section className="text-center py-16 px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">Marque no seu calendário</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-screen-lg mx-auto">
            <div className="flex items-center justify-center space-x-4">
              <Calendar size={32} className="text-primary" />
              <p className="text-xl text-gray-700 font-medium">20 de Outubro de 2030</p>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <Clock size={32} className="text-primary" />
              <p className="text-xl text-gray-700 font-medium">Às 15h00</p>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <MapPin size={32} className="text-primary" />
              <p className="text-xl text-gray-700 font-medium">Igreja de São Francisco</p>
            </div>
          </div>
        </section>

        <section id="rsvp" className="py-16 px-8 bg-gray-50">
          <h2 className="text-center text-4xl font-bold text-gray-900 mb-12">Confirme sua presença</h2>
          <Card className="max-w-screen-sm w-full mx-auto">
            <form>
              <InputField label="Nome" placeholder="Digite seu nome" />
              <InputField label="E-mail" placeholder="Digite seu e-mail" />
              <InputField label="Telefone" placeholder="Digite seu telefone" />
              <InputTextArea label="Observações" placeholder="Restrições alimentares, dúvidas, etc." />
              <div className="flex justify-between mt-8 gap-4">
                <Button variant='outlined' widthFull>Recusar educadamente</Button>
                <Button widthFull>Confirmar presença</Button>
              </div>
            </form>
          </Card>
        </section>

        <section id="moments" className="w-screen relative left-1/2 right-1/2 -mx-[50vw] flex flex-col items-center py-16 mt-8 bg-white">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Nossos momentos</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl px-4">
            <div className="md:col-span-2">
              <Image
                src={inviteImage.src}
                alt="Imagem"
                width={1600}
                height={600}
                className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
              />
            </div>

            <div className="flex justify-end">
              <Image
                src={inviteImage.src}
                alt="Imagem"
                width={800}
                height={400}
                className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
              />
            </div>

            <div className="flex justify-start">
              <Image
                src={inviteImage.src}
                alt="Imagem"
                width={800}
                height={400}
                className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
              />
            </div>

            <div className="md:col-span-2">
              <Image
                src={inviteImage.src}
                alt="Imagem"
                width={1600}
                height={600}
                className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </section>

        <section id="location" className="text-center py-16 px-8">
          <h3 className="text-4xl font-bold text-gray-900 mb-12">Localização</h3>

          <Card className="max-w-screen-md w-full mx-auto rounded-3xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.007294888034!2d-46.64662538498427!3d-23.56914868467948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5b0d0f2c1f3f%3A0x5e7e0f3b0a8d0f7d!2sIgreja%20de%20S%C3%A3o%20Francisco!5e0!3m2!1spt-BR!2sbr!4v1633865446488!5m2!1spt-BR!2sbr"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className='rounded-2xl'
            ></iframe>

            <div className="mt-8">
              <p className="text-xl text-gray-700 font-medium">Igreja de São Francisco</p>
              <p className="text-lg text-gray-700">Rua São Francisco, 123 - Centro, São Paulo - SP</p>
              <p className="text-lg text-gray-700">CEP: 12345-678</p>
            </div>
          </Card>
        </section>
      </main>

      <footer className="py-8 text-center w-screen relative left-1/2 right-1/2 -mx-[50vw] border-t-2 border-t-gray-200">
        <p className="text-sm">Faça parte deste momento especial!</p>
        <p className="text-sm mt-2">
          <Heart size={16} className="text-primary inline-block" /> Ana & Vitor <Heart size={16} className="text-primary inline-block" />
        </p>
      </footer>

      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-4 bg-primary text-white rounded-full shadow-lg hover:bg-primary-dark transition-all duration-300"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
}
