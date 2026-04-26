PROJECT_CONTEXT.md

# LegalBridge — Project Context

## Product Overview

LegalBridge is a service platform for Ukrainians living abroad who need legal, documentary, and administrative support in Ukraine.

The business acts as a legal and operational bridge between Ukrainians abroad and Ukrainian institutions.

Core business areas include:
- criminal record certificates
- apostille services
- civil registry documents
- education document legalization
- driver / TSC documents
- certified translations
- legal document support for use abroad

The service has operated for more than 10 years in private / referral / B2B mode and is now being transformed into a structured digital product.

This project is the public digital layer of that business.

It includes:
- website
- intake forms
- service pages
- future Telegram bot
- future Viber bot
- future automation flows
- future Supabase backend


## Core Business Model

LegalBridge is not just a marketing website.

It is the public interface of an operational legal-tech service system.

This means the website must eventually work as:
- service presentation layer
- lead intake layer
- structured order intake
- CRM feeder
- future bot-compatible interface

The website, bots, and CRM must share the same business logic.


## Core System Architecture

Current phase:

Website / Bots / Manual Intake
            ↓
         Orders
            ↓
Customers / Services / Pricing
            ↓
    Operations / Fulfillment

Future phase:

Website / Telegram / Viber / WhatsApp
                ↓
            Supabase
                ↓
     Google Sheets (operational view)
                ↓
      Dashboard / Automation / Docs


## Source of Truth

Current source of truth:
- Google Sheets CRM

Future source of truth:
- Supabase

The website currently uses local typed content snapshots derived from CRM data.

This is temporary.

Target flow:
Google Sheets → Supabase → Website / Bots


## Current Website Role

The website is currently responsible for:
- presenting services
- collecting structured leads
- routing users into CRM
- reusing shared service content
- preparing future shared bot logic

It is NOT just a landing page.

It is the first production layer of a larger operational platform.


## Shared Business Logic Principle

The same service logic must be reusable across:
- website
- Telegram bot
- Viber bot
- future API
- CRM automations

Do not create website-only business logic.

Everything should be reusable as shared domain logic.


## Service Model

There are two service layers:

1. Services
Operational service matrix (internal SKU / variants / turnaround / logic)

2. Service_Content
Human-readable service content (website / bot / SEO content layer)

These layers must remain separate.

Never merge operational SKU logic with content logic.


## Orders Model

All intake channels must eventually create the same order object.

Order sources include:
- website_form
- telegram_bot
- viber_bot
- website_manual
- telegram_manual
- viber_manual
- whatsapp_manual
- instagram_manual

Every intake channel must map into the same shared order model.


## Current Product Priorities

Current priority order:

1. stable website structure
2. reusable service content
3. structured form intake
4. shared schemas
5. future Supabase integration
6. future bot reuse


## Design Direction

Visual style:
- premium minimal
- legal-tech
- clean
- high trust
- warm neutral palette
- mobile-first
- calm and professional

Brand positioning:
LegalBridge is a premium trusted legal/document service, not a generic document bureau.


## Engineering Priority

Primary goal is not speed of shipping.

Primary goal is:
- correct architecture
- reusable business logic
- scalable shared structure
- future-proof schemas

Avoid short-term hacks that create future migration cost.