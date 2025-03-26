"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getGiftListBySlug } from "@/api/giftLists";

const RedirectContext = createContext<any>(null);

export const RedirectProvider = ({ children }: any) => {
  const router = useRouter();
  const [listData, setListData] = useState<{ redirect?: string } | null>(null);
  const slug = useParams().list as string;

  const getSubdomain = () => {
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      const parts = hostname.split(".");
      if (parts.length >= 2 && parts[1] === "localhost" || parts[1] === "meuchadigital") {
        return parts[0];
      }
    }
    return null;
  };

  const subdomain = getSubdomain();
  const identifier = slug || subdomain;

  useEffect(() => {
    if (!identifier) return;

    const getGiftList = async () => {
      console.log("Buscando lista para:", identifier);
      const data = await getGiftListBySlug(identifier as string, true);
      setListData(data);
    };

    getGiftList();
  }, [identifier]);

  useEffect(() => {
    if (listData?.redirect) {
      const redirectUrl = subdomain
        ? `http://${listData.redirect}.localhost:3000/invitation`
        : `/lists/${listData.redirect}/gifts`;

      console.log("Redirecionando para:", redirectUrl);
      router.replace(redirectUrl);
    }
  }, [listData, router, subdomain]);

  return (
    <RedirectContext.Provider value={listData}>
      {children}
    </RedirectContext.Provider>
  );
};

export const useRedirect = () => useContext(RedirectContext);
