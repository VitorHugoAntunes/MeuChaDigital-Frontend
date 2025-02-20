import Card from '@/components/Card';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import InputTextArea from '@/components/InputTextArea';

export default function InvitationRSVPSection() {
  return (
    <section id="rsvp" className="py-16 px-8 bg-gray-50">
      <h2 className="text-center text-4xl font-bold text-gray-900 mb-12">Confirme sua presença</h2>
      <Card className="max-w-screen-sm w-full mx-auto">
        <form>
          <InputField label="Nome" placeholder="Digite seu nome" />
          <InputField label="E-mail" placeholder="Digite seu e-mail" />
          <InputField label="Telefone" placeholder="Digite seu telefone" />
          <InputTextArea label="Observações" placeholder="Restrições alimentares, dúvidas, etc." />
          <div className="flex justify-between mt-8 gap-4">
            <Button variant='outlined' widthFull>Recusar educadamente</Button>
            <Button widthFull>Confirmar presença</Button>
          </div>
        </form>
      </Card>
    </section>
  );
}