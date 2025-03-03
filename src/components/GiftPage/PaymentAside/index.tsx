"use client";

import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { Info, Share2 } from 'lucide-react';
import Link from "next/link";

interface PaymentAsideProps {
  isUserOwner: boolean;
  slug: string;
  giftId: string;
  giftName: string;
}

export default function PaymentAside({ isUserOwner, slug, giftId, giftName }: PaymentAsideProps) {
  return (
    <aside className="sticky top-6 h-fit bg-white rounded-lg p-6 border border-gray-200">
      <h2 className="text-lg font-semibold text-text-primary mb-4">Pagamento</h2>

      <div>
        <p className="text-md text-text-secondary mb-4">
          Contribua com o valor que deseja pagar, você pode pagar o valor total ou parcial.
        </p>

        <InputField label="Valor" type="number" placeholder="R$ 0,00" />
      </div>

      {isUserOwner ? (
        <>
          <div className="mt-6">
            <Link href={`/lists/${slug}/gifts/${giftId}/checkout-${giftName}`}>
              <Button widthFull>
                <Share2 size={20} />
                Compartilhar link
              </Button>
            </Link>
          </div>

          <div className="mt-6 flex items-start gap-3">
            <Info size={20} className="text-gray-600 flex-shrink-0 mt-1" />
            <div>
              <p className="text-sm text-gray-600">
                Compartilhe o link para que outras pessoas possam contribuir com o presente.
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="mt-6">
            <Link href={`/lists/${slug}/gifts/${giftId}/checkout-${giftName}`}>
              <Button widthFull>
                Pagar
              </Button>
            </Link>
          </div>

          <div className="mt-6 flex items-start gap-3">
            <Info size={20} className="text-gray-600 flex-shrink-0 mt-1" />
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
        </>
      )}
    </aside>
  );
}