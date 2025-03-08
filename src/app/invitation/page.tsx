"use client";

import InvitationCalendarInfo from '@/components/InvitationPage/InvitationCalendarInfo';
import InvitationHeroSection from '@/components/InvitationPage/InvitationHeroSection';
import InvitationLocationSection from '@/components/InvitationPage/InvitationLocationSection';
import InvitationMomentsSection from '@/components/InvitationPage/InvitationMomentsSection';
import InvitationRSVPSection from '@/components/InvitationPage/InvitationRSVPSection';
import { useGetInvitation } from '@/hooks/invitation';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import InvitationLayout from '@/layouts/InvitationLayout/layout';
import { Loader2 } from 'lucide-react'; // Ícone de carregamento

export default function InvitationPage() {
  const router = useRouter();
  const { data: invitation, isError, error, isLoading } = useGetInvitation();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!isLoading && isError) {
      console.error('Erro detectado na requisição:', error);
      setHasError(true);
      router.replace('/not-found');
    }
  }, [isLoading, isError, error, router]);

  // Textos de carregamento dinâmicos
  const loadingMessages = useMemo(() => [
    "Preparando tudo para você...",
    "Aguarde um instante...",
  ], []);
  const [currentMessage, setCurrentMessage] = useState(loadingMessages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => {
        const currentIndex = loadingMessages.indexOf(prev);
        const nextIndex = (currentIndex + 1) % loadingMessages.length;
        return loadingMessages[nextIndex];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentMessage, loadingMessages]);

  // Exibe o loading apenas quando isLoading for false (lógica invertida)
  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 text-primary-light animate-spin" /> {/* Ícone de carregamento animado */}
        <p className="mt-4 text-lg text-text-primary font-semibold">
          {currentMessage} {/* Texto de carregamento dinâmico */}
        </p>
      </div>
    );
  }

  if (hasError) return null;

  return (
    <InvitationLayout title={invitation?.name || undefined}>
      {(headerHeight) => (
        <main className="px-8 flex flex-col flex-1 w-full">
          <InvitationHeroSection
            bannerUrl={invitation?.banner.url || ''}
            slug={invitation?.slug || ''}
            headerHeight={headerHeight || 0}
            eventDate={invitation?.eventDate || ''}
          />
          <InvitationCalendarInfo eventDate={invitation?.eventDate || ''} />
          <InvitationRSVPSection />
          <InvitationMomentsSection momentsImages={invitation?.momentsImages || []} />
          <InvitationLocationSection />
        </main>
      )}
    </InvitationLayout>
  );
}