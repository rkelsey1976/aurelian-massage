/**
 * Marketing / print / social builder pages — not for public search.
 * Used by `app/robots.ts` (Disallow) and `middleware.ts` (X-Robots-Tag).
 * When adding a route: extend this list **and** the literal `matcher` array in `middleware.ts`.
 * Each page should also set `metadata.robots = { index: false, follow: false }`.
 */
export const INTERNAL_ASSET_PATHS: readonly string[] = [
  "/marketing",
  "/business-card",
  "/business-card-builder",
  "/loyalty-card-builder",
  "/treatment-flyer",
  "/treatment-flyer-builder",
  "/facebook",
  "/facebook-builder",
  "/facebook-covers",
  "/facebook-cover-builder",
  "/google-business-cover-builder",
  "/google-business-photos-builder",
  "/instagram",
  "/logo-assets",
];
