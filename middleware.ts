import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { INTERNAL_ASSET_PATHS } from "@/lib/internal-asset-paths";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const blocked = INTERNAL_ASSET_PATHS.some((p) => path === p || path.startsWith(`${p}/`));
  if (!blocked) {
    return NextResponse.next();
  }
  const res = NextResponse.next();
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  return res;
}

// Keep paths in sync with `lib/internal-asset-paths.ts` (Next only accepts literal matchers here).
export const config = {
  matcher: [
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
  ],
};
