# LegalBridge Website

LegalBridge is a service platform for Ukrainians living abroad who need legal, documentary, and administrative support in Ukraine.

The website is the public digital layer of the LegalBridge operational system.

It is not only a marketing website.

It is designed as the first layer of a larger product that will later include:
- structured website intake
- Telegram bot
- Viber bot
- Supabase backend
- Google Sheets operational view
- document upload and processing
- SmartDoc module

---

## Product Positioning

LegalBridge helps Ukrainians abroad solve legal and documentary issues in Ukraine remotely.

Core positioning:

Ви за кордоном — ми діємо в Україні.

The service acts as a bridge between Ukrainians abroad and Ukrainian institutions.

---

## Current Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Vercel
- GitHub

Planned:
- Supabase
- Google Sheets sync
- Telegram bot
- Viber bot
- SmartDoc document processing

---

## Project Structure

Current structure:

- src/app = Next.js routes
- src/components = reusable UI components
- src/lib = shared content, types, schemas and business logic
- public = static assets

Important project guidance files:

- PROJECT_CONTEXT.md
- ENGINEERING_RULES.md
- CONTENT_MODEL.md
- DATA_MODEL.md
- README.md

---

## Current Pages

### Homepage

Route:

/

Purpose:
- explain positioning
- show trust
- present service areas
- lead user to submit request

### Submit Request Page

Route:

/submit-request

Purpose:
- collect structured client request
- prepare shared order payload
- later submit to backend / Supabase / CRM

---

## Current Components

Reusable components:

- Header
- Footer

These should remain shared layout components and must not be duplicated inside pages.

---

## Current Shared Models

### OrderPayload

Located in:

src/lib/order.ts

Purpose:
Shared intake payload for website, bots and future API.

Expected fields:
- customerName
- phone
- serviceId
- subjectFullName
- note
- source

Source values include:
- website_form
- telegram_bot
- viber_bot
- website_manual
- telegram_manual
- viber_manual
- whatsapp_manual
- instagram_manual

---

## Service Content

Service content must not be hardcoded directly inside page components.

Temporary local source:

src/lib/services.ts

Future target:

Supabase service_content table

Service content is intended to be reused across:
- homepage
- services pages
- submit form
- Telegram bot
- Viber bot
- SEO pages

---

## Development Commands

Install dependencies:

npm install

Run local development server:

npm run dev

Build project:

npm run build

Run lint:

npm run lint

---

## Local Development

Default local URL:

http://localhost:3000

Submit request page:

http://localhost:3000/submit-request

---

## Design Direction

Style:
- premium minimal
- legal-tech
- calm
- trustworthy
- mobile-first
- warm neutral color palette

Brand tone:
- professional
- clear
- reliable
- human
- not overly corporate

---

## Current Architecture

Current phase:

Website
   ↓
Shared local models / content
   ↓
Manual Google Sheets CRM

Next phase:

Website / Bots
       ↓
    Supabase
       ↓
Google Sheets operational view

---

## Development Principles

Do not hardcode business logic inside UI components.

Do not duplicate service content across pages.

Do not build website-only order logic.

All intake flows must eventually map to shared order logic.

Build toward:
- shared schemas
- reusable content
- Supabase compatibility
- bot compatibility

---

## Next Planned Development Steps

1. Refactor service content into richer structured model
2. Build services overview page
3. Build service detail pages
4. Improve submit request form
5. Add file upload UI
6. Prepare Supabase schema
7. Connect website form to backend
8. Add Google Sheets sync
9. Prepare bot-compatible order intake
10. Add SmartDoc processing module