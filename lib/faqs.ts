import type { FaqItem } from "@/lib/services";

export const homepageFaqs: FaqItem[] = [
  {
    question: "Where is Aurelian Massage located?",
    answer:
      "We are located in Bath city centre, Somerset. Our studio is easily accessible whether you are a local resident or visiting Bath. Please get in touch via our contact page and we will share the full address and directions with you.",
  },
  {
    question: "Do I need to book in advance?",
    answer:
      "Yes, all treatments are by appointment only. We recommend booking ahead to secure your preferred time, particularly at weekends or during busy periods. Book online through Fresha using the Book now links on this site. If you have a question before you book, use our contact form or email us.",
  },
  {
    question: "What is your payment policy when booking?",
    answer:
      "The same payment policy applies to all clients and all services when you book through our online system: you will be charged a 25% deposit upfront at the time of booking. Deposits are non-refundable. You will see the full payment steps when you confirm your appointment on Fresha.",
  },
  {
    question: "What should I wear to my massage?",
    answer:
      "You will be professionally draped throughout your treatment and only the area being worked on will be uncovered at any time. Most clients undress to their underwear or fully, depending on their comfort. Your therapist will leave the room while you undress and will always ensure your privacy and dignity.",
  },
  {
    question: "What is the difference between a Swedish massage and a deep tissue massage?",
    answer:
      "Swedish massage uses flowing, rhythmic techniques to promote relaxation, improve circulation, and ease general muscular tension. Deep tissue massage uses more targeted pressure to work into deeper layers of muscle, making it more suited to chronic tension, specific problem areas, or postural issues. At Aurelian Massage, all treatments are adapted to your individual needs, so your therapist can blend techniques as appropriate.",
  },
  {
    question: "Is massage suitable for everyone?",
    answer:
      "Massage is suitable for most people, but there are some conditions where it may need to be modified or avoided. We recommend informing us of any medical conditions, injuries, recent surgeries, or areas of concern when you book. Your therapist will carry out a brief consultation before each session to ensure your treatment is safe and appropriate.",
  },
  {
    question: "How often should I have a massage?",
    answer:
      "This depends on your individual goals and lifestyle. For general relaxation and stress management, a monthly session is a popular choice. If you are managing a specific condition, recovering from injury, or going through a particularly demanding period, more frequent sessions may be beneficial. Your therapist will be happy to advise you.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "We ask that you give at least 24 hours notice if you need to cancel or rearrange your appointment so we can offer your slot to other clients. Your booking deposit (25% upfront) is non-refundable. Late cancellations or missed appointments without notice may incur further charges according to the terms shown when you book on Fresha. Please contact us as soon as possible if your plans change.",
  },
];

export function buildFaqSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
