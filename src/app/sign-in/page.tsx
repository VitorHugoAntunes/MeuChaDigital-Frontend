"use client"
import Button from '@/components/Button';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import logo from '@/assets/logo-64x64.png';
import googleIcon from '@/assets/google-icon.svg';
import { login } from '@/api/auth';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useTheme } from '@/contexts/ThemeContext';
import { Heart, PartyPopper, Gift, Sparkles, Flower2, Cake } from 'lucide-react';
import Card from '@/components/Card';
import Link from 'next/link';
import { createRoot } from 'react-dom/client';

const ICON_TYPES = [Heart, PartyPopper, Gift, Sparkles, Flower2, Cake];
const DESKTOP_ICON_COUNT = 15;
const MOBILE_ICON_COUNT = 8;

export default function SignInPage() {
  const { theme } = useTheme();
  const animationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");

    if (isDarkMode) {
      document.body.classList.remove("bg-gradient-to-b", "from-[#FFFFFF]", "to-[#FFF5F7]");
    } else {
      document.body.classList.add("bg-gradient-to-b", "from-[#FFFFFF]", "to-[#FFF5F7]");
    }

    return () => {
      document.body.classList.remove("bg-gradient-to-b", "from-[#FFFFFF]", "to-[#FFF5F7]", "from-[#111827]", "to-[#1f2937]");
    };
  }, [theme]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const animateIcons = () => {
      const container = animationRef.current;
      if (!container) return;

      const isMobile = window.innerWidth < 640;
      const iconCount = isMobile ? MOBILE_ICON_COUNT : DESKTOP_ICON_COUNT;

      container.innerHTML = '';

      for (let i = 0; i < iconCount; i++) {
        const Icon = ICON_TYPES[Math.floor(Math.random() * ICON_TYPES.length)];
        const iconElement = document.createElement('div');
        container.appendChild(iconElement);

        const leftPos = Math.random() * 90 + 5;
        const size = isMobile
          ? Math.floor(Math.random() * 8) + 10  // Tamanho menor para mobile
          : Math.floor(Math.random() * 12) + 14;
        const rotation = Math.floor(Math.random() * 360);
        const delay = Math.random() * 10;
        const duration = Math.random() * 10 + 10;
        const startY = Math.random() * -100 - 50;
        const opacity = Math.random() * 0.5 + 0.3;

        const root = createRoot(iconElement);
        root.render(
          <div
            className="absolute text-primary-extraDark dark:text-primary-dark"
            style={{
              left: `${leftPos}%`,
              transform: `rotate(${rotation}deg)`,
              width: `${size}px`,
              height: `${size}px`,
              animation: `falling ${duration}s linear ${delay}s infinite`,
              top: `${startY}px`,
              opacity: opacity,
            }}
          >
            <Icon size={size} />
          </div>
        );
      }
    };

    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      @keyframes falling {
        0% {
          transform: translateY(0) rotate(0deg);
        }
        50% {
          transform: translateY(${window.innerHeight / 2}px) rotate(${180}deg);
        }
        100% {
          transform: translateY(${window.innerHeight + 100}px) rotate(${360}deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(styleElement);

    animateIcons();

    const handleResize = () => {
      animateIcons();

      // Atualiza a animação quando a janela é redimensionada
      if (styleElement.parentNode === document.head) {
        document.head.removeChild(styleElement);
      }
      const newStyleElement = document.createElement('style');
      newStyleElement.innerHTML = `
        @keyframes falling {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(${window.innerHeight / 2}px) rotate(${180}deg); }
          100% { transform: translateY(${window.innerHeight + 100}px) rotate(${360}deg); opacity: 0; }
        }
      `;
      document.head.appendChild(newStyleElement);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (styleElement.parentNode === document.head) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);

  return (
    <main className="flex w-full flex-col items-center justify-center min-h-screen overflow-hidden">
      <div ref={animationRef} className="fixed inset-0 pointer-events-none z-10 overflow-hidden" />
      <Card className={`
        rounded-xl p-6 sm:p-8 w-full max-w-md mx-4 sm:max-w-3xl
        transition-all duration-300
        bg-white 
        border-none
        shadow-[0_4px_24px_rgba(0,0,0,0.05)]
        dark:shadow-none 
        dark:bg-transparent 
        dark:border-none 
        dark:backdrop-blur-[2px]
        relative z-20
      `}>
        <div className="flex w-full flex-col items-center">
          <div className="relative flex flex-col items-center justify-center p-4 aspect-square w-48 sm:w-64">
            <div className="absolute inset-12 sm:inset-16 bg-[#FF8AA5]/10 dark:bg-white/5 backdrop-blur-[2px] rounded-xl" />
            <div className="absolute w-[90px] h-[90px] sm:w-[120px] sm:h-[120px] -inset-4 sm:-inset-6 m-auto z-50 bg-pink-400/30 blur-2xl rounded-full dark:block hidden" />
            <Image
              src={logo}
              alt="Logo"
              className="w-12 h-12 sm:w-16 sm:h-16 relative z-10 drop-shadow-lg"
              priority
            />
          </div>

          <h1 className="text-2xl sm:text-4xl font-semibold text-text-primary text-center px-2">
            Simplifique a organização do seu chá
          </h1>
          <p className="text-sm sm:text-md mt-3 sm:mt-4 text-text-secondary text-center max-w-xs sm:max-w-[530px] px-2">
            O Meu Chá Digital oferece soluções práticas para planejar, gerenciar e compartilhar seu evento de forma prática e moderna.
          </p>

          <section className="flex flex-col items-center justify-center space-y-4 px-4 col-span-1 mt-8 sm:mt-10 w-full">
            <form className="flex flex-col items-center justify-center w-full">
              <div className="w-full sm:w-[450px]">
                <Button variant="google" widthFull onClick={login}>
                  <Image src={googleIcon} alt="Google" width={20} height={20} />
                  Continuar com o Google
                </Button>
              </div>

              <small className="text-xs sm:text-sm text-text-secondary text-center mt-4 max-w-xs sm:max-w-[450px]">
                Ao continuar, você concorda com nossos {' '}
                <Link
                  href="/terms"
                  className="text-primary-light dark:text-primary-dark font-semibold hover:text-primary-dark dark:hover:text-primary-light transition-colors duration-200"
                >
                  Termos de Serviço
                </Link> e {' '}
                <Link
                  href="/privacy"
                  className="text-primary-light dark:text-primary-dark font-semibold hover:text-primary-dark dark:hover:text-primary-light transition-colors duration-200"
                >
                  Política de Privacidade
                </Link>.
              </small>
            </form>
          </section>
        </div>
      </Card>

      <div className="absolute bottom-4 right-4">
        <ThemeToggle />
      </div>
    </main>
  );
}