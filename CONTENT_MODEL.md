# LegalBridge — Content Model

## Purpose

This document describes the reusable content model for LegalBridge services.

The goal is to keep service content structured, reusable, and independent from UI components.

Service content should be usable across:
- homepage cards
- service listing pages
- service detail pages
- submit request form
- Telegram bot
- Viber bot
- future API responses
- SEO pages

---

## Core Principle

Do not hardcode service descriptions directly inside page components.

All service-related content must come from a shared content source.

Current temporary implementation:
- local TypeScript content files

Future implementation:
- Supabase content tables

---

## Service Content vs Services

LegalBridge uses two separate layers:

### 1. Services

Operational service matrix.

Used for:
- CRM logic
- pricing
- service variants
- turnaround
- internal order processing

Example:
- ua_std_ap
- ua_urg_ap_tr_sk
- civ_dup_ap_tr_sk

### 2. Service_Content

Human-readable content layer.

Used for:
- website
- bots
- SEO
- service explanation

Example:
- ua_clearance
- civil_registry
- translation

Never merge these two layers.

---

## Service_Content Fields

### Content_ID

Unique content identifier.

Example:
ua_clearance

---

### Service_Group

Connects content to operational services.

Example:
ua_clearance

---

### Title

Human-readable service title.

Example:
Довідка про несудимість

---

### Short_Description

Short text used for:
- homepage cards
- service previews
- quick bot replies

Should be 1–2 sentences.

---

### Long_Description

Detailed service description used for:
- service detail page
- SEO
- bot explanation

Should explain:
- what the service is
- what LegalBridge does
- when it is useful
- any important operational nuances

---

### Who_It_Is_For

Explains who needs the service.

Used for:
- service detail page
- client qualification
- bot flow

---

### Required_Documents

Structured human-readable list of required documents and details.

Can include:
- documents
- scans / photos
- additional text information
- conditional requirements

This content may contain multiline text.

---

### Turnaround_Text

Human-readable service timing.

Example:
У середньому від 2 до 20 робочих днів залежно від типу оформлення, апостилю та перекладу.

---

### Result_Text

What the client receives.

Example:
Готовий документ в електронному вигляді або оригінал документа для подальшого використання за кордоном.

---

### FAQ_JSON

Future FAQ field.

Can be empty at MVP stage.

Later may contain structured FAQ data.

---

### SEO_Title

SEO title for the service page.

---

### SEO_Description

SEO meta description for the service page.

---

### Active

Controls whether the service content is visible.

---

## Example Service Content

### ua_clearance

Content_ID:
ua_clearance

Service_Group:
ua_clearance

Title:
Довідка про несудимість

Short_Description:
Оформлення довідки про несудимість в Україні з апостилем, перекладом або без — дистанційно, без особистої присутності.

Long_Description:
Допомагаємо оформити довідку про несудимість в Україні для подання за кордоном. Послуга доступна у стандартному та терміновому форматі, з можливістю апостилю, перекладу та підготовки документа для використання в інших країнах. За потреби підбираємо відповідний формат витягу (повний або скорочений) та враховуємо мету його подання.

Who_It_Is_For:
Для українців за кордоном, яким потрібна довідка про несудимість для ВНЖ, працевлаштування, громадянства, навчання або інших офіційних процедур.

Required_Documents:
- фото / скан внутрішнього паспорта:
  • для паспорта-книжечки — 1 сторінка, 2 сторінка та сторінка з реєстрацією місця проживання
  • для ID-картки — лицьова сторона, зворотна сторона та довідка / витяг про реєстрацію місця проживання
- ІПН (за наявності)
- дані про попередні прізвища (за наявності)
- країна та мета подання документа
- фото / скан першої сторінки закордонного паспорта (у разі необхідності перекладу — для коректної транслітерації ПІБ)

Turnaround_Text:
У середньому від 2 до 20 робочих днів залежно від типу оформлення, апостилю та перекладу.

Result_Text:
Готова довідка про несудимість в електронному вигляді або оригінал документа для подальшого використання за кордоном.

SEO_Title:
Довідка про несудимість в Україні | LegalBridge

SEO_Description:
Оформлення довідки про несудимість в Україні дистанційно: апостиль, переклад, термінове отримання.

Active:
true

---

## Rendering Rules

Website should use Service_Content for:
- homepage service cards
- services overview
- service detail pages
- submit request descriptions
- FAQ sections

Bots should use Service_Content for:
- explaining services
- requesting required documents
- showing expected turnaround
- answering basic questions

---

## Implementation Notes

For now, service content can be stored in TypeScript files.

Recommended temporary file:
src/lib/service-content.ts

Future migration target:
Supabase table: service_content

Do not duplicate the same service content in multiple components.