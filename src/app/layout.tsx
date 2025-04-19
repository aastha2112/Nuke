export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WixClientContextProvider } from "@/context/wixContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import InitVisitor from "@/components/ui/InitVisitor";
import Preloader from "@/components/ui/Preloader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nuke E-Commerce Application",
  description: "A complete e-commerce application with Next.js and Wix",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Preloader />
        <InitVisitor />
        <WixClientContextProvider>
          <Navbar />
          {children}
          <Footer />
        </WixClientContextProvider>
      </body>
    </html>
  );
}
