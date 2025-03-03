"use client";

import Button from "@/components/Button";
import Image from "next/image";
import Tag from "@/components/Tag";
import PriorityTag from "@/components/Tag/PriorityTag";
import ProgressBar from "@/components/ProgressBar";
import { Info, Trash, Edit, Share2 } from 'lucide-react';
import Link from "next/link";
import { useEffect, useState } from "react";
import { useGiftBySlug } from "@/hooks/gifts";
import { useParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import InputField from "@/components/InputField";
import Divider from "@/components/Divider";

export default function GiftPage() {
  const { user, isAuthenticated } = useAuth();
  const [isUserOwner, setIsUserOwner] = useState(false);
  const slug = useParams().list as string;
  const giftId = useParams().giftId as string;
  const { data: gift, isLoading, error } = useGiftBySlug(slug, giftId);

  useEffect(() => {
    if (gift?.list.userId && user?.id) {
      setIsUserOwner(gift.list.userId === user.id);
    }
  }, [gift, user]);

  if (!isAuthenticated) {
    return (
      <main className="flex flex-col flex-1 w-screen my-8 justify-center items-center">
        <h1 className="text-2xl font-semibold text-text-primary">Você não está logado</h1>
        <p className="text-md mt-2 text-text-secondary">
          Faça login para acessar suas listas de presentes.
        </p>
        <Link href="/sign-in" className="mt-6">
          <Button variant="default">Entrar na conta</Button>
        </Link>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 mt-8 py-6 px-4 md:px-8 h-fit w-full">
        <section className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="animate-pulse space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-24 bg-gray-200 rounded"></div>
              <div className="h-6 w-16 bg-gray-200 rounded"></div>
            </div>
            <div className="h-8 w-48 bg-gray-200 rounded"></div>
            <div className="h-4 w-64 bg-gray-200 rounded"></div>
            <div className="h-4 w-32 bg-gray-200 rounded"></div>

            <div className="h-4 w-full bg-gray-200 rounded"></div>

            {isUserOwner && (
              <div className="flex items-center gap-4 justify-end">
                <div className="h-10 w-24 bg-gray-200 rounded"></div>
                <div className="h-10 w-24 bg-gray-200 rounded"></div>
              </div>
            )}

            <div className="h-64 w-full bg-gray-200 rounded-lg"></div>

            <div className="space-y-2">
              <div className="h-4 w-48 bg-gray-200 rounded"></div>
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </section>

        <aside className="sticky top-6 h-fit bg-white rounded-lg p-6 border border-gray-200">
          <div className="animate-pulse space-y-4">
            <div className="h-6 w-24 bg-gray-200 rounded"></div>

            <div className="h-40 w-40 bg-gray-200 rounded-lg mx-auto"></div>

            <div className="h-4 w-full bg-gray-200 rounded"></div>

            <div className="space-y-2">
              <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
            </div>

            <div className="h-10 w-full bg-gray-200 rounded"></div>

            <div className="flex items-start gap-3">
              <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </aside>
      </main>
    );
  }

  if (error) {
    return (
      <main className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 mt-8 py-6 px-4 md:px-8 h-fit w-full">
        <section className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-red-500">Erro ao carregar o presente.</p>
        </section>
      </main>
    );
  }

  if (!gift) {
    return (
      <main className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 mt-8 py-6 px-4 md:px-8 h-fit w-full">
        <section className="bg-white rounded-lg p-6 border border-gray-200">
          <p>Presente não encontrado.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 mt-8 py-6 px-4 md:px-8 h-fit w-full">
      <section className="bg-white rounded-lg p-6 border border-gray-200">
        <header>
          <div className="flex items-center gap-2">
            {gift.category && (
              <Tag label={gift.category.name} color="bg-green-100 text-green-800" />
            )}
            <PriorityTag priority={gift.priority} />
          </div>

          <h1 className="text-2xl font-bold text-text-primary mt-2">{gift.name}</h1>
          <p className="text-md mt-2 text-text-secondary font-medium">
            {gift.description}
          </p>

          <p className="text-2xl text-success-dark font-bold mt-2">
            R$ {gift.totalValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </p>

          <div className="mt-4">
            <ProgressBar initialValue={gift.totalValue} goalValue={gift.totalValue} />
          </div>

          {isUserOwner && (
            <div className="flex items-center mt-4 gap-4 justify-end">
              <Button variant="outlined-warning">
                <Edit size={20} />
                Editar
              </Button>

              <Button variant="outlined-danger">
                <Trash size={20} />
                Excluir
              </Button>
            </div>
          )}
        </header>

        {gift.photo && (
          <figure className="mt-6 bg-gray-500 rounded-lg">
            <Image
              src={gift.photo.url}
              alt={gift.name}
              width={600}
              height={500}
              className="rounded-lg object-cover w-full h-full"
            />
          </figure>
        )}

        <Divider />

        <article>
          <h2 className="text-lg font-semibold text-text-primary">Descrição do Presente</h2>
          <p className="text-md mt-2 text-text-secondary leading-relaxed">
            {gift.description}
          </p>
        </article>
      </section>

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
              <Link href={`/lists/${slug}/gifts/${giftId}/checkout-${gift.name}`}>
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
              <Link href={`/lists/${slug}/gifts/${giftId}/checkout-${gift.name}`}>
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
    </main>
  );
}