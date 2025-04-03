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
    <section id="location" className="text-center my-8 lg:my-16 max-w-screen-sm w-full mx-auto">
      <h3 className="text-4xl font-bold text-text-primary mb-8 lg:mb-12">Localização</h3>
      <Card className="max-w-screen-md w-full mx-auto rounded-3xl p-4 sm:p-6">
        <iframe
          src={googleMapsUrl}
          width="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          className="rounded-2xl h-[250px] sm:h-[400px] w-full"
        ></iframe>

        <div className="mt-4 lg:mt-8">
          <p className="text-base sm:text-lg text-text-secondary">
            {streetAddress}, {streetNumber} - {neighborhood}, {city} - {state}
          </p>
          <p className="text-base sm:text-lg text-text-secondary">CEP: {formatZipCode(zipCode)}</p>
        </div>
      </Card>
    </section>
  );
}
