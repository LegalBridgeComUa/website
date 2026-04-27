import { MetadataRoute } from "next";
import { getActiveServices } from "@/lib/service-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://legalbridge.com.ua";
  const now = new Date().toISOString();

  const staticRoutes = [
    { url: `${baseUrl}/`, lastModified: now },
    { url: `${baseUrl}/services`, lastModified: now },
    { url: `${baseUrl}/submit-request`, lastModified: now },
  ];

  const dynamicRoutes = getActiveServices().map((service) => ({
    url: `${baseUrl}/services/${service.contentId}`,
    lastModified: now,
  }));

  return [
    ...staticRoutes,
    ...dynamicRoutes,
  ];
}
