import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const hasDatabase = Boolean(process.env.DATABASE_URL);

type ServiceItem = {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: Prisma.Decimal;
};

const mockServices: ServiceItem[] = [
  {
    id: "bridal-signature",
    name: "Bridal Makeup",
    description: "Long-wear radiant bridal artistry tailored to your dress, venue, and lighting.",
    duration: 120,
    price: new Prisma.Decimal(320),
  },
  {
    id: "event-glam",
    name: "Event Makeup",
    description: "Sophisticated glam makeup for gala nights, engagements, and special celebrations.",
    duration: 90,
    price: new Prisma.Decimal(180),
  },
  {
    id: "editorial-photoshoot",
    name: "Photoshoot Makeup",
    description: "Camera-ready editorial detail for studio, outdoor, and personal branding shoots.",
    duration: 90,
    price: new Prisma.Decimal(210),
  },
];

const mockPortfolio = [
  {
    id: "p1",
    title: "Timeless Bridal Glow",
    imageUrl:
      "https://images.unsplash.com/photo-1522337094846-8a818192de1f?auto=format&fit=crop&w=1200&q=80",
    category: "BRIDAL",
    description: "Soft luminous skin with defined eyes and modern nude lips.",
    createdAt: new Date("2026-04-12"),
  },
  {
    id: "p2",
    title: "Champagne Evening Glam",
    imageUrl:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80",
    category: "EVENING",
    description: "Sculpted features and shimmering champagne eyelids for evening elegance.",
    createdAt: new Date("2026-05-01"),
  },
  {
    id: "p3",
    title: "Natural Satin Finish",
    imageUrl:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=80",
    category: "NATURAL",
    description: "Breathable complexion and subtle contour for polished everyday beauty.",
    createdAt: new Date("2026-05-26"),
  },
  {
    id: "p4",
    title: "Editorial Contrast",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108755-2616b1522f04?auto=format&fit=crop&w=1200&q=80",
    category: "PHOTOSHOOT",
    description: "High-definition complexion and statement details for campaign visuals.",
    createdAt: new Date("2026-06-03"),
  },
];

const mockBlog = [
  {
    id: "b1",
    title: "How to prepare your skin before wedding makeup",
    slug: "prepare-skin-before-wedding-makeup",
    content:
      "Hydration, exfoliation, and barrier support are essential before bridal makeup. Start one week ahead with gentle products and avoid introducing active ingredients too close to your event.",
    imageUrl:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
    category: "Bridal",
    createdAt: new Date("2026-06-10"),
  },
  {
    id: "b2",
    title: "5 bridal makeup trends for 2026",
    slug: "bridal-makeup-trends-2026",
    content:
      "Soft sculpting, satin skin, blurred lip contours, micro-lash mapping, and personalized tones define this year’s bridal trend direction.",
    imageUrl:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80",
    category: "Trends",
    createdAt: new Date("2026-06-21"),
  },
  {
    id: "b3",
    title: "Natural makeup tips",
    slug: "natural-makeup-tips",
    content:
      "Use thin layers, cream textures, and neutral tones close to your own coloring for refined, natural-looking makeup.",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
    category: "Tips",
    createdAt: new Date("2026-07-04"),
  },
];

export async function getServices() {
  if (!hasDatabase) return mockServices;
  return prisma.service.findMany({ orderBy: { createdAt: "asc" } });
}

export async function getPortfolio() {
  if (!hasDatabase) return mockPortfolio;
  return prisma.portfolioItem.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getBlogPosts() {
  if (!hasDatabase) return mockBlog;
  return prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getBlogPost(slug: string) {
  if (!hasDatabase) return mockBlog.find((post) => post.slug === slug) ?? null;
  return prisma.blogPost.findUnique({ where: { slug } });
}

export async function getAvailabilitySlots(date: Date) {
  if (!hasDatabase) {
    return [
      { id: "a1", date, startTime: "09:00", endTime: "10:00", available: true },
      { id: "a2", date, startTime: "11:00", endTime: "12:00", available: true },
      { id: "a3", date, startTime: "14:00", endTime: "15:00", available: true },
    ];
  }

  return prisma.availabilitySlot.findMany({
    where: {
      date,
      available: true,
    },
    orderBy: { startTime: "asc" },
  });
}
