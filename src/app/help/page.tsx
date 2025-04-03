"use client";

import Card from "@/components/Card";
import { Gift, Mail, User } from "lucide-react";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Help() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const steps = [
    { icon: <User className="text-primary" />, title: "Crie sua conta", description: "Registre-se em poucos passos para acessar todas as funcionalidades do Meu Chá Digital." },
    { icon: <Gift className="text-primary" />, title: "Monte sua lista", description: "Adicione os presentes que deseja receber e personalize sua lista conforme suas preferências." },
    { icon: <Mail className="text-primary" />, title: "Compartilhe", description: "Envie o link da lista para seus convidados e acompanhe as confirmações em tempo real." }
  ];

  const faqs = [
    { question: "Como criar uma lista de presentes?", answer: "Após fazer login, vá até a seção 'Listas' e clique em 'Criar nova lista'. Siga as instruções para adicionar presentes e personalizar sua lista." },
    { question: "Como adicionar presentes à lista?", answer: "Na página da sua lista, clique em 'Adicionar Presente'. Insira os detalhes do item, como nome, descrição e valor, e salve as informações." },
    { question: "Como compartilhar a lista com convidados?", answer: "Acesse sua lista, clique em 'Compartilhar' e copie o link único. Envie-o por e-mail, mensagem ou redes sociais para seus convidados." },
    { question: "Como os convidados confirmam presença?", answer: "Os convidados acessam o link da lista, escolhem um presente e confirmam a participação diretamente na plataforma." },
    { question: "Como acompanhar as confirmações?", answer: "Na página da sua lista, você verá uma seção dedicada aos convidados, com status de confirmação e presentes escolhidos." },
    { question: "Como funcionam as contribuições?", answer: "Os convidados podem contribuir financeiramente para os presentes escolhidos. O valor é repassado diretamente para você após a confirmação do pagamento." },
    { question: "Como receber as contribuições?", answer: "Para receber os valores, é necessário cadastrar uma chave PIX em seu perfil. As contribuições são depositadas automaticamente na conta vinculada.", notice: "As chaves PIX devem estar vinculadas a uma conta bancária EFI Bank." },
    { question: "Como cadastrar uma chave PIX?", answer: "No seu perfil, vá até 'Configurações de Pagamento', clique em 'Adicionar Chave PIX' e siga as instruções para vincular sua chave.", notice: "As chaves PIX devem estar vinculadas a uma conta bancária EFI Bank, e só é permitido cadastrar até 5 chaves por conta." }
  ];

  return (
    <main className="lg:mt-8 py-6 h-fit text-center w-full">
      {/* Seção de como funciona */}
      <section aria-labelledby="how-it-works-heading">
        <header>
          <h1 id="how-it-works-heading" className="text-3xl font-bold text-text-primary mb-4 lg:mb-8">
            Ajuda
          </h1>
          <h2 className="text-xl font-semibold text-text-primary mb-4 lg:mb-6">
            Como funciona o Meu Chá Digital?
          </h2>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="p-4 lg:p-6 rounded-2xl border border-gray-dark flex flex-col items-center bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center w-8 h-8 lg:w-12 lg:h-12 rounded-full bg-primary text-white text-sm lg:text-lg font-bold shadow-md">
                {index + 1}
              </div>

              <div className="my-4">
                {React.cloneElement(step.icon, { size: 32, className: "text-primary lg:w-12 lg:h-12" })}
              </div>

              <h3 className="text-lg font-semibold text-text-primary mb-2">
                {step.title}
              </h3>

              <p className="text-md text-text-secondary">
                {step.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-12 py-12 w-screen -ml-[calc(50vw-50%)] bg-primary-extraLight dark:bg-gray-dark bg-opacity-70" aria-labelledby="faq-heading">
        <div className="container mx-auto px-4">
          <h2 id="faq-heading" className="text-lg lg:text-xl font-semibold text-text-primary mb-6 text-center">
            Dúvidas frequentes
          </h2>

          <div className="max-w-2xl mx-auto">
            {faqs.map((faq, index) => (
              <article key={index} className="mb-4">
                <Card
                  className={`rounded-2xl border ${openIndex === index ? "border-primary dark:border-primary" : "border-gray-dark"
                    } bg-white shadow-sm hover:shadow-md transition-shadow`}
                >
                  <button
                    className="w-full flex justify-between items-center text-left text-lg font-semibold text-text-primary"
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={openIndex === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span className="text-base lg:text-lg">{faq.question}</span>
                    {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>

                  <div
                    id={`faq-answer-${index}`}
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                      }`}
                  >
                    <p className="text-md text-text-secondary mt-4 text-left">{faq.answer}</p>

                    {faq.notice && (
                      <p className="text-sm font-bold text-text-secondary mt-2 text-left">
                        Atenção: {faq.notice}
                      </p>
                    )}
                  </div>
                </Card>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}