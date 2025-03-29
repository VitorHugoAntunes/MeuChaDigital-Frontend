"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Card from "@/components/Card";

interface MenuAsideProps {
  type: "terms" | "privacy" | "settings";
}

const menuOptions = {
  terms: [
    { id: "aceitacao-dos-termos", label: "Aceitação dos Termos" },
    { id: "cadastro-e-conta", label: "Cadastro e Conta" },
    { id: "uso-de-nossos-servicos", label: "Uso de Nossos Serviços" },
    { id: "privacidade-e-dados", label: "Privacidade e Dados" },
    { id: "propriedade-intelectual", label: "Propriedade Intelectual" },
    { id: "limitacao-de-responsabilidade", label: "Limitação de Responsabilidade" },
    { id: "alteracoes-nos-termos", label: "Alterações nos Termos" },
    { id: "disposicoes-gerais", label: "Disposições Gerais" },
  ],
  privacy: [
    { id: "coleta-de-dados", label: "Coleta de Dados" },
    { id: "uso-das-informacoes", label: "Uso das Informações" },
    { id: "protecao-de-dados", label: "Proteção de Dados" },
    { id: "compartilhamento-de-dados", label: "Compartilhamento de Dados" },
    { id: "cookies", label: "Cookies" },
    { id: "direitos-do-usuario", label: "Direitos do Usuário" },
    { id: "alteracoes-na politica", label: "Alterações na Política" },
  ],
  settings: [
    { id: "informacoes-basicas", label: "Informações Básicas" },
    { id: "endereco", label: "Endereço" },
    { id: "imagens", label: "Imagens" },
    { id: "privacidade", label: "Privacidade" },
    { id: "zona-de-perigo", label: "Zona de Perigo" },
  ],
};

export default function MenuAside({ type }: MenuAsideProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const menuItems = useMemo(() => menuOptions[type] || [], [type]);

  useEffect(() => {
    const handleScroll = () => {
      let closestSectionId: string | null = null;
      let closestDistance = Infinity;

      menuItems.forEach((item) => {
        const section = document.getElementById(item.id);
        if (section) {
          const rect = section.getBoundingClientRect();
          const distance = Math.abs(rect.top);

          if (rect.top <= 200 && distance < closestDistance) {
            closestDistance = distance;
            closestSectionId = item.id;
          }
        }
      });

      setActiveSection(closestSectionId);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuItems]);

  return (
    <aside className="hidden lg:block sticky top-6 h-fit">
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Menu</h3>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={`#${item.id}`}
              className={`block text-md px-3 py-2 rounded-md transition-all duration-300 ${activeSection === item.id
                ? "text-primary-dark bg-pink-100"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Card>
    </aside>
  );
}
