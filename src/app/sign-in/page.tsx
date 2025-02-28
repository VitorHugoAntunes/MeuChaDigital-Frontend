"use client"
import Button from '@/components/Button';
import { useEffect } from 'react';
import Image from 'next/image';
import hero from '@/assets/hero.png';
import googleIcon from '@/assets/google-icon.svg';
import { login } from '@/api/auth';

export default function SignInPage() {
  useEffect(() => {
    document.body.classList.add('bg-gradient-to-b', 'from-[#FDF2F8]', 'to-white');

    return () => {
      document.body.classList.remove('bg-gradient-to-b', 'from-[#FDF2F8]', 'to-white');
    };
  }, []);


  return (
    <main className="grid grid-cols-1 md:grid-cols-3 w-screen relative left-1/2 right-1/2 -mx-[50vw]">
      <aside className="hidden md:flex flex-col items-center justify-center border-r-2 border-r-gray-200 col-span-2">
        <Image src={hero} alt="Banner" className="w-full max-w-md" />

        <h1 className="text-2xl font-semibold text-text-primary text-center mt-4 w-3/4">
          Simplifique a organização do seu chá
        </h1>

        <p className="text-md mt-2 text-text-secondary text-center w-3/4">
          O Meu Chá Digital oferece soluções práticas para planejar, gerenciar e compartilhar seu evento de forma prática e moderna.
        </p>
      </aside>

      <section className="flex flex-col items-center justify-center space-y-8 px-8 col-span-1 bg-background">
        <h1 className="text-2xl font-semibold text-text-primary text-center">
          Bem vindo! 👋
        </h1>
        <p className="text-md mt-4 text-text-secondary text-center">
          Para continuar, entre com sua conta Google
        </p>

        <form>
          <Button variant="google" onClick={login}>
            <Image src={googleIcon} alt="Google" width={20} height={20} />
            Continuar com o Google
          </Button>
        </form>
      </section>
    </main>
  );
}