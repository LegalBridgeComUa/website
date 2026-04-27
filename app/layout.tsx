import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geist = Geist({
  subsets: ["latin"],
});


export const metadata: Metadata = {
  metadataBase: new URL("https://legalbridge.com.ua"),
  title: {
    default: "LegalBridge — Міст між вами та Україною",
    template: "%s | LegalBridge",
  },
  description:
    "Допомагаємо українцям за кордоном дистанційно вирішувати документальні, адміністративні та юридичні питання в Україні.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: "https://legalbridge.com.ua",
    siteName: "LegalBridge",
    title: "LegalBridge — Міст між вами та Україною",
    description:
      "Допомагаємо українцям за кордоном дистанційно вирішувати документальні, адміністративні та юридичні питання в Україні.",
  },
  twitter: {
    card: "summary_large_image",
    title: "LegalBridge — Міст між вами та Україною",
    description:
      "Допомагаємо українцям за кордоном дистанційно вирішувати документальні, адміністративні та юридичні питання в Україні.",
  },
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