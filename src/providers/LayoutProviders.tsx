'use client';

import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { RedirectProvider } from "@/contexts/RedirectContext";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { PaymentProvider } from "@/contexts/PaymentContext";
import AuthWrapper from "@/components/AuthWrapper";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { UserPaymentProvider } from "@/contexts/UserPaymentContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <RedirectProvider>
        <ReactQueryProvider>
          <AuthProvider>
            <UserPaymentProvider>
              <PaymentProvider>
                <Header />
                <div className="flex flex-1 w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                  <AuthWrapper>{children}</AuthWrapper>
                </div>
                <Footer />
              </PaymentProvider>
            </UserPaymentProvider>
          </AuthProvider>
        </ReactQueryProvider>
      </RedirectProvider>
    </ThemeProvider>
  );
}