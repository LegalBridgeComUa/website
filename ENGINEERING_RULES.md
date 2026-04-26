ENGINEERING_RULES.md

# LegalBridge — Engineering Rules

## General Principle

This project must be built as a scalable product foundation, not as a one-off marketing site.

Every implementation decision should favor:
- reuse
- structure
- maintainability
- future bot compatibility
- future backend compatibility


## Do Not Hardcode Business Logic in UI

Never hardcode business logic directly inside components.

UI components should render data.
Business logic should live in shared domain structures.

Bad:
- hardcoded service definitions inside page components
- duplicated labels in multiple files
- pricing logic inside UI
- conditional service logic inside JSX

Good:
- shared typed config
- shared domain models
- reusable schemas
- reusable service content source


## Source of Truth Rules

Current temporary source:
- local typed snapshots in code

Current operational source:
- Google Sheets CRM

Future source:
- Supabase

Do not create parallel truth sources.

Avoid duplicating service logic in multiple places.


## Service Architecture Rules

Services and Service_Content are different things.

Never merge them.

Services:
- operational
- SKU-like
- internal logic
- variants
- turnaround
- pricing linkage

Service_Content:
- human-readable
- website
- bot
- SEO
- content rendering

UI must consume Service_Content.
Operational logic must consume Services.


## Shared Schema Rules

All intake flows must eventually map to shared schemas.

Website forms must not create website-only data structures.

Build everything so it can later be reused by:
- Telegram bot
- Viber bot
- API routes
- Supabase inserts


## Forms

Forms must be built as structured intake systems, not simple contact forms.

All forms must:
- be typed
- use shared models
- map to shared order payloads
- be future API compatible

Avoid “UI-only form logic” that cannot be reused later.


## Components

Keep components small and reusable.

Prefer:
- composable sections
- isolated UI blocks
- shared layout primitives
- reusable content-driven rendering

Avoid giant page files.


## Content

Do not hardcode content directly inside page files.

Service content must come from shared content sources.

This allows reuse across:
- homepage
- service pages
- forms
- bots
- SEO pages


## API Readiness

Even before API routes exist, code should be written as if API integration is next.

Forms, schemas, and data structures should be API-ready.


## Future Supabase Readiness

Do not design anything as Google Sheets-specific in frontend logic.

Google Sheets is temporary operational infrastructure.

Frontend should be built toward future Supabase compatibility.


## Naming Rules

Use explicit naming.

Prefer:
- serviceContent
- orderPayload
- intakeDetails
- serviceGroup
- customerType

Avoid vague names:
- data
- item
- thing
- info


## File Structure

Favor clean separation:

- components = UI
- lib = shared logic / content / schemas
- app = routes
- public = static assets

Do not mix domain logic into UI files.


## Styling

Use:
- clean Tailwind
- reusable patterns
- consistent spacing
- mobile-first layouts

Avoid:
- random one-off styles
- deeply nested class chaos
- inconsistent spacing systems


## Primary Engineering Goal

The goal is not to generate pages quickly.

The goal is to build a reusable legal-tech product foundation.