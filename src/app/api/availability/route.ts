import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const dateParam = url.searchParams.get("date");
  if (!dateParam) return NextResponse.json({ slots: [] });

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({
      slots: [
        { id: "a1", startTime: "09:00", endTime: "10:00", available: true },
        { id: "a2", startTime: "11:00", endTime: "12:00", available: true },
        { id: "a3", startTime: "14:00", endTime: "15:00", available: true },
      ],
    });
  }

  const date = new Date(`${dateParam}T00:00:00.000Z`);
  const slots = await prisma.availabilitySlot.findMany({
    where: { date, available: true },
    orderBy: { startTime: "asc" },
  });
  return NextResponse.json({ slots });
}
