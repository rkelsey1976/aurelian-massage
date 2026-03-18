export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  location?: string;
  rating: number;
  treatment?: string;
  platform: "Google" | "Direct";
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Absolutely wonderful experience from start to finish. The therapist took time to understand exactly where I was holding tension and worked on it with real skill. I left feeling completely renewed — the best massage I've had in Bath.",
    author: "Sarah M.",
    location: "Bath",
    rating: 5,
    treatment: "Signature Swedish Full Body Massage",
    platform: "Google",
  },
  {
    id: "t2",
    quote:
      "I've tried a few massage studios in the city but Aurelian is in a different league. The deep calm aromatherapy massage was phenomenal — I slept better that night than I have in months. I've already booked my next session.",
    author: "James T.",
    location: "Bristol",
    rating: 5,
    treatment: "Deep Calm Aromatherapy Massage",
    platform: "Google",
  },
  {
    id: "t3",
    quote:
      "I booked the Back, Neck & Shoulder Release after a particularly stressful week and it was exactly what I needed. The pressure was perfect and the whole atmosphere was incredibly calming. Highly recommend.",
    author: "Priya K.",
    location: "Bath",
    rating: 5,
    treatment: "Back, Neck & Shoulder Release",
    platform: "Google",
  },
  {
    id: "t4",
    quote:
      "As someone who travels constantly for work, the Traveller's Recovery Massage was a revelation. My legs and lower back felt completely reset. A genuinely thoughtful treatment, well delivered by a clearly expert therapist.",
    author: "David L.",
    location: "London",
    rating: 5,
    treatment: "Traveller's Recovery Massage",
    platform: "Google",
  },
  {
    id: "t5",
    quote:
      "The Aurelian Signature Massage is worth every penny. There was no rushing — the therapist worked at a pace that allowed me to fully switch off. I came out feeling taller somehow. Truly restorative.",
    author: "Emma R.",
    location: "Bath",
    rating: 5,
    treatment: "Aurelian Signature Massage",
    platform: "Google",
  },
];
