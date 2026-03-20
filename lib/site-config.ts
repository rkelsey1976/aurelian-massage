export type ServiceArea = {
  city: string;
  region: string;
};

export type BusinessHours = {
  label: string;
  schema: string;
};

/**
 * When true (set `NEXT_PUBLIC_COMING_SOON=true` at build/runtime), the public homepage
 * shows the coming-soon screen instead of the full marketing home.
 */
const comingSoon = process.env.NEXT_PUBLIC_COMING_SOON === "true";

export const siteConfig = {
  comingSoon,
  /** Copy for the homepage coming-soon state — edit here without touching the component. */
  comingSoonCopy: {
    eyebrow: "Aurelian Massage · Bath",
    headline: "Something golden is on the way",
    subheadline: "Swedish & aromatherapy massage in Bath city centre",
    body:
      "We're refreshing our home online while we keep welcoming clients in the studio. A fuller site with every treatment and story will land here soon — until then, book by link below or get in touch; we'd love to hear from you.",
    primaryCtaLabel: "Book on Fresha",
    secondaryCtaLabel: "Email the studio",
  },
  name: "Aurelian Massage",
  legalName: "Aurelian Massage",
  tagline: "A modern sanctuary inspired by the timeless healing traditions of the City of Bath.",
  description:
    "Swedish and aromatherapy massage therapy in Bath city centre. Every session individually tailored to your body's needs at Aurelian Massage.",
  url: "https://www.aurelianmassage.com",
  bookingUrl: "https://www.fresha.com/book-now/aurelian-massage-x0r1utrz/all-offer?share=true&pId=2823885",
  /** Google Maps place URL (verified listing) — used in JSON-LD sameAs and hasMap */
  googleMapsUrl:
    "https://www.google.com/maps/place/Aurelian+massage/data=!4m2!3m1!1s0x0:0xd43308dbf33709de",
  email: "ross@aurelianmassage.com",
  phone: "07388 007570",
  /** Personal name / role for print materials (e.g. business card). */
  owner: {
    name: "Ross",
    title: "Massage Therapist",
  },
  defaultOgImage: "/api/og",
  address: {
    street: "16 St Peters Terrace",
    city: "Bath",
    region: "Somerset",
    postalCode: "BA2 3BT",
    country: "GB",
  },
  geo: {
    latitude: 51.3837,
    longitude: -2.3599,
  },
  openingHours: [
    {
      label: "Tuesday 10:00 AM to 9:00 PM",
      schema: "Tu 10:00-21:00",
    },
    {
      label: "Wednesday 10:00 AM to 9:00 PM",
      schema: "We 10:00-21:00",
    },
    {
      label: "Sunday 10:00 AM to 4:00 PM",
      schema: "Su 10:00-16:00",
    },
  ] satisfies BusinessHours[],
  serviceAreas: [
    {
      city: "Bath",
      region: "Somerset",
    },
    {
      city: "Bristol",
      region: "Somerset",
    },
    {
      city: "Frome",
      region: "Somerset",
    },
  ] satisfies ServiceArea[],
  socialProfiles: [
    {
      platform: "Instagram",
      href: "https://www.instagram.com/aurelianmassage",
      label: "Follow Aurelian Massage on Instagram",
    },
    {
      platform: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61587723460105",
      label: "Follow Aurelian Massage on Facebook",
    },
  ],
  defaultKeywords: [
    "Swedish massage Bath",
    "aromatherapy massage Bath",
    "relaxation massage Bath",
    "massage therapy Bath",
    "Aurelian Massage",
  ],
};

export const navigationItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/treatments", label: "Treatments" },
  { href: "/products", label: "Products" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];
