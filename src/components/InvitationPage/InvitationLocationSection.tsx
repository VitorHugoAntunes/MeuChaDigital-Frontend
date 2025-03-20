import Card from '@/components/Card';
import { formatZipCode } from '@/utils/formatString';

interface InvitationLocationSectionProps {
  address: {
    streetAddress: string;
    streetNumber: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export default function InvitationLocationSection({ address }: InvitationLocationSectionProps) {
  const { streetAddress, streetNumber, neighborhood, city, state, zipCode } = address;

  const formattedAddress = encodeURIComponent(`${streetAddress}, ${streetNumber} - ${neighborhood}, ${city} - ${state}, ${zipCode}`);
  const googleMapsUrl = `https://www.google.com/maps?q=${formattedAddress}&output=embed`;

  return (
    <section id="location" className="text-center py-16 px-8">
      <h3 className="text-4xl font-bold text-gray-900 mb-12">Localização</h3>
      <Card className="max-w-screen-md w-full mx-auto rounded-3xl">
        <iframe
          src={googleMapsUrl}
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          className="rounded-2xl"
        ></iframe>
        <div className="mt-8">
          <p className="text-lg text-gray-700">
            {streetAddress}, {streetNumber} - {neighborhood}, {city} - {state}
          </p>
          <p className="text-lg text-gray-700">CEP: {formatZipCode(zipCode)}</p>
        </div>
      </Card>
    </section>
  );
}
