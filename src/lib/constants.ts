export const siteConfig = {
  name: "Luna Atelier",
  title: "Luna Atelier | Luxury Makeup Artist",
  description:
    "Luxury bridal, glam, and editorial makeup artistry with a refined, modern beauty experience.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  phone: "+1 (555) 123-7890",
  email: "hello@lunaatelierbeauty.com",
  instagram: "https://instagram.com",
};

export const portfolioCategories = [
  "BRIDAL",
  "EVENING",
  "NATURAL",
  "PHOTOSHOOT",
  "BEFORE_AFTER",
] as const;
