"use client";
import { createContext, useContext, ReactNode } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userAuthenticated, getUser } from "@/api/user";
import { logout } from "@/api/auth";

interface User {
  id: string;
  name: string;
  email: string;
  photo: {
    url: string;
  };
  isGuest: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  logoutUser: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const queryClient = useQueryClient();

  // Verifica se o usuário está autenticado
  const { data: authData } = useQuery({
    queryKey: ["auth"],
    queryFn: userAuthenticated,
    retry: false, // Não tenta refazer a requisição em caso de erro
    staleTime: 1000 * 60 * 30, // 30 minutos de stale time
  });

  // Busca os dados do usuário se estiver autenticado
  const { data: user } = useQuery({
    queryKey: ["user", authData?.id],
    queryFn: () => getUser(authData?.id),
    enabled: !!authData?.id, // Só executa se authData.id existir
    staleTime: 1000 * 60 * 30, // 30 minutos de stale time
  });

  // Mutation para logout
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // Limpa o cache do React Query ao fazer logout
      queryClient.removeQueries({ queryKey: ["auth"] });
      queryClient.removeQueries({ queryKey: ["user"] });
    },
  });

  const logoutUser = async () => {
    await logoutMutation.mutateAsync();
  };

  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        isAuthenticated: !!user,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}