# Hyper-Local Area Pages Design

## Goal
Add hyper-local landing pages to the starter so it can target service-plus-city search intent with reusable routes such as `/services/[service]/[area]`.

## Approved Direction
- Use dynamic service-area routes at `/services/[service]/[area]`
- Ship one example service first
- Structure the feature so more services can be added later without changing the route model
- Keep the system data-driven rather than hard-coding city pages

## Why This Direction
This gives the starter a stronger local SEO foundation than a single generic area page while avoiding the complexity of shipping both generic area pages and service-specific city pages at once. It also makes the starter more useful for real local businesses, since service plus location pages are often the highest-intent landing pages.

## Route Design
- Parent page remains: `/services`
- New dynamic route: `/services/[service]/[area]`
- Initial shipped examples:
  - `/services/<example-service>/metro-city`
  - `/services/<example-service>/northside`
  - `/services/<example-service>/westfield`

## Data Model
Split local landing page content into separate data modules:

### `lib/services.ts`
Store service-specific data:
- `slug`
- `name`
- `shortDescription`
- `heroTitleTemplate`
- `metaDescriptionTemplate`
- `benefits`
- `faqItems`
- optional proof/process content

### `lib/areas.ts`
Store area-specific data:
- `slug`
- `city`
- `region`
- `summary`
- `nearbyNeighborhoods`
- optional landmarks or service notes

### `lib/local-pages.ts`
Combine service and area data:
- lookup by service slug and area slug
- build page title and meta description
- build related route URLs
- provide static params for route generation

## Page Content Structure
Each local landing page should include:
- a unique `h1` such as `Starter Plumbing in Metro City, CA`
- a local intro paragraph tied to the city
- service overview and benefits
- service process or trust section
- local FAQ entries
- service area/contact section using existing shared business data
- related links to the parent `/services` page and sibling area pages

## SEO Design
- generate route metadata per service-area combination
- set canonical URLs from the existing shared helper
- use a unique title and description per area page
- include the pages in `app/sitemap.ts`
- link into area pages from `app/services/page.tsx`

## Schema Design
Keep the existing sitewide `LocalBusiness` JSON-LD in place. Add a page-level schema block for local landing pages using the shared business data plus page context, likely one of:
- `Service`
- `WebPage` with service/location-aware fields

The page-level schema should reference:
- service name
- area name
- canonical URL
- business contact details

## Testing Strategy
- add unit tests for local page helper functions
- test static params generation for service-area routes
- test metadata helper output for a sample service-area page
- keep existing lint/build verification

## Out Of Scope
- generic `/areas/[area]` pages
- dozens of starter services
- location-specific testimonials or reviews
- CMS integration

## Files Likely To Change
- `lib/site-config.ts`
- `lib/seo.ts`
- `app/services/page.tsx`
- `app/sitemap.ts`
- `README.md`

## Files Likely To Be Added
- `lib/services.ts`
- `lib/areas.ts`
- `lib/local-pages.ts`
- `lib/local-pages.test.ts`
- `app/services/[service]/[area]/page.tsx`
- `components/seo/service-schema.tsx`
