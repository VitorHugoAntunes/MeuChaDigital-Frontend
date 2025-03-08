"use client";

import InvitationHeader from '@/components/InvitationPage/InvitationHeader';
import InvitationFooter from '@/components/InvitationPage/InvitationFooter';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { ReactNode, useEffect, useRef, useState } from 'react';

interface InvitationLayoutProps {
  children: ReactNode | ((headerHeight?: number) => ReactNode); // headerHeight é opcional
  title: string | undefined;
}

export default function InvitationLayout({ children, title }: InvitationLayoutProps) {
  const [showButton, setShowButton] = useState(false);
  const headerRef = useRef<HTMLHeadElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    if (headerRef.current) {
      setHeaderHeight(headerRef.current.clientHeight);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen w-full">
      <InvitationHeader title={title} ref={headerRef} />
      <main>
        {typeof children === 'function' ? children(headerHeight) : children}
      </main>
      <InvitationFooter slug={title} />
      <ScrollToTopButton onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} showButton={showButton} />
    </div>
  );
}