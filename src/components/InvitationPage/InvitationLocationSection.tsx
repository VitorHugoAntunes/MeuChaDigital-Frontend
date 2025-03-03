import Card from '@/components/Card';

export default function InvitationLocationSection() {
  return (
    <section id="location" className="text-center py-16 px-8">
      <h3 className="text-4xl font-bold text-gray-900 mb-12">Localização</h3>
      <Card className="max-w-screen-md w-full mx-auto rounded-3xl">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.007294888034!2d-46.64662538498427!3d-23.56914868467948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5b0d0f2c1f3f%3A0x5e7e0f3b0a8d0f7d!2sIgreja%20de%20S%C3%A3o%20Francisco!5e0!3m2!1spt-BR!2sbr!4v1633865446488!5m2!1spt-BR!2sbr"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          className='rounded-2xl'
        ></iframe>
        <div className="mt-8">
          <p className="text-xl text-gray-700 font-medium">Igreja de São Francisco</p>
          <p className="text-lg text-gray-700">Rua São Francisco, 123 - Centro, São Paulo - SP</p>
          <p className="text-lg text-gray-700">CEP: 12345-678</p>
        </div>
      </Card>
    </section>
  );
}