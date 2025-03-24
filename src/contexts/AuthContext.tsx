"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from "react";
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
  isLoading: boolean;
  logoutUser: () => void;
  isLoggingOut: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const queryClient = useQueryClient();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { data: authData, isFetching: isAuthFetching } = useQuery({
    queryKey: ["auth"],
    queryFn: userAuthenticated,
    retry: false,
    staleTime: 1000 * 60 * 30, // 30 minutos
    onSuccess: (data) => {
      setIsAuthenticated(!!data?.id);
    },
    onError: () => {
      setIsAuthenticated(false);
    },
  });

  const { data: user, isFetching: isUserFetching } = useQuery({
    queryKey: ["user", authData?.id],
    queryFn: () => getUser(authData?.id),
    enabled: !!authData?.id,
    staleTime: 1000 * 60 * 30, // 30 minutos
  });

  useEffect(() => {
    // Só consideramos loading enquanto estiver buscando os dados iniciais
    setIsLoading(isAuthFetching || (!!authData?.id && isUserFetching));
  }, [isAuthFetching, isUserFetching, authData]);

  useEffect(() => {
    if (!isLoading && isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [isLoading, isInitialLoad]);

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["auth"] });
      queryClient.removeQueries({ queryKey: ["user"] });
      setIsAuthenticated(false);
    },
  });

  const logoutUser = async () => {
    await logoutMutation.mutateAsync();
  };

  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        isAuthenticated,
        isLoading: isInitialLoad ? true : isLoading,
        logoutUser,
        isLoggingOut: logoutMutation.isLoading,
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