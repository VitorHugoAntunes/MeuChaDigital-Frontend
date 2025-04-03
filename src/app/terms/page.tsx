"use client";

import MenuAside from "@/components/ListSettingsPage/MenuAside";

const items = [
  { id: "aceitacao-dos-termos", label: "Aceitação dos Termos", description: "Ao acessar e usar o Meu Chá Digital, você concorda com estes termos de uso e todas as suas condições. Se você não concordar com qualquer parte destes termos, por favor, não use nossos serviços." },
  { id: "cadastro-e-conta", label: "Cadastro e Conta", description: "Para acessar certos recursos do Meu Chá Digital, você pode ser solicitado a usar sua conta do Google. Você é responsável por manter a confidencialidade de sua conta e por restringir o acesso ao seu computador." },
  { id: "uso-de-nossos-servicos", label: "Uso de Nossos Serviços", description: "Nosso serviço permite que você crie e gerencie listas de presentes, envie convites digitais e receba confirmações de presença para seu chá. O uso deve ser feito de forma ética e legal. Não é permitido o uso de nossos serviços para atividades ilegais ou prejudiciais." },
  { id: "privacidade-e-dados", label: "Privacidade e Dados", description: "Protegemos seus dados pessoais de acordo com nossa Política de Privacidade. Ao usar nossos serviços, você concorda com a coleta e uso de informações conforme descrito." },
  { id: "propriedade-intelectual", label: "Propriedade Intelectual", description: "Todo o conteúdo disponível no Meu Chá Digital, incluindo textos, gráficos, logos e software, é propriedade exclusiva da plataforma e está protegido por leis de direitos autorais." },
  { id: "limitacao-de-responsabilidade", label: "Limitação de Responsabilidade", description: "O Meu Chá Digital não se responsabiliza por danos indiretos, incidentais ou consequentes resultantes do uso ou impossibilidade de uso dos serviços." },
  { id: "alteracoes-nos-termos", label: "Alterações nos Termos", description: "Reservamos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor após a publicação dos termos atualizados em nossa plataforma. Se você continuar a usar nossos serviços após a alteração, você concorda com os novos termos." },
  { id: "disposicoes-gerais", label: "Disposições Gerais", description: "Estes termos de uso são regidos pelas leis do Brasil. Se qualquer disposição for considerada inválida, as demais disposições permanecerão em pleno vigor e efeito." },
];

export default function TermsPage() {
  return (
    <main className="w-full grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-10 lg:mt-8 lg:mb-36 py-6 h-fit relative">
      <MenuAside type="terms" />

      <section className="w-full">
        <h2 className="text-2xl lg:text-3xl font-bold text-primary-light mb-6">Meu Chá Digital</h2>
        <p className="text-text-secondary text-base lg:text-lg mb-8">Última atualização: 28 de março de 2025</p>

        {items.map((item) => (
          <div id={item.id} key={item.id} className="lg:mt-12 lg:mb-12 border-b pb-6">
            <h3 className="text-xl lg:text-2xl font-semibold pt-4 pb-2 text-text-primary mb-4">{item.label}</h3>
            <p className="text-text-secondary leading-relaxed text-base md:text-lg">{item.description}</p>
          </div>
        ))}

        <section className="mt-12">
          <p className="text-base lg:text-lg text-text-secondary">Para dúvidas ou esclarecimentos sobre estes termos, entre em contato através do email:</p>
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
          <p className="text-base lg:text-lg text-text-secondary">Ao usar nossos serviços, você concorda com estes termos.</p>
        </section>

        <p className="text-center lg:text-left text-base lg:text-lg mt-12 text-text-secondary">Última atualização: 28 de março de 2025</p>
      </section>
    </main>
  );
}