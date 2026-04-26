/**
 * Icon Map for LegalBridge
 * 
 * Maps service content icon keys to Lucide React components.
 * This keeps UI icon rendering separate from business content.
 */

import {
  FileText,
  BadgeCheck,
  Building2,
  GraduationCap,
  Car,
  Languages,
  type LucideIcon,
} from "lucide-react";

/** Map of icon keys to Lucide components */
export const iconMap: Record<string, LucideIcon> = {
  FileText,
  BadgeCheck,
  Building2,
  GraduationCap,
  Car,
  Languages,
};

/**
 * Get icon component by key
 * Returns a default icon if key not found
 */
export function getIcon(iconKey: string): LucideIcon {
  return iconMap[iconKey] || FileText;
}