"use client";

import { createContext, useState, useEffect, ReactNode, useContext } from "react";
import { userAuthenticated, getUser } from "@/api/user";
import { logout } from "@/api/auth";

interface User {
  id: string;
  name: string;
  email: string;
  photo: {
    url: string;
  }
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
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(true);

  useEffect(() => {
    if (!shouldFetch) return;

    userAuthenticated()
      .then((data) => {
        getUser(data.id).then((user) => {
          setUser(user);
          console.log(user);
          setIsAuthenticated(true);
        });
      })
      .catch(() => {
        setUser(null);
        setIsAuthenticated(false);
      })
      .finally(() => {
        setShouldFetch(false);
      });
  }, [shouldFetch]);

  const logoutUser = async () => {
    logout().then(() => {
      setUser(null);
      setIsAuthenticated(false);
    });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, logoutUser }}>
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
