"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Card from "@/components/Card";

const menuItems = [
  { id: "informacoes-basicas", label: "Informações Básicas" },
  { id: "imagens", label: "Imagens" },
  { id: "privacidade", label: "Privacidade" },
  { id: "zona-de-perigo", label: "Zona de Perigo" },
];

export default function MenuAside() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

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
  }, []);

  return (
    <aside className="sticky top-6 h-fit">
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
