/**
 * Monthly memberships (Ross's poster, Nov 2026). "usual" is the standard
 * price of the matching treatment in lib/services, so the saving is honest.
 */
export type MembershipTier = {
  id: "bronze" | "silver" | "gold";
  name: string;
  minutes: number;
  price: string;
  usual: string;
  saving: string;
  treatment: { label: string; href: string };
  blurb: string;
};

export const membershipTiers: MembershipTier[] = [
  {
    id: "bronze",
    name: "Bronze",
    minutes: 30,
    price: "£22.50",
    usual: "£30",
    saving: "£7.50",
    treatment: { label: "Back, Neck & Shoulder Release", href: "/treatments/back-neck-shoulder-release" },
    blurb: "A focused back, neck and shoulder session. Good for desk tension.",
  },
  {
    id: "silver",
    name: "Silver",
    minutes: 60,
    price: "£45",
    usual: "£60",
    saving: "£15",
    treatment: { label: "Signature Swedish Full Body", href: "/treatments/signature-swedish-full-body" },
    blurb: "A full-body Signature Swedish massage, every month.",
  },
  {
    id: "gold",
    name: "Gold",
    minutes: 75,
    price: "£57",
    usual: "£72",
    saving: "£15",
    treatment: { label: "Aurelian Signature Massage", href: "/treatments/aurelian-signature-massage" },
    blurb: "The Aurelian Signature: longer, slower, nothing rushed.",
  },
];

/**
 * Membership FAQs. Only answered questions render: each needs Ross's answer
 * before it goes live (minimum term, roll-over, which treatments, gifts, cancelling).
 */
export const membershipFaqs: { question: string; answer: string }[] = [
  { question: "Is there a minimum term?", answer: "" },
  { question: "What if I miss a month?", answer: "" },
  { question: "Can I use my membership on any treatment of that length?", answer: "" },
  { question: "Can I give a membership as a gift?", answer: "" },
  { question: "How do I cancel?", answer: "" },
];
