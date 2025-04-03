
"use client";

import InvitationCalendarInfo from '@/components/InvitationPage/InvitationCalendarInfo';
import InvitationHeroSection from '@/components/InvitationPage/InvitationHeroSection';
import InvitationLocationSection from '@/components/InvitationPage/InvitationLocationSection';
import InvitationMomentsSection from '@/components/InvitationPage/InvitationMomentsSection';
import InvitationRSVPSection from '@/components/InvitationPage/InvitationRSVPSection';
import { useGetInvitation } from '@/hooks/invitation';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import InvitationLayout from '@/layouts/InvitationLayout/layout';
import { Loader2 } from 'lucide-react';

const loadingMessages = ["Preparando tudo para você...", "Aguarde um instante..."];

export default function InvitationPageWrapper() {
  const router = useRouter();
  const { data: invitation, isError, error, isLoading } = useGetInvitation();

  const messageIndexRef = useRef(0);
  const [, forceRender] = useState(0);

  console.log('invitation', invitation);

  useEffect(() => {
    if (!isLoading && isError) {
      console.error('Erro detectado na requisição:', error);
      router.replace('/not-found');
    }
  }, [isLoading, isError, error, router]);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        messageIndexRef.current = (messageIndexRef.current + 1) % loadingMessages.length;
        forceRender((prev) => prev + 1);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 text-primary-light animate-spin" />
        <p className="mt-4 text-lg text-text-primary font-semibold">
          {loadingMessages[messageIndexRef.current]}
        </p>
      </div>
    );
  }

  return (
    <InvitationLayout title={invitation?.data.name || undefined}>
      {(headerHeight) => (
        <main className="flex flex-col flex-1 w-full">
          <InvitationHeroSection
            bannerUrl={invitation?.data.banner.url || ''}
            title={invitation?.data.name || ''}
            headerHeight={headerHeight || 0}
            eventDate={invitation?.data.eventDate || ''}
          />
          <InvitationCalendarInfo
            eventDate={invitation?.data.eventDate || ''}
            eventTime={invitation?.data.eventTime || ''}
            eventLocation={invitation?.data.address ?? {
              streetAddress: '',
              streetNumber: '',
              neighborhood: '',
              city: '',
              state: ''
            }}
          />
          <InvitationRSVPSection giftListId={invitation?.data.id || ''} />
          <InvitationMomentsSection momentsImages={invitation?.data.momentsImages || []} />
          {invitation?.data.address && <InvitationLocationSection address={invitation.data.address} />}
        </main>
      )}
    </InvitationLayout>
  );
}
