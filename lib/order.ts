export type OrderSource =
  | "website_form"
  | "telegram_bot"
  | "viber_bot"
  | "website_manual"
  | "telegram_manual"
  | "viber_manual"
  | "whatsapp_manual"
  | "instagram_manual";

export type OrderPayload = {
  customerName: string;
  phone: string;

  serviceGroup: string;
  serviceId: string;

  subjectFullName: string;
  intakeDetails?: string;
  note?: string;

  urgency?: "normal" | "urgent";
  apostille?: "yes" | "no";
  translation?: "none" | "sk" | "cz";

  extractType?: "full" | "short";
  civilRegistryType?: "duplicate" | "extract" | "apostille_only";
  educationType?: "standard" | "urgent" | "institution_certificate";
  translationType?: "clearance_sk" | "certificate_sk" | "clearance_cz";
  purposeCode?: string;

  source: OrderSource;
};