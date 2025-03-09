// components/InvitationHeader.tsx
"use client";

import NavLink from '@/components/NavLink';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from '@/components/Button';
import { Gift } from 'lucide-react';

interface InvitationHeaderProps {
  ref?: React.RefObject<HTMLHeadElement | null>;
  title: string | undefined;
}

export default function InvitationHeader({ ref, title }: InvitationHeaderProps) {
  const [subdomain, setSubdomain] = useState("");
  const pathName = usePathname();
  const currentUrl = pathName.split("?")[0];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      const parts = hostname.split(".");
      if (parts.length >= 2 && parts[1] === "localhost") {
        setSubdomain(parts[0]); // Extrai o subdomínio (ex: "teste-2")
      }
    }
  }, []);

  if (!currentUrl.startsWith("/invitation")) {
    return null;
  }

  if (title === undefined) {
    return (
      <header className="w-screen ml-[calc(-50vw+50%)] flex items-center justify-between py-6 px-8 bg-background text-text-primary border-b-2 border-b-gray-200 animate-pulse">
        <div className="h-8 w-48 bg-gray-300 rounded"></div>

        <nav className="flex space-x-6">
          <div className="h-6 w-32 bg-gray-300 rounded"></div>
          <div className="h-6 w-32 bg-gray-300 rounded"></div>
          <div className="h-6 w-32 bg-gray-300 rounded"></div>
          <div className="h-6 w-32 bg-gray-300 rounded"></div>
        </nav>
      </header>
    )
  }

  return (
    <header
      ref={ref}
      className="w-screen ml-[calc(-50vw+50%)] flex items-center justify-between py-6 px-8 bg-background text-text-primary border-b-2 border-b-gray-200"
    >
      <Link
        href={`http://${subdomain}.localhost:3000/invitation`}
        className="group hover:text-primary-dark transition-colors duration-300 w-fit inline-block"
      >
        <h2 className="text-2xl font-semibold text-primary-light group-hover:brightness-90 transition-all duration-300">
          {title}
        </h2>
      </Link>

      <nav className="flex space-x-6">
        <NavLink href={`http://${subdomain}.localhost:3000/invitation/#rsvp`}>Confirme sua presença</NavLink>
        <NavLink href={`http://${subdomain}.localhost:3000/invitation/#moments`}>Nossos momentos</NavLink>
        <NavLink href={`http://${subdomain}.localhost:3000/invitation/#location`}>Localização</NavLink>
        <NavLink href={`http://${subdomain}.localhost:3000/invitation/gifts`}>
          <Button borderStyle="rounded">
            Lista de presentes
            <Gift size={20} />
          </Button>
        </NavLink>
      </nav>
    </header>
  );
}