# Hyper-Local Area Pages Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add data-driven hyper-local landing pages at `/services/[service]/[area]` with one shipped example service, reusable area data, local SEO metadata, schema support, and sitemap coverage.

**Architecture:** Introduce separate service and area data modules, then combine them through a small helper layer that generates route params, content, and metadata input. Build a dynamic App Router page on top of those helpers, link into it from the existing services page, and extend sitemap generation to include the new service-area URLs.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS, Vitest, existing metadata helpers, existing JSON-LD pattern

---

### Task 1: Add local route data helpers

**Files:**
- Create: `C:\Users\Rich\Desktop\ROSS\lib\services.ts`
- Create: `C:\Users\Rich\Desktop\ROSS\lib\areas.ts`
- Create: `C:\Users\Rich\Desktop\ROSS\lib\local-pages.ts`
- Test: `C:\Users\Rich\Desktop\ROSS\lib\local-pages.test.ts`

**Step 1: Write the failing test**

```typescript
import { describe, expect, it } from "vitest";

import {
  getLocalPageBySlugs,
  getLocalPageParams,
  getRelatedAreasForService,
} from "@/lib/local-pages";

describe("local page helpers", () => {
  it("returns route params for every shipped service-area page", () => {
    expect(getLocalPageParams()).toEqual([
      { service: "plumbing", area: "metro-city" },
      { service: "plumbing", area: "northside" },
      { service: "plumbing", area: "westfield" },
    ]);
  });

  it("returns service and area content for a known route", () => {
    const page = getLocalPageBySlugs("plumbing", "metro-city");

    expect(page?.service.name).toBe("Plumbing");
    expect(page?.area.city).toBe("Metro City");
  });

  it("returns sibling areas for internal linking", () => {
    expect(getRelatedAreasForService("plumbing", "metro-city")).toHaveLength(2);
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- lib/local-pages.test.ts`

Expected: FAIL with module-not-found errors for `@/lib/local-pages` or missing exported functions.

**Step 3: Write minimal implementation**

```typescript
// lib/services.ts
export const services = [
  {
    slug: "plumbing",
    name: "Plumbing",
    shortDescription: "A starter example service for local landing pages.",
  },
];

// lib/areas.ts
export const areas = [
  { slug: "metro-city", city: "Metro City", region: "CA" },
  { slug: "northside", city: "Northside", region: "CA" },
  { slug: "westfield", city: "Westfield", region: "CA" },
];

// lib/local-pages.ts
import { areas } from "@/lib/areas";
import { services } from "@/lib/services";

export function getLocalPageParams() {
  return areas.map((area) => ({ service: "plumbing", area: area.slug }));
}

export function getLocalPageBySlugs(serviceSlug: string, areaSlug: string) {
  const service = services.find((item) => item.slug === serviceSlug);
  const area = areas.find((item) => item.slug === areaSlug);

  if (!service || !area) {
    return undefined;
  }

  return { service, area };
}

export function getRelatedAreasForService(serviceSlug: string, areaSlug: string) {
  if (serviceSlug !== "plumbing") {
    return [];
  }

  return areas.filter((area) => area.slug !== areaSlug);
}
```

**Step 4: Run test to verify it passes**

Run: `npm test -- lib/local-pages.test.ts`

Expected: PASS with all helper tests green.

**Step 5: Commit**

```bash
git add lib/services.ts lib/areas.ts lib/local-pages.ts lib/local-pages.test.ts
git commit -m "feat: add local service-area data helpers"
```

If git is not initialized in this workspace, skip the commit step.

### Task 2: Add the dynamic local landing page

**Files:**
- Create: `C:\Users\Rich\Desktop\ROSS\app\services\[service]\[area]\page.tsx`
- Create: `C:\Users\Rich\Desktop\ROSS\components\seo\service-schema.tsx`
- Modify: `C:\Users\Rich\Desktop\ROSS\lib\seo.ts`
- Test: `C:\Users\Rich\Desktop\ROSS\lib\seo.test.ts`

**Step 1: Write the failing test**

```typescript
it("builds metadata for a service-area landing page", () => {
  const metadata = createPageMetadata({
    title: "Plumbing in Metro City, CA",
    description: "Trusted plumbing services in Metro City, CA.",
    path: "/services/plumbing/metro-city",
  });

  expect(metadata.alternates?.canonical).toBe(
    "https://www.starterlocalbusiness.com/services/plumbing/metro-city",
  );
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- lib/seo.test.ts`

Expected: FAIL because the new service-area case or related schema helper is not fully implemented yet.

**Step 3: Write minimal implementation**

```typescript
// app/services/[service]/[area]/page.tsx
export async function generateStaticParams() {
  return getLocalPageParams();
}

export async function generateMetadata({ params }) {
  const page = getLocalPageBySlugs(params.service, params.area);
  if (!page) notFound();

  return createPageMetadata({
    title: `${page.service.name} in ${page.area.city}, ${page.area.region}`,
    description: `Trusted ${page.service.name.toLowerCase()} services in ${page.area.city}, ${page.area.region}.`,
    path: `/services/${page.service.slug}/${page.area.slug}`,
  });
}
```

Also add a small schema component that outputs page-level JSON-LD for the service-area page using the existing business contact details plus the selected service and area.

**Step 4: Run test to verify it passes**

Run: `npm test -- lib/seo.test.ts`

Expected: PASS, including the new canonical URL assertion.

**Step 5: Commit**

```bash
git add app/services/[service]/[area]/page.tsx components/seo/service-schema.tsx lib/seo.ts lib/seo.test.ts
git commit -m "feat: add service-area landing page route"
```

If git is not initialized in this workspace, skip the commit step.

### Task 3: Link area pages into the site and sitemap

**Files:**
- Modify: `C:\Users\Rich\Desktop\ROSS\app\services\page.tsx`
- Modify: `C:\Users\Rich\Desktop\ROSS\app\sitemap.ts`
- Modify: `C:\Users\Rich\Desktop\ROSS\README.md`
- Test: `C:\Users\Rich\Desktop\ROSS\lib\local-pages.test.ts`

**Step 1: Write the failing test**

```typescript
it("includes local landing page URLs in sitemap data", () => {
  const params = getLocalPageParams();

  expect(params).toContainEqual({
    service: "plumbing",
    area: "metro-city",
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- lib/local-pages.test.ts`

Expected: FAIL until the final sitemap-supporting helper and shipped route set are stable.

**Step 3: Write minimal implementation**

```typescript
// app/services/page.tsx
// Add a "Local service areas" section linking to:
// /services/plumbing/metro-city
// /services/plumbing/northside
// /services/plumbing/westfield

// app/sitemap.ts
const localRoutes = getLocalPageParams().map((params) => ({
  url: getCanonicalUrl(`/services/${params.service}/${params.area}`),
  lastModified: new Date(),
}));

return [...staticRoutes, ...blogRoutes, ...localRoutes];
```

Update `README.md` so users know where to edit service and area data before launch.

**Step 4: Run test to verify it passes**

Run: `npm test -- lib/local-pages.test.ts`

Expected: PASS with the local route set locked in.

**Step 5: Commit**

```bash
git add app/services/page.tsx app/sitemap.ts README.md lib/local-pages.test.ts
git commit -m "feat: add hyper-local links and sitemap entries"
```

If git is not initialized in this workspace, skip the commit step.

### Task 4: Final verification

**Files:**
- Review: `C:\Users\Rich\Desktop\ROSS\app\services\[service]\[area]\page.tsx`
- Review: `C:\Users\Rich\Desktop\ROSS\app\sitemap.ts`
- Review: `C:\Users\Rich\Desktop\ROSS\README.md`

**Step 1: Run focused tests**

Run: `npm test -- lib/local-pages.test.ts lib/seo.test.ts`

Expected: PASS with all local route and metadata assertions green.

**Step 2: Run full verification**

Run: `npm test`

Expected: PASS

Run: `npm run lint`

Expected: PASS

Run: `npm run build`

Expected: PASS and show prerendered service-area routes under `/services/[service]/[area]`

**Step 3: Manual inspection**

Run: `npm run dev`

Check:
- `/services`
- `/services/plumbing/metro-city`
- `/services/plumbing/northside`
- `/sitemap.xml`

Confirm:
- page has unique `h1`
- metadata title and description include service and city
- page-level schema renders
- internal links between sibling areas work
- sitemap contains the new URLs

**Step 4: Commit**

```bash
git add .
git commit -m "feat: add hyper-local service area pages"
```

If git is not initialized in this workspace, skip the commit step.
