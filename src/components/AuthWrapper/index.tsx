"use client";

import { useAuth } from "@/contexts/AuthContext";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const pathName = usePathname();
  const currentUrl = pathName?.split("?")[0] || "";
  const [isLocalLoading, setIsLocalLoading] = useState(true);
  const [shouldBlockRender, setShouldBlockRender] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      setIsLocalLoading(false);
      // Adiciona um pequeno delay para garantir que tudo está carregado
      const timer = setTimeout(() => {
        setShouldBlockRender(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (isLoading || isLocalLoading || shouldBlockRender) {
    return (
      <LoadingSpinner />
    );
  }

  const isProtectedRoute =
    currentUrl.startsWith("/lists") ||
    currentUrl.startsWith("/profile");

  if (!isAuthenticated && isProtectedRoute) {
    return (
      <main className="flex flex-col flex-1 w-screen my-8 justify-center items-center">
        <h1 className="text-2xl font-semibold text-text-primary">Você não está logado ainda.</h1>
        <div className="flex mt-8">
          <Link href="/sign-in">
            <Button variant="default">Faça login para continuar</Button>
          </Link>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}