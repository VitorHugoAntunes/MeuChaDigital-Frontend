import { Heart } from 'lucide-react';

export default function InvitationFooter() {
  return (
    <footer className="py-8 text-center w-screen relative left-1/2 right-1/2 -mx-[50vw] border-t-2 border-t-gray-200">
      <p className="text-sm">Faça parte deste momento especial!</p>
      <p className="text-sm mt-2">
        <Heart size={16} className="text-primary inline-block" /> Seu nome <Heart size={16} className="text-primary inline-block" />
      </p>
    </footer>
  );
}