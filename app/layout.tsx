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
      <body className={`${figtree.className} bg-[url('/bodybg.png')] bg-contain bg-fixed bg-no-repeat`}>
        <Navbar />
        <div className="w-full max-w-7xl m-auto overflow-visible">


          {children}
          <CookieBanner />
          <Analytics />

        </div>

        <SiteFooter />
      </body>
    </html>
  );
}



