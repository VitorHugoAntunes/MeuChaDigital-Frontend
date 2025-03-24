import { motion } from 'framer-motion';
import inviteImage from '@/assets/invite.png';
import { formatDateToFull } from '@/utils/formatDate';
import { formatSlug } from '@/utils/formatString';

interface InvitationHeroSectionProps {
  headerHeight: number;
  bannerUrl: string;
  slug: string;
  eventDate: string;
}

export default function InvitationHeroSection({ headerHeight, bannerUrl, slug, eventDate }: InvitationHeroSectionProps) {
  return (
    <section
      className="w-screen relative left-1/2 right-1/2 -mx-[50vw] flex items-center justify-center bg-no-repeat bg-center bg-cover"
      style={{
        height: `calc(100vh - ${headerHeight}px)`,
        backgroundImage: `url(${bannerUrl || inviteImage.src})`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-screen-lg mx-auto px-4 text-center relative z-10"
      >
        <h1 className="text-2xl lg:text-5xl text-white mb-6 drop-shadow-lg tracking-wide">Você está convidado(a)!</h1>
        <p className="text-5xl lg:text-7xl font-parisienne font-bold text-white mt-2 drop-shadow-lg">{formatSlug(slug)}</p>
        <time dateTime="2030-12-20" className="text-xl text-white mt-4 block drop-shadow-lg first-letter:uppercase italic">{formatDateToFull(eventDate)}</time>
      </motion.article>
    </section>
  );
}