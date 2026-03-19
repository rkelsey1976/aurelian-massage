export type FaqItem = {
  question: string;
  answer: string;
};

export type Service = {
  slug: string;
  name: string;
  duration: number;
  price: number;
  description: string;
  featured?: boolean;
  image: string;
  gradient: string;
  idealFor: string[];
  benefits: string[];
  faqs: FaqItem[];
};

export const services: Service[] = [
  {
    slug: "back-neck-shoulder-release",
    name: "Back, Neck & Shoulder Release",
    duration: 30,
    price: 30,
    image: "/back-massage.png",
    gradient:
      "linear-gradient(160deg, rgba(32,21,46,0.55) 0%, rgba(122,80,176,0.75) 100%)",
    description:
      "A focused treatment designed to relieve the areas where tension most commonly accumulates. This massage concentrates on the upper back, shoulders, and neck, using flowing Swedish massage techniques to ease muscular tightness, improve circulation, and encourage greater mobility. It is particularly beneficial for those experiencing stress, postural strain, or stiffness from daily activities, leaving the upper body feeling lighter and deeply relaxed.",
    idealFor: [
      "Those experiencing neck or shoulder tension from desk work or screen use",
      "People carrying stress in their upper body",
      "Anyone with limited time who wants a focused, effective treatment",
      "Those new to massage looking for a shorter introductory session",
    ],
    benefits: [
      "Relieves muscular tightness across the upper back, shoulders, and neck",
      "Improves circulation to tense and fatigued muscles",
      "Encourages greater range of movement and flexibility",
      "Reduces the physical sensation of stress and mental pressure",
    ],
    faqs: [
      {
        question: "Is thirty minutes long enough to make a real difference?",
        answer:
          "Yes. By focusing exclusively on the upper back, shoulders, and neck, your therapist can work with genuine depth and intention within thirty minutes. Many clients leave feeling a noticeable release in tension and greater ease of movement in the areas that trouble them most.",
      },
      {
        question: "Will I need to undress for this treatment?",
        answer:
          "For this focused treatment, you will typically keep your lower body dressed and only need to remove your top clothing. Your therapist will ensure you are always professionally draped and comfortable throughout.",
      },
      {
        question: "Can this help with headaches caused by neck tension?",
        answer:
          "Many headaches are linked to muscular tension in the neck and upper shoulders. By releasing that tension, this treatment can offer significant relief for tension-type headaches. If you have concerns about headaches, we recommend mentioning this during your pre-treatment consultation.",
      },
      {
        question: "How regularly should I book this treatment?",
        answer:
          "For those who work at a desk or experience regular stress-related tension, a session every two to four weeks tends to produce the best results. Your therapist can advise based on your specific situation.",
      },
    ],
  },
  {
    slug: "travellers-recovery-massage",
    name: "Traveller's Recovery Massage",
    duration: 45,
    price: 48,
    image: "/spa-setup.png",
    gradient:
      "linear-gradient(160deg, rgba(20,40,60,0.60) 0%, rgba(40,80,120,0.78) 100%)",
    description:
      "Created especially for those who have spent long hours travelling or sitting. This restorative massage focuses on the legs, lower back, and shoulders to stimulate circulation and gently release travel-related tension. Swedish massage techniques help reduce fatigue, encourage the body's natural recovery processes, and restore a sense of physical balance, leaving you refreshed and ready to enjoy your time in Bath.",
    idealFor: [
      "Visitors arriving in Bath after long journeys by car, train, or plane",
      "Those experiencing stiffness, fatigue, or swelling in the legs",
      "Business travellers needing a reset between commitments",
      "Anyone who has spent extended time seated or in transit",
    ],
    benefits: [
      "Stimulates circulation to reduce swelling and leg fatigue",
      "Releases tension accumulated from prolonged sitting or travel",
      "Restores a sense of physical energy and readiness",
      "Helps the body shift from a state of fatigue to genuine recovery",
    ],
    faqs: [
      {
        question: "How soon after arriving in Bath can I book this treatment?",
        answer:
          "You can book at any time, including on the day of your arrival if availability allows. We recommend booking in advance to secure a time that suits your travel schedule. This treatment is designed to work quickly, so you can be refreshed and ready to enjoy Bath within the same afternoon.",
      },
      {
        question: "Does this treatment help with swollen ankles after flying?",
        answer:
          "Yes. The treatment includes focused work on the legs and feet, using techniques that stimulate circulation and encourage fluid movement. Many clients find noticeable relief from the heaviness and swelling that can follow long-haul flights or extended train journeys.",
      },
      {
        question: "Is this suitable for business travellers with limited time?",
        answer:
          "Absolutely. At forty-five minutes this treatment is designed to deliver genuine results efficiently. It fits comfortably into a busy schedule while offering real therapeutic benefit, making it an excellent option between meetings or commitments.",
      },
      {
        question: "Can this treatment help with back pain from sitting in a car or train?",
        answer:
          "Yes. The lower back and hip area tend to suffer most from prolonged sitting, and this treatment specifically addresses those areas alongside the legs and shoulders. Your therapist can adjust the focus based on where you are carrying the most tension.",
      },
    ],
  },
  {
    slug: "signature-swedish-full-body",
    name: "Signature Swedish Full Body Massage",
    duration: 60,
    price: 60,
    image: "/therapist-hero.png",
    gradient:
      "linear-gradient(160deg, rgba(60,40,10,0.55) 0%, rgba(160,110,30,0.75) 100%)",
    description:
      "A beautifully balanced full body massage designed to promote relaxation and restore physical harmony. Using traditional Swedish massage techniques across the back, legs, arms, shoulders, and neck, this treatment improves circulation, relieves muscular tension, and calms the nervous system. The experience leaves the body feeling revitalised, supple, and deeply relaxed.",
    idealFor: [
      "Those seeking a complete and balanced full body treatment",
      "Anyone looking to relieve general muscular tension throughout the body",
      "People managing everyday stress and its physical effects",
      "Those wanting a thorough, restorative session in a single hour",
    ],
    benefits: [
      "Improves circulation and lymphatic flow throughout the body",
      "Relieves muscular tension across all major muscle groups",
      "Calms the nervous system and reduces cortisol levels",
      "Leaves the skin feeling nourished and the body deeply supple",
    ],
    faqs: [
      {
        question: "What areas of the body are covered in a full body massage?",
        answer:
          "A full body Swedish massage typically covers the back, lower back, glutes, legs, feet, arms, hands, shoulders, neck, and scalp. Your therapist will check with you beforehand if there are any areas you would prefer to skip or focus on more closely.",
      },
      {
        question: "What is Swedish massage and how does it feel?",
        answer:
          "Swedish massage uses a combination of long gliding strokes, kneading, circular movements, and gentle tapping to work through the soft tissues of the body. It feels smooth and rhythmic rather than intense, and most clients find it deeply soothing. Pressure can be adjusted throughout to suit your preference.",
      },
      {
        question: "Is this a good choice for a first massage?",
        answer:
          "Yes, this is one of our most popular introductory treatments. Swedish massage is welcoming and adaptable, and your therapist will take time before the session to understand your needs and ensure you feel entirely at ease throughout.",
      },
      {
        question: "How will I feel after a full body massage?",
        answer:
          "Most clients feel deeply relaxed, lighter, and more physically at ease. Some experience mild tiredness for the remainder of the day, which is a normal response to the body unwinding. We recommend drinking plenty of water afterwards and allowing yourself time to rest if possible.",
      },
    ],
  },
  {
    slug: "aurelian-signature-massage",
    name: "Aurelian Signature Massage",
    duration: 75,
    price: 72,
    featured: true,
    image: "/intro-2.png",
    gradient:
      "linear-gradient(160deg, rgba(32,21,46,0.45) 0%, rgba(197,165,86,0.70) 100%)",
    description:
      "A signature treatment created to provide deeper relaxation and personalised attention. This extended massage allows additional time to focus on areas of tension while maintaining a smooth and flowing full body treatment. The carefully paced techniques encourage muscles to release gradually while calming the mind, creating a restorative experience that leaves you feeling balanced, grounded, and renewed.",
    idealFor: [
      "Those wanting the most personalised and attentive experience available",
      "Anyone carrying persistent tension that needs more focused time",
      "Those seeking a deeply restorative treatment for body and mind",
      "Clients looking for our definitive and most celebrated session",
    ],
    benefits: [
      "Extended time allows deeper muscle release without rushing",
      "Personalised focus on your individual areas of tension",
      "A profoundly calming effect on both the body and nervous system",
      "Leaves you feeling balanced, renewed, and fully restored",
    ],
    faqs: [
      {
        question: "What makes this different from the standard Swedish full body massage?",
        answer:
          "The extra fifteen minutes allows your therapist to spend additional time on areas of specific tension while still delivering a complete and flowing full body treatment. There is no sense of rushing, and the pace is more generous throughout. Many clients describe it as the session where they truly let go.",
      },
      {
        question: "Is this treatment suitable for people with persistent muscle tension?",
        answer:
          "Yes. The extended time makes this an excellent choice for anyone carrying tension that has built up over time. Your therapist can give particular attention to problem areas without compromising the overall balance and flow of the session.",
      },
      {
        question: "Why is this called the Aurelian Signature Massage?",
        answer:
          "This is our definitive treatment — the one that best represents the Aurelian approach to massage. It balances clinical effectiveness with a deeply restorative quality, taking the time to work thoughtfully through the body while remaining attentive to your individual experience throughout.",
      },
      {
        question: "Can I request specific areas of focus?",
        answer:
          "Absolutely. During your pre-treatment consultation, your therapist will ask about any areas of concern or preference. The extra time in this session gives genuine scope to address these while still providing a complete and satisfying full body treatment.",
      },
    ],
  },
  {
    slug: "ultimate-relaxation-massage",
    name: "Ultimate Relaxation Massage",
    duration: 90,
    price: 90,
    image: "/back-massage.png",
    gradient:
      "linear-gradient(160deg, rgba(15,10,35,0.60) 0%, rgba(60,30,100,0.80) 100%)",
    description:
      "An indulgent and deeply soothing full body massage designed to allow the body and mind to completely unwind. Slow, flowing Swedish techniques help melt away muscular tension while promoting circulation and encouraging deep relaxation throughout the nervous system. With generous time to work through the entire body without rushing, this treatment creates a profound sense of calm and wellbeing.",
    idealFor: [
      "Those wanting to fully surrender and let go of accumulated stress",
      "Anyone who finds shorter sessions feel rushed or incomplete",
      "Those treating themselves to a special and unhurried experience",
      "People recovering from a particularly demanding period of work or life",
    ],
    benefits: [
      "Ninety uninterrupted minutes of slow, unhurried therapeutic work",
      "Profound relaxation of the entire body from head to toe",
      "Deep calming of the nervous system and release of held tension",
      "A lasting sense of calm and wellbeing that extends beyond the session",
    ],
    faqs: [
      {
        question: "Is ninety minutes too long if I have never had a massage before?",
        answer:
          "Not at all. The slower, more generous pace of this treatment actually makes it easier to settle into if you are new to massage. There is no rushing, and your therapist will ensure you are comfortable and relaxed throughout. Many clients find ninety minutes passes quickly once they begin to unwind.",
      },
      {
        question: "Will I fall asleep during this treatment?",
        answer:
          "Many clients do drift into a light sleep during this session, which is entirely normal and welcome. It is a sign that the body has reached a deep level of relaxation. Your therapist will work around this without disrupting your rest.",
      },
      {
        question: "Is this a good choice for a special occasion?",
        answer:
          "Yes. This is one of our most popular treatments for birthdays, anniversaries, and moments of personal celebration or self-care. The generous duration and unhurried quality make it feel genuinely indulgent.",
      },
      {
        question: "What should I do after a ninety-minute massage?",
        answer:
          "We recommend keeping your schedule as clear as possible after this treatment. Allow yourself time to rest and rehydrate. Avoid intense exercise, alcohol, or demanding commitments for the remainder of the day to give your body the space to fully integrate the benefits of the session.",
      },
    ],
  },
  {
    slug: "revitalising-aromatherapy-massage",
    name: "Revitalising Aromatherapy Massage",
    duration: 60,
    price: 68,
    image: "/aromatherapy-oil.png",
    gradient:
      "linear-gradient(160deg, rgba(10,35,25,0.55) 0%, rgba(30,100,60,0.75) 100%)",
    description:
      "An uplifting full body massage that combines Swedish techniques with carefully selected invigorating essential oils. Fresh, energising aromas help stimulate the senses while massage movements encourage circulation and release muscular tension. This treatment is ideal for boosting energy levels, refreshing the body, and restoring a sense of vitality and clarity.",
    idealFor: [
      "Those feeling fatigued, low in energy, or in need of a lift",
      "Anyone wanting the therapeutic benefits of aromatherapy alongside massage",
      "Those seeking mental clarity and a renewed sense of focus",
      "People looking for an uplifting experience that energises rather than sedates",
    ],
    benefits: [
      "Invigorating essential oils stimulate the senses and sharpen focus",
      "Improves circulation and encourages natural detoxification",
      "Relieves muscular tension while restoring physical vitality",
      "Leaves you feeling refreshed, energised, and mentally clear",
    ],
    faqs: [
      {
        question: "Which essential oils are used in the Revitalising Aromatherapy Massage?",
        answer:
          "We use a carefully selected blend of invigorating essential oils chosen for their energising and uplifting properties. Common choices include citrus, peppermint, and rosemary-based blends. Your therapist will check for any allergies or sensitivities before your session and can adjust the blend accordingly.",
      },
      {
        question: "Is aromatherapy massage safe if I am sensitive to strong scents?",
        answer:
          "We always carry out a brief consultation before your session and can adapt the oil blend to use lighter or more subtle aromas if needed. Please mention any sensitivities when booking so we can prepare appropriately.",
      },
      {
        question: "Is this treatment better in the morning or afternoon?",
        answer:
          "The revitalising blend used in this treatment lends itself well to morning or early afternoon appointments, as the energising effect of the essential oils can complement the rest of your day. That said, the massage itself is deeply relaxing and can be enjoyed at any time.",
      },
      {
        question: "How does aromatherapy enhance the massage experience?",
        answer:
          "Essential oils are absorbed through the skin and inhaled throughout the session. They interact with the nervous system and limbic system — the part of the brain associated with mood and memory — to amplify the therapeutic effect of the massage. The result is a more complete sensory and physical experience.",
      },
    ],
  },
  {
    slug: "deep-calm-aromatherapy-massage",
    name: "Deep Calm Aromatherapy Massage",
    duration: 60,
    price: 68,
    image: "/spa-setup.png",
    gradient:
      "linear-gradient(160deg, rgba(10,20,45,0.60) 0%, rgba(20,50,100,0.80) 100%)",
    description:
      "A deeply relaxing treatment designed to quiet the mind and prepare the body for restorative rest. Gentle Swedish massage techniques are combined with calming essential oils known for their soothing and sleep-promoting qualities. This nurturing experience encourages the nervous system to slow down, easing physical and mental tension while leaving you feeling peaceful, comforted, and ready for a restful night.",
    idealFor: [
      "Those struggling with sleep difficulty or disrupted rest",
      "Anyone experiencing anxiety, mental restlessness, or overwhelm",
      "Those wanting a deeply soothing evening treatment before rest",
      "People who need help transitioning from a busy mind to genuine calm",
    ],
    benefits: [
      "Calming essential oils support the nervous system and promote sleep",
      "Slow, nurturing massage techniques encourage deep physical relaxation",
      "Eases mental tension and quiets an overactive or anxious mind",
      "Prepares both body and mind for truly restorative overnight rest",
    ],
    faqs: [
      {
        question: "Which essential oils are used in the Deep Calm treatment?",
        answer:
          "We use calming, sleep-supportive essential oils such as lavender, chamomile, and frankincense-based blends, chosen for their well-documented ability to ease the nervous system and promote rest. Your therapist will check for allergies or sensitivities before your session.",
      },
      {
        question: "Can this treatment help with sleep problems?",
        answer:
          "Many clients report significant improvements in sleep quality following this treatment, particularly when booked in the evening. The combination of slow massage techniques and calming essential oils works to reduce cortisol, lower the heart rate, and prepare the body and mind for deep rest.",
      },
      {
        question: "What time of day is best for this treatment?",
        answer:
          "This treatment is particularly well suited to late afternoon or evening appointments, as the calming effect of the essential oils and massage is designed to transition you into a restful state. If you can return home and rest afterwards, the benefits are likely to be greater.",
      },
      {
        question: "Is this suitable for people experiencing anxiety?",
        answer:
          "Yes. The gentle, unhurried nature of this treatment and the calming properties of the essential oils used make it well suited to those managing anxiety or heightened stress. We recommend letting your therapist know about any anxiety during your consultation so the session can be adapted to feel as safe and comfortable as possible.",
      },
    ],
  },
];
