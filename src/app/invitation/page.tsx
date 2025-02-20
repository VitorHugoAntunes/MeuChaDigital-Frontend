"use client";

import InvitationCalendarInfo from '@/components/Invitation/InvitationCalendarInfo';
import InvitationFooter from '@/components/Invitation/InvitationFooter';
import InvitationHeader from '@/components/Invitation/InvitationHeader';
import InvitationHeroSection from '@/components/Invitation/InvitationHeroSection';
import InvitationLocationSection from '@/components/Invitation/InvitationLocationSection';
import InvitationMomentsSection from '@/components/Invitation/InvitationMomentsSection';
import InvitationRSVPSection from '@/components/Invitation/InvitationRSVPSection';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { useEffect, useRef, useState } from 'react';

export default function InvitationPage() {
  const [showButton, setShowButton] = useState(false);
  const headerRef = useRef<HTMLHeadElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        if (!showButton) setShowButton(true);
      } else {
        if (showButton) setShowButton(false);
      }
    };

    if (headerRef.current) {
      setHeaderHeight(headerRef.current.clientHeight);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showButton]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="flex flex-col w-full">
      <InvitationHeader ref={headerRef} />

      <main className="flex flex-col flex-1 w-full">
        <InvitationHeroSection headerHeight={headerHeight} />

        <InvitationCalendarInfo />

        <InvitationRSVPSection />

        <InvitationMomentsSection />

        <InvitationLocationSection />
      </main>

      <InvitationFooter />

      <ScrollToTopButton onClick={scrollToTop} showButton={showButton} />
    </div>
  );
}