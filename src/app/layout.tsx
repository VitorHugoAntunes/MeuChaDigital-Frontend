import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/global.css";
import Header from "@/components/Header";

const inter = Inter(
  {
    subsets: ["latin"],
    weight: ['400', '500', '600', '700'],
    variable: "--font-inter"
  }
);

export const metadata: Metadata = {
  title: "Meu Chá Digital",
  description: "Site de chás digitais",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.className} bg-background`}>
      <body>
        <Header />
        <div className="w-full max-w-screen-xl mx-auto px-8">
          {children}
        </div>
      </body>
    </html>
  );
}
