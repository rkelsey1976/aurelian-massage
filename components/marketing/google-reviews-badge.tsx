import { Star } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

/** "5.0 ★★★★★ · 65 Google reviews" badge — mirrors the live Google Business Profile listing. */
export function GoogleReviewsBadge({ className = "" }: { className?: string }) {
  const { ratingValue, reviewCount } = siteConfig.reviews;

  return (
    <div
      className={`inline-flex items-center gap-2.5 rounded-full border border-gold-accent/25 bg-purple-deep/40 px-4 py-2 ${className}`}
    >
      <GoogleIcon className="h-4 w-4 flex-shrink-0" />
      <span className="text-sm font-semibold text-neutral-light">{ratingValue.toFixed(1)}</span>
      <span
        className="flex items-center gap-0.5"
        role="img"
        aria-label={`${ratingValue} out of 5 stars`}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={13} aria-hidden="true" className="fill-gold-accent text-gold-accent" />
        ))}
      </span>
      <span className="text-sm text-neutral-mid/90">{reviewCount} Google reviews</span>
    </div>
  );
}
