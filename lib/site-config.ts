export type ServiceArea = {
  city: string;
  region: string;
};

export type BusinessHours = {
  label: string;
  schema: string;
};

export const siteConfig = {
  name: "Aurelian Massage",
  legalName: "Aurelian Massage",
  tagline: "A modern sanctuary inspired by the timeless healing traditions of the City of Bath.",
  description:
    "Luxury holistic and deep tissue massage therapy in Bath city centre. Specialist remedial techniques and stress relief, individually tailored to your body's needs.",
  url: "https://www.aurelianmassage.co.uk",
  email: "hello@aurelianmassage.co.uk",
  phone: "+44 1225 000000",
  defaultOgImage: "/api/og",
  address: {
    street: "Bath City Centre",
    city: "Bath",
    region: "Somerset",
    postalCode: "BA1",
    country: "GB",
  },
  geo: {
    latitude: 51.3837,
    longitude: -2.3599,
  },
  openingHours: [
    {
      label: "Monday–Saturday 9:00 AM to 7:00 PM",
      schema: "Mo-Sa 09:00-19:00",
    },
    {
      label: "Sunday 10:00 AM to 5:00 PM",
      schema: "Su 10:00-17:00",
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
      href: "https://www.facebook.com/aurelianmassage",
      label: "Follow Aurelian Massage on Facebook",
    },
  ],
  defaultKeywords: [
    "luxury massage Bath",
    "holistic massage Bath",
    "deep tissue massage Bath",
    "remedial massage Somerset",
    "Aurelian Massage",
  ],
};

export const navigationItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Treatments" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];
