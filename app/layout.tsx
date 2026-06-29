import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: siteConfig.name + " | Tecnologia e Engenharia em Wood Frame",
  description: siteConfig.description,
  keywords: ["Wood Frame", "Construção Sustentável", "Porto Seguro", "Trancoso", "Alto Padrão", "Engenharia"],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteConfig.url,
    title: siteConfig.name + " | Tecnologia e Engenharia em Wood Frame",
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name + " - Arquitetura de Alto Padrão",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name + " | Tecnologia e Engenharia em Wood Frame",
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ConstructionBusiness",
    "name": siteConfig.name,
    "image": `${siteConfig.url}/images/logo.png`,
    "description": siteConfig.description,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Porto Seguro",
      "addressRegion": "BA",
      "addressCountry": "BR"
    },
    "telephone": siteConfig.contact.phone,
    "url": siteConfig.url
  };

  return (
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased min-h-screen bg-white text-stone-900`}>
        {children}
      </body>
    </html>
  );
}
