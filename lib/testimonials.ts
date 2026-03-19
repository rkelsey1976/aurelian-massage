export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  location?: string;
  rating: number;
  treatment?: string;
  platform: "Google" | "Facebook" | "Direct";
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "I've visited Ross three times so far, and left feeling relaxed and wonderful every time. He's really good with his hands and keeps the pressure perfectly how I asked him to. Exactly what I need after stressful days at work, and I'm so glad I found him.",
    author: "Gray H.",
    rating: 5,
    platform: "Facebook",
  },
  {
    id: "t2",
    quote:
      "Had a massage with Ross a few days ago — he really worked hard to make sure the visit was perfect for me. I would really recommend Ross. Very professional and the setting was comfortable and clean.",
    author: "Kirsty W.",
    rating: 5,
    platform: "Facebook",
  },
  {
    id: "t3",
    quote:
      "I had an absolutely amazing experience. From the moment I walked in, the atmosphere was calm, welcoming, and professional. The massage itself was perfect — the pressure was exactly right, and the therapist clearly knew what they were doing. Every area that needed attention was addressed with care and skill. I left feeling completely relaxed, refreshed, and pain-free. I can't recommend them highly enough and will definitely be booking again!",
    author: "Sarah E.",
    rating: 5,
    platform: "Facebook",
  },
];
