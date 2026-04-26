import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LegalBridge",
  description:
    "LegalBridge — юридичні та документальні питання в Україні без вашої присутності",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={geist.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}