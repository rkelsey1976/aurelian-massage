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
    "Swedish and aromatherapy massage therapy in Bath city centre. Every session individually tailored to your body's needs at Aurelian Massage.",
  url: "https://www.aurelianmassage.co.uk",
  bookingUrl: "https://www.fresha.com/book-now/aurelian-massage-x0r1utrz/all-offer?share=true&pId=2823885",
  email: "ross@aurelianmassage.com",
  phone: "+44 1225 000000",
  defaultOgImage: "/api/og",
  address: {
    street: "16 St Peters Terrace",
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
      label: "Tuesday 10:00 AM to 9:00 PM",
      schema: "Tu 10:00-21:00",
    },
    {
      label: "Wednesday 10:00 AM to 9:00 PM",
      schema: "We 10:00-21:00",
    },
    {
      label: "Sunday 10:00 AM to 6:00 PM",
      schema: "Su 10:00-18:00",
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
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];
