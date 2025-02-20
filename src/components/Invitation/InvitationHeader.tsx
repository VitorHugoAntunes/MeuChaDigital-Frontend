import NavLink from '@/components/NavLink';

interface InvitationHeaderProps {
  ref: React.RefObject<HTMLHeadElement | null>;
}

export default function InvitationHeader({ ref }: InvitationHeaderProps) {
  return (
    <header ref={ref} className="flex items-center justify-between py-6 bg-background text-text-primary border-b-2 border-b-gray-200">
      <h2 className="text-2xl font-semibold text-primary-light">Ana & Vitor</h2>
      <nav className="flex space-x-6">
        <NavLink href="#rsvp">Confirme sua presença</NavLink>
        <NavLink href="/lists/gifts">Lista de presentes</NavLink>
        <NavLink href="#moments">Nossos momentos</NavLink>
        <NavLink href="#location">Localização</NavLink>
      </nav>
    </header>
  );
}