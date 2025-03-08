import { formatDateToBR } from '@/utils/formatDate';
import { Calendar, Clock, MapPin } from 'lucide-react';

interface InvitationCalendarInfoProps {
  eventDate: string;
}

export default function InvitationCalendarInfo({ eventDate }: InvitationCalendarInfoProps) {
  return (
    <section className="text-center py-16 px-8">
      <h2 className="text-4xl font-bold text-gray-900 mb-12">Marque no seu calendário</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-screen-lg mx-auto">
        <div className="flex items-center justify-center space-x-4">
          <Calendar size={32} className="text-primary" />
          <p className="text-xl text-gray-700 font-medium">{formatDateToBR(eventDate)}</p>
        </div>
        <div className="flex items-center justify-center space-x-4">
          <Clock size={32} className="text-primary" />
          <p className="text-xl text-gray-700 font-medium">Às 15h00</p>
        </div>
        <div className="flex items-center justify-center space-x-4">
          <MapPin size={32} className="text-primary" />
          <p className="text-xl text-gray-700 font-medium">Igreja de São Francisco</p>
        </div>
      </div>
    </section>
  );
}