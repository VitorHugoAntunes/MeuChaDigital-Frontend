import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/global.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

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
    <html lang="pt-BR" className={`${inter.className}`}>
      <body className="flex flex-col min-h-screen bg-background">
        <ReactQueryProvider>
          <AuthProvider>
            <Header />
            <div className="flex flex-1 w-full max-w-screen-xl mx-auto px-8">
              {children}
            </div>
            <Footer />
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
