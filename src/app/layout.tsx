import type { Metadata } from "next";
import { Inter, Satisfy, Parisienne } from "next/font/google";
import "../styles/global.css";
import Providers from "@/providers/LayoutProviders";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const satisfy = Satisfy({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-satisfy",
  display: "swap",
});

const parisienne = Parisienne({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-parisienne",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://meuchadigital.com'),
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
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Meu Chá Digital",
    description: "Crie e compartilhe seu chá online de forma fácil, prática e personalizada. Adicione listas de presentes e organize tudo em um só lugar!",
    url: "https://meuchadigital.com",
    siteName: "Meu Chá Digital",
    images: [
      {
        url: "og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Meu Chá Digital - Organize seu chá de forma fácil",
      },
    ],
    locale: "pt-BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meu Chá Digital",
    description: "Crie e compartilhe seu chá online de forma fácil, prática e personalizada. Adicione listas de presentes e organize tudo em um só lugar!",
    images: ["/twitter-image.jpg"],
    creator: "@meuchadigital",
  },
  appleWebApp: {
    title: "Meu Chá Digital",
    statusBarStyle: "default",
    capable: true,
    startupImage: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${satisfy.variable} ${parisienne.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <style dangerouslySetInnerHTML={{
          __html: `
            body {
              opacity: 0;
              animation: fadeIn 0.5s ease-in forwards;
            }
            @keyframes fadeIn {
              to { opacity: 1; }
            }
            
            #global-loading {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              z-index: 9999;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: #fff;
              transition: opacity 300ms ease;
            }
            
            @keyframes spin {
              100% { transform: rotate(360deg); }
            }
          `
        }} />
      </head>
      <body className="flex flex-col min-h-screen bg-background">
        <div id="global-loading">
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                border: '4px solid #ec4899',
                borderTopColor: 'transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto'
              }}
            ></div>
          </div>
        </div>

        <script dangerouslySetInnerHTML={{
          __html: `
            if (typeof window !== 'undefined' && document.readyState === 'complete') {
              const loadingElement = document.getElementById('global-loading');
              if (loadingElement) loadingElement.remove();
            }

            document.addEventListener('DOMContentLoaded', () => {
              const loadingElement = document.getElementById('global-loading');
              if (loadingElement) {
                loadingElement.style.opacity = '0';
                setTimeout(() => loadingElement.remove(), 300);
              }
            });
          `
        }} />

        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}