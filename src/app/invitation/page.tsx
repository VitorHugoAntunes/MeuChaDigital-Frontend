import { Metadata } from "next";
import InvitationPageWrapper from "./InvitationWrapper";
import { headers } from 'next/headers';
import axios from '@/config/axios';

interface InvitationData {
  name?: string;
  description?: string;
  data?: {
    banner?: {
      url?: string;
    };
  };
}

const getInvitationData = async (): Promise<InvitationData> => {
  const headersList = headers();
  const host = (await headersList).get('host') || '';

  const subdomain = host.split('.')[0];

  console.log('Host:', host);
  console.log('Subdomínio:', subdomain);

  try {
    const response = await axios.get('/invitation', {
      params: {
        subdomain
      },
      withCredentials: true
    });

    return response.data.data;
  } catch (error) {
    console.error('Error fetching invitation data:', error);
    return {};
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const invitationData = await getInvitationData();

  return {
    title: invitationData.name,
    description: invitationData.description,
    icons: {
      icon: [
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
      ],
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
    openGraph: {
      title: invitationData.name,
      description: invitationData.description,
      url: "https://meuchadigital.com",
      siteName: "Meu Chá Digital",
      images: [
        {
          url: invitationData.data?.banner?.url || '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: invitationData.name || 'Meu Chá Digital - Organize seu chá de forma fácil',
        },
      ],
      locale: "pt-BR",
      type: "website",
    },
    robots: {
      follow: true,
    },
    twitter: {
      card: "summary_large_image",
      title: invitationData.name,
      description: invitationData.description,
      images: [invitationData.data?.banner?.url || '/twitter-image.jpg'],
      creator: "@meuchadigital",
    },
    appleWebApp: {
      title: invitationData.name,
      statusBarStyle: "default",
      capable: true,
      startupImage: "/apple-touch-icon.png",
    },
    publisher: "Meu Chá Digital",
    creator: "Meu Chá Digital",
    applicationName: "Meu Chá Digital",
    alternates: {
      canonical: "https://meuchadigital.com",
      languages: {
        "pt-BR": "/pt-BR",
        "en-US": "/en-US",
      },
    },
  };
}

export default function InvitationPage() {
  return (
    <InvitationPageWrapper />
  );
}