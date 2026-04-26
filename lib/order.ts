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
  serviceId: string;
  subjectFullName: string;
  note?: string;
  source: OrderSource;
};