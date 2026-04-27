// Minimal GA4 helper for Next.js App Router
// Usage: import { pageview, event } from "@/lib/gtag";

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function pageview(url: string) {
  if (!GA_ID || typeof window === "undefined") return;
  window.gtag?.("event", "page_view", {
    page_path: url,
  });
}

export function event(
  name: string,
  params?: Record<string, any>
) {
  if (!GA_ID || typeof window === "undefined") return;
  window.gtag?.("event", name, params);
}
