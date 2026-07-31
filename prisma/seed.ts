import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@lunaatelierbeauty.com";
  const password = process.env.ADMIN_PASSWORD || "ChangeMe123!";
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: { passwordHash },
    create: {
      email,
      passwordHash,
      role: "ADMIN",
    },
  });

  const services = [
    {
      name: "Bridal Makeup",
      description: "Long-wear radiant bridal artistry tailored to your dress and venue.",
      duration: 120,
      price: "320",
    },
    {
      name: "Event Makeup",
      description: "Elevated glam for engagement parties, galas, and celebrations.",
      duration: 90,
      price: "180",
    },
    {
      name: "Photoshoot Makeup",
      description: "High-definition skin and camera-ready detail for studio/editorial shoots.",
      duration: 90,
      price: "210",
    },
  ];

  for (const service of services) {
    const exists = await prisma.service.findFirst({ where: { name: service.name } });
    if (!exists) await prisma.service.create({ data: service });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
