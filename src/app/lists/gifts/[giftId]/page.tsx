import Button from "@/components/Button";
import Image from "next/image";
import Tag from "@/components/Tag";
import PriorityTag from "@/components/Tag/PriorityTag";
import ProgressBar from "@/components/ProgressBar";
import { Info } from 'lucide-react';
import Link from "next/link";

export default function GiftPage() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 mt-8 py-6 px-4 md:px-8 h-fit">
      <section className="bg-white rounded-lg p-6 border border-gray-200">
        <header>
          <div className="flex items-center gap-2">
            <Tag label="Eletrônicos" color="bg-green-100 text-green-800" />
            <PriorityTag priority="alta" />
          </div>

          <h1 className="text-2xl font-bold text-text-primary mt-2">iPhone 13</h1>
          <p className="text-md mt-2 text-text-secondary font-medium">
            O novo iPhone 13 é o presente perfeito para quem ama tecnologia.
          </p>

          <p className="text-2xl text-success-dark font-bold mt-2">R$ 7.999,99</p>

          <div className="mt-4">
            <ProgressBar initialValue={4500} goalValue={7999.99} />
          </div>
        </header>

        <figure className="mt-6 bg-gray-500">
          <Image
            src="/images/gifts/iphone.jpg"
            alt="iPhone 13"
            width={600}
            height={500}
            className="rounded-lg"
          />
        </figure>

        <hr className="my-8 border-gray-300" />

        <article>
          <h2 className="text-lg font-semibold text-text-primary">Descrição do Presente</h2>
          <p className="text-md mt-2 text-text-secondary leading-relaxed">
            O iPhone 13 é o novo lançamento da Apple e vem com diversas novidades. O novo modelo é mais rápido, tem uma bateria que dura mais tempo e uma câmera melhorada. Além disso, o iPhone 13 também é mais resistente à água e poeira.
          </p>
        </article>
      </section>

      <aside className="sticky top-6 h-fit bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-text-primary mb-6">Pagamento</h2>

        <figure className="flex justify-center bg-gray-100 p-4 rounded-lg">
          <Image
            src="/images/gifts/qr-code.jpg"
            alt="QR Code para pagamento"
            width={200}
            height={200}
            className="rounded-lg"
          />
        </figure>

        <p className="text-sm text-text-secondary text-center mt-4">
          Escaneie o QR Code para contribuir com o presente. Use seu aplicativo de pagamento preferido.
        </p>

        <div className="mt-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-md font-medium text-text-secondary">Subtotal</h3>
            <p className="text-md text-text-secondary">R$ 7.999,99</p>
          </div>

          <div className="flex justify-between items-center">
            <h3 className="text-md font-medium text-text-secondary">Taxa</h3>
            <p className="text-md text-text-secondary">R$ 0,00</p>
          </div>

          <hr className="border-gray-200" />

          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-text-primary">Total</h3>
            <p className="text-lg font-bold text-success-dark">R$ 7.999,99</p>
          </div>
        </div>

        <div className="mt-6">
          <Button widthFull>
            Pagar
          </Button>
        </div>

        <div className="mt-6 flex items-start gap-3">
          <Info size={20} className="text-gray-600 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-600">
              Pagamento seguro garantido pelo Efi Bank
            </p>
            <p className="text-sm text-gray-600">
              Ao clicar em &quot;Pagar&quot;, você concorda com os{" "}
              <Link href="#" className="text-primary hover:underline">
                Termos de Uso.
              </Link>
            </p>
          </div>
        </div>
      </aside>
    </main>
  );
}