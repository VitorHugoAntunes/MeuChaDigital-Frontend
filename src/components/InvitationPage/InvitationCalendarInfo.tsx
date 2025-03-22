import { formatDateToBR } from '@/utils/formatDate';
import { Calendar, Clock, MapPin } from 'lucide-react';

interface InvitationCalendarInfoProps {
  eventDate: string;
  eventTime: string;
  eventLocation: {
    streetAddress: string;
    streetNumber: string;
    neighborhood: string;
    city: string;
    state: string;
  };
}

export default function InvitationCalendarInfo({ eventDate, eventTime, eventLocation }: InvitationCalendarInfoProps) {
  const { streetAddress, streetNumber, neighborhood, city, state } = eventLocation;

  return (
    <section className="text-center py-8 sm:py-16">
      <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-8 sm:mb-12">
        Marque no seu calendário
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-screen-lg mx-auto">
        {[
          {
            icon: Calendar,
            title: "Data do evento",
            text: formatDateToBR(eventDate),
          },
          {
            icon: Clock,
            title: "Horário",
            text: `Às ${eventTime}`,
          },
          {
            icon: MapPin,
            title: "Local",
            text: `${streetAddress}, ${streetNumber} - ${neighborhood}, ${city} - ${state}`,
          },
        ].map(({ icon: Icon, title, text }, index) => (
          <div
            key={index}
            className="flex flex-col items-center space-y-4 bg-gray-50 rounded-lg"
          >
            <div className="p-3 sm:p-4 bg-primary-extraLight rounded-full bg-opacity-50">
              <Icon size={24} className="text-primary" />
            </div>

            <div>
              <h3 className="text-base sm:text-lg text-gray-600 font-normal">{title}</h3>
              <p className="text-lg sm:text-xl text-center text-gray-700 font-semibold">
                {text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}