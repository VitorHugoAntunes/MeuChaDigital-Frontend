import type { Metadata } from "next";
import { Inter, Satisfy, Parisienne } from "next/font/google";
import "../styles/global.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { RedirectProvider } from "@/contexts/RedirectContext";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { PaymentProvider } from "@/contexts/PaymentContext";
import AuthWrapper from "@/components/AuthWrapper";
import { ThemeProvider } from "@/contexts/ThemeContext";

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

const parisienne = Parisienne({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-parisienne",
});

export const metadata: Metadata = {
  title: "Meu Chá Digital",
  description: "Crie e compartilhe seu chá online de forma fácil, prática e personalizada. Adicione listas de presentes e organize tudo em um só lugar!",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.className + satisfy.className + parisienne.className}`}>
      <body className="flex flex-col min-h-screen bg-background">
        <ThemeProvider>
          <RedirectProvider>
            <ReactQueryProvider>
              <AuthProvider>
                <PaymentProvider>
                  <Header />
                  <div className="flex flex-1 w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AuthWrapper>{children}</AuthWrapper>
                  </div>
                  <Footer />
                </PaymentProvider>
              </AuthProvider>
            </ReactQueryProvider>
          </RedirectProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
