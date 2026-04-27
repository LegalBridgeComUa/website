
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnalyticsPageView from "@/components/AnalyticsPageView";
import { GA_ID, pageview } from "@/lib/gtag";

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
        {GA_ID && (
          <>
            <Script
              id="ga4-script"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-inline" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
        <Header />
        <AnalyticsPageView />
        {children}
        <Footer />
      </body>
    </html>
  );
}