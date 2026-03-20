import type { Config } from "tailwindcss";

const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "purple-royal": "#20152E",
        "purple-deep": "#2C1E42",
        "purple-mid": "#7A50B0",
        "purple-plum": "#5C3D88",
        "gold-premium": "#C5A556",
        "gold-champagne": "#DFC98A",
        "on-gold": "#000000",
        "neutral-light": "#F7F7F7",
        "neutral-gray": "#CCCACF",
      },
      fontFamily: {
        serif: ["Georgia", "Times New Roman", "Times", "serif"],
      },
      backgroundImage: {
        "gradient-luxury":
          "linear-gradient(135deg, #20152E 0%, #2C1E42 55%, #3B2660 100%)",
        "gradient-gold":
          "linear-gradient(135deg, #C5A556 0%, #DFC98A 50%, #C5A556 100%)",
      },
      boxShadow: {
        "luxury-glow":
          "0 0 40px rgba(197, 165, 86, 0.2), 0 20px 60px rgba(32, 21, 46, 0.5)",
        "purple-depth":
          "0 10px 40px rgba(32, 21, 46, 0.6), 0 0 0 1px rgba(197, 165, 86, 0.1)",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
