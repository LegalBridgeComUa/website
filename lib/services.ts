/**
 * @deprecated Use lib/service-content.ts instead
 * This file is kept for backward compatibility
 */
import { serviceContent } from "./service-content";

interface LegacyService {
  id: string;
  title: string;
  text: string;
}

// Re-export in legacy shape for backward compatibility
export const services: LegacyService[] = serviceContent.map((s) => ({
  id: s.contentId,
  title: s.title,
  text: s.shortDescription,
}));