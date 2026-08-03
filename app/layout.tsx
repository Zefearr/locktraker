import type { Metadata } from "next";
import { Saira_Stencil_One, Figtree } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import CookieBanner from "@/components/CookieBanner";
import { Analytics } from '@vercel/analytics/react';



const figtree = Figtree({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-figtree'
});


export const saira = Saira_Stencil_One({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-saira'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://statdl.eu'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  openGraph: {
    images: '/lined_paper.png',
  },
  title: "Deadlock statistics",
  description: "Tier list, builds, items, guides and lore"
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full
      antialiased"
    >
      <body className={`${figtree.className} relative min-h-screen flex flex-col`}>
        <Navbar />
        <div className="bg-[url('/mainBg2.webp')] w-full h-78 fixed top-0 -z-10"></div>
        <main className="w-full max-w-7xl mx-auto overflow-visible flex-1">
          {children}
          <CookieBanner />
          <Analytics />

        </main>

        <SiteFooter />
      </body>
    </html>
  );
}



