import type { Metadata } from "next";
import { Roboto, Saira_Stencil_One, Figtree } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";



const figtree = Figtree({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-figtree'
});

const roboto = Roboto({
  weight: ['100', '200', '300', '400', '500'],
  subsets: ['latin'],
  variable: '--font-roboto'
})
export const saira = Saira_Stencil_One({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-saira'
})

export const metadata: Metadata = {
  title: "Deadlock tracker",
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
      <body className={`${figtree.className} bg-[url('/bodybg.png')] bg-contain bg-scroll  bg-no-repeat`}>
        <div className="w-full max-w-7xl min-h-400 m-auto overflow-clip">

          <Navbar />
          {children}

        </div>


      </body>
    </html>
  );
}



