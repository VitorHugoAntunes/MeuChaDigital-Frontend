"use client";

import MenuAside from "@/components/ListSettingsPage/MenuAside";

const items = [
  { id: "coleta-de-dados", label: "Coleta de Dados", description: "Coletamos informações necessárias para fornecer nossos serviços de organização de chá de bebê digital. Os dados coletados incluem:", subItems: ["Nome", "Endereço de e-mail", "Informações sobre o evento", "Informações sobre os presentes", "Informações sobre os convidados", "Informações bancárias"] },
  { id: "uso-das-informacoes", label: "Uso das Informações", description: "As informações coletadas são utilizadas para:", subItems: ["Criar e gerenciar sua conta", "Personalizar sua experiência na plataforma", "Enviar convites e confirmações de presença", "Gerenciar a lista de presentes", "Melhorar nossos serviços"] },
  { id: "protecao-de-dados", label: "Proteção de Dados", description: "Nossos servidores são protegidos por medidas de segurança para garantir a integridade e confidencialidade dos dados. Utilizamos criptografia para proteger as informações transmitidas pela plataforma." },
  { id: "compartilhamento-de-dados", label: "Compartilhamento de Dados", description: "Não vendemos ou alugamos suas informações pessoais a terceiros. O compartilhamento de dados ocorre apenas quando necessário para a prestação dos serviços, como no caso de processamento de pagamentos e envio de convites." },
  { id: "cookies", label: "Cookies", description: "Utilizamos cookies para melhorar a experiência do usuário na plataforma. Os cookies são utilizados para:", subItems: ["Manter o usuário logado", "Manter informações de sessão", "Manter informações de checkout"] },
  { id: "direitos-do-usuario", label: "Direitos do Usuário", description: "Você tem o direito de:", subItems: ["Acessar suas informações pessoais", "Corrigir informações incorretas", "Solicitar a exclusão de informações"] },
  { id: "alteracoes-na politica", label: "Alterações na Política", description: "Reservamo-nos o direito de alterar esta política de privacidade a qualquer momento. As alterações serão publicadas na plataforma." },
];

export default function PrivacyPage() {
  return (
    <main className="w-full grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-10 lg:mt-8 lg:mb-36 py-6 h-fit relative">
      <MenuAside type="privacy" />

      <section className="w-full">
        <h2 className="text-2xl lg:text-3xl font-bold text-primary-light mb-6">Meu Chá Digital</h2>
        <p className="text-gray-500 text-base lg:text-lg mb-8">Última atualização: 28 de março de 2025</p>

        {items.map((item, index) => (
          <div id={item.id} key={item.id} className="lg:mt-12 lg:mb-12 border-b pb-6">
            <h3 className="text-xl lg:text-2xl font-semibold pt-4 pb-2 text-text-primary mb-4">{index + 1}. {item.label}</h3>
            <p className="text-gray-700 leading-relaxed text-base md:text-lg">{item.description}</p>

            {item.subItems && (
              <ul className="list-disc ml-6 mt-4">
                {item.subItems.map((subItem) => (
                  <li key={subItem} className="text-base lg:text-lg text-gray-700">{subItem}</li>
                ))}
              </ul>
            )}
          </div>
        ))}

        <section className="mt-12">
          <p className="text-base lg:text-lg">Para dúvidas ou esclarecimentos sobre estes termos, entre em contato através do email:</p>
          <a
            href="mailto:suporte@meuchadigital.com"
            className="text-primary-dark hover:text-primary-light transition-colors duration-300 text-base lg:text-lg font-semibold"
            aria-label="Enviar email para o suporte"
            onClick={(e) => {
              e.preventDefault();
              window.open('mailto:suporte@meuchadigital.com', '_blank');
            }}
          >
            suporte@meuchadigital.com
          </a>
        </section>

        <section className="mt-12">
          <p className="text-base lg:text-lg">Ao usar nosso serviço, você concorda com os termos desta política de privacidade.</p>
        </section>

        <p className="text-center lg:text-left text-base lg:text-lg mt-12">Última atualização: 28 de março de 2025</p>
      </section>
    </main>
  );
}