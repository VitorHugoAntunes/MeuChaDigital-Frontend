"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getGiftListBySlug } from "@/api/giftLists";

const RedirectContext = createContext<any>(null);

export const RedirectProvider = ({ children }: any) => {
  const router = useRouter();
  const [listData, setListData] = useState<{ redirect?: string } | null>(null);
  const slug = useParams().list as string;

  // Captura o subdomínio no frontend
  const getSubdomain = () => {
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname; // Exemplo: "teste.localhost"
      const parts = hostname.split(".");
      if (parts.length >= 2 && parts[1] === "localhost") {
        return parts[0]; // Retorna "teste" em "teste.localhost"
      }
    }
    return null;
  };

  const subdomain = getSubdomain();

  // Função assíncrona para buscar a lista
  const getGiftList = async () => {
    const data = await getGiftListBySlug(slug as string);
    setListData(data);
  };

  useEffect(() => {
    console.log("Executando getGiftList");

    if (slug) {
      getGiftList();
    }
  }, [slug]);

  useEffect(() => {
    if (listData?.redirect) {
      if (subdomain) {
        // Redirecionamento baseado no subdomínio
        const redirectUrl = `http://${listData.redirect}.localhost:3000/invitation`;
        console.log("Redirecionando para:", redirectUrl);
        window.location.href = redirectUrl;
      } else {
        // Redirecionamento baseado no slug
        console.log("Redirecionando para:", listData.redirect);
        router.replace(`/lists/${listData.redirect}/gifts`);
      }
    }
  }, [listData, router, subdomain]);

  return (
    <RedirectContext.Provider value={listData}>
      {children}
    </RedirectContext.Provider>
  );
};

export const useRedirect = () => useContext(RedirectContext);
