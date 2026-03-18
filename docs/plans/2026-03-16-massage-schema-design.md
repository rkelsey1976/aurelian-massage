# Massage Studio Schema Design

## Goal
Expand the site's structured data beyond a generic `LocalBusiness` block so a local massage studio has stronger service, local trust, and page-level SEO signals.

## Approved Direction
Use a layered schema strategy instead of placing one generic schema block on every page.

## Recommended Schema Mix

### 1. Core business schema
Use one shared business entity as the base for the site.

- `LocalBusiness` as the baseline
- Prefer a more specific subtype if the final brand positioning supports it cleanly, such as a beauty/wellness-oriented local business type
- Include:
  - business name
  - address
  - phone
  - email
  - geo
  - hours
  - service area
  - social profiles
  - booking URL
  - price range

### 2. Service schema
Use `Service` schema for real treatment pages such as:

- Swedish massage
- deep tissue massage
- prenatal massage
- sports massage

Each service schema should connect back to the business entity and describe the real treatment offered.

### 3. Hyper-local schema
For future local landing pages such as `/services/[service]/[area]`, use:

- `Service`
- `BreadcrumbList`
- optional `WebPage`

This supports service-plus-location intent without turning the site into duplicate markup.

### 4. FAQ schema
Use `FAQPage` only on pages with visible FAQs that users can read on the page.

Good candidates:
- service pages
- contact page
- area pages

Avoid adding FAQ schema to pages that do not visibly contain those questions and answers.

### 5. Review schema
Use `Review` or `AggregateRating` only if the site actually renders legitimate review content or rating information.

Do not add rating schema just because it might help rankings.

### 6. Breadcrumb schema
Use `BreadcrumbList` on deeper pages:

- service pages
- area pages
- blog detail pages if desired later

## Page-by-Page Recommendation

### Homepage
- core business schema
- optional `WebPage`

### Services index
- keep it light for now
- optional `ItemList` later if the service catalog grows

### Individual service pages
- `Service`
- optional `FAQPage`
- optional `BreadcrumbList`

### Contact page
- business/contact-focused schema

### Hyper-local service pages
- `Service`
- `BreadcrumbList`
- optional `WebPage`

## Data Model Changes
The current shared config should grow to support massage-specific fields:

- booking URL
- price range
- list of treatment categories
- optional therapist or practitioner details later
- optional logo/image references

## Guardrails
- no fake reviews
- no fake FAQs
- no massive duplicate schema blocks repeated everywhere
- keep one canonical business entity reused across the site
- only add schema for visible content and real offerings

## Why This Works
For a local massage studio, the biggest SEO opportunities usually come from:

- treatment-specific service pages
- trust and local verification signals
- city or neighborhood relevance
- clear booking/contact information

This schema setup supports those goals while staying clean and maintainable.
