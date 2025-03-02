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
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const {
    data: authData,
    isLoading: isAuthLoading,
    refetch: refetchAuth
  } = useQuery({
    queryKey: ["auth"],
    queryFn: userAuthenticated,
    retry: false,
    staleTime: 1000 * 60 * 30,
    enabled: false,
    onSuccess: (data) => {
      setIsAuthenticated(!!data?.id);
    },
    onError: () => {
      setIsAuthenticated(false);
    },
  });

  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ["user", authData?.id],
    queryFn: () => getUser(authData?.id),
    enabled: !!authData?.id,
    staleTime: 1000 * 60 * 30,
  });

  useEffect(() => {
    setIsLoading(isAuthLoading || isUserLoading);
  }, [isAuthLoading, isUserLoading]);

  useEffect(() => {
    refetchAuth();
  }, []);

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["auth"] });
      queryClient.removeQueries({ queryKey: ["user"] });
      queryClient.setQueryData(["auth"], null);
      queryClient.setQueryData(["user"], null);
      setIsAuthenticated(false);
      setIsLoading(false); // Garante que o loading seja false após logout
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
        isLoading,
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