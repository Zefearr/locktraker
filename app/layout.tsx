import type { Metadata } from "next";
import { Roboto, Funnel_Sans, Saira_Stencil_One } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const funnelSans = Funnel_Sans({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-funnel'
});

const roboto = Roboto({
  weight: ['100', '200', '300', '400', '500'],
  subsets: ['latin'],
  variable: '--font-roboto'
})
const saira = Saira_Stencil_One({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-roboto'
})

export const metadata: Metadata = {
  title: "Deadlock tracker",
  description: "Find player information",
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
      <body className={`${saira.className} bg-deadlock-dark`}>
        <div className="w-full max-w-8/10 min-h-400 m-auto rounded-3xl ">

          <Navbar />
          {children}

        </div>


      </body>
    </html>
  );
}



