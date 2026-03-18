export type NavService = {
  label: string;
  href: string;
  description: string;
  duration: number;
  price: number;
};

export type NavServiceGroup = {
  title: string;
  services: NavService[];
};

export type MegaMenuFeatured = {
  eyebrow: string;
  title: string;
  description: string;
  cta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

export const navServiceGroups: NavServiceGroup[] = [
  {
    title: "Focused",
    services: [
      {
        label: "Back, Neck & Shoulder Release",
        href: "/services/back-neck-shoulder-release",
        description: "Targeted upper body relief",
        duration: 30,
        price: 30,
      },
      {
        label: "Traveller's Recovery Massage",
        href: "/services/travellers-recovery-massage",
        description: "Refresh after long journeys",
        duration: 45,
        price: 48,
      },
    ],
  },
  {
    title: "Full Body",
    services: [
      {
        label: "Signature Swedish Full Body",
        href: "/services/signature-swedish-full-body",
        description: "Classic relaxation head to toe",
        duration: 60,
        price: 60,
      },
      {
        label: "Aurelian Signature Massage",
        href: "/services/aurelian-signature-massage",
        description: "Our definitive treatment",
        duration: 75,
        price: 72,
      },
      {
        label: "Ultimate Relaxation Massage",
        href: "/services/ultimate-relaxation-massage",
        description: "Deeply indulgent full body session",
        duration: 90,
        price: 90,
      },
    ],
  },
  {
    title: "Aromatherapy",
    services: [
      {
        label: "Revitalising Aromatherapy",
        href: "/services/revitalising-aromatherapy-massage",
        description: "Energise and restore vitality",
        duration: 60,
        price: 68,
      },
      {
        label: "Deep Calm Aromatherapy",
        href: "/services/deep-calm-aromatherapy-massage",
        description: "Soothe the mind, promote rest",
        duration: 60,
        price: 68,
      },
    ],
  },
];

export const megaMenuFeatured: MegaMenuFeatured = {
  eyebrow: "Book today",
  title: "Find the right treatment for you",
  description:
    "Not sure which session to choose? Browse all treatments or get in touch and we will help you find the perfect fit.",
  cta: { label: "Book now", href: "/contact" },
  secondaryCta: { label: "All treatments", href: "/services" },
};
