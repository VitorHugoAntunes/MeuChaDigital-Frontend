import Image from 'next/image';
import inviteImage from '@/assets/invite.png';

interface MomentImageProps {
  src: string;
  alt: string;
}

function MomentImage({ src, alt }: MomentImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={800}
      height={400}
      className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
    />
  );
}

export default function InvitationMomentsSection() {
  return (
    <section id="moments" className="w-screen relative left-1/2 right-1/2 -mx-[50vw] flex flex-col items-center py-16 mt-8 bg-white">
      <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Nossos momentos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl px-4">
        <div className="md:col-span-2">
          <MomentImage src={inviteImage.src} alt="Imagem" />
        </div>
        <div className="flex justify-end">
          <MomentImage src={inviteImage.src} alt="Imagem" />
        </div>
        <div className="flex justify-start">
          <MomentImage src={inviteImage.src} alt="Imagem" />
        </div>
        <div className="md:col-span-2">
          <MomentImage src={inviteImage.src} alt="Imagem" />
        </div>
      </div>
    </section>
  );
}