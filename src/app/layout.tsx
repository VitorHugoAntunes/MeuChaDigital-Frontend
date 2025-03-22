import type { Metadata } from "next";
import { Inter, Satisfy } from "next/font/google";
import "../styles/global.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { RedirectProvider } from "@/contexts/RedirectContext";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { PaymentProvider } from "@/contexts/PaymentContext";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const satisfy = Satisfy({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-satisfy",
});

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
    <html lang="pt-BR" className={`${inter.className + satisfy.className}`}>
      <body className="flex flex-col min-h-screen bg-background">
        <RedirectProvider>
          <ReactQueryProvider>
            <AuthProvider>
              <PaymentProvider>
                <Header />
                <div className="flex flex-1 w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                  {children}
                </div>
                <Footer />
              </PaymentProvider>
            </AuthProvider>
          </ReactQueryProvider>
        </RedirectProvider>
      </body>
    </html>
  );
}
