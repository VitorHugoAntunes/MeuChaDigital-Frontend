import { Heart } from 'lucide-react';

interface InvitationFooterProps {
  slug: string | undefined;
}

export default function InvitationFooter({ slug }: InvitationFooterProps) {
  if (slug === undefined) {
    return (
      <footer className="py-8 text-center w-screen relative left-1/2 right-1/2 -mx-[50vw] border-t-2 border-t-gray-200 animate-pulse">
        <div className="h-4 w-48 bg-gray-300 rounded mx-auto"></div>
        <div className="h-4 w-32 bg-gray-300 rounded mx-auto mt-2"></div>
      </footer>
    )
  }

  return (
    <footer className="py-8 text-center w-screen relative left-1/2 right-1/2 -mx-[50vw] border-t-2 border-t-gray-200">
      <p className="text-sm">Faça parte deste momento especial!</p>
      <p className="text-sm mt-2">
        <Heart size={16} className="text-primary inline-block" />
        {` ${slug} `}
        <Heart size={16} className="text-primary inline-block" />
      </p>
    </footer>
  );
}