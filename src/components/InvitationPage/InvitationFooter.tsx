import { Heart } from 'lucide-react';

interface InvitationFooterProps {
  slug: string | undefined;
}

export default function InvitationFooter({ slug }: InvitationFooterProps) {
  if (slug === undefined) {
    return (
      <footer className="py-8 text-center w-screen relative left-1/2 right-1/2 -mx-[50vw] border-t-2 border-t-gray-dark dark:bg-gray-dark animate-pulse">
        <div className="h-4 w-48 bg-gray-dark dark:bg-gray-light rounded mx-auto"></div>
        <div className="h-4 w-32 bg-gray-dark dark:bg-gray-light rounded mx-auto mt-2"></div>
      </footer>
    )
  }

  return (
    <footer className="mt-8 py-8 text-center w-screen relative left-1/2 right-1/2 -mx-[50vw] border-t-2 border-t-gray-dark dark:bg-gray-dark dark:border-t-gray-light">
      <p className="text-sm text-text-primary">Faça parte deste momento especial!</p>
      <p className="text-sm mt-2 text-text-primary">
        <Heart size={16} className="text-primary inline-block" />
        {` ${slug} `}
        <Heart size={16} className="text-primary inline-block" />

      </p>

      <p className="text-sm mt-2 text-text-secondary">© 2025 Meu Chá Digital. Todos os direitos reservados.</p>
    </footer>
  );
}