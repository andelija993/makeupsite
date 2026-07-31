"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import slugify from "slugify";
import { prisma } from "@/lib/prisma";
import { bookingSchema, contactSchema } from "@/lib/validations";
import { createSession, clearSession } from "@/lib/auth";
import { sendEmail } from "@/lib/email";

const hasDatabase = Boolean(process.env.DATABASE_URL);

type ActionResult = { ok: true; message: string } | { ok: false; message: string };

export async function submitBooking(input: unknown): Promise<ActionResult> {
  const data = bookingSchema.safeParse(input);
  if (!data.success) return { ok: false, message: "Please fill all required booking details." };

  if (!hasDatabase) return { ok: true, message: "Booking request received. Database setup required to persist it." };

  const date = new Date(`${data.data.date}T00:00:00.000Z`);
  const service = await prisma.service.findUnique({ where: { id: data.data.serviceId } });
  if (!service) return { ok: false, message: "Selected service was not found." };

  const slot = await prisma.availabilitySlot.findFirst({
    where: {
      date,
      startTime: data.data.time,
      available: true,
    },
  });
  if (!slot) return { ok: false, message: "Selected time slot is no longer available." };

  await prisma.booking.create({
    data: {
      clientName: data.data.fullName,
      email: data.data.email,
      phone: data.data.phone,
      serviceId: data.data.serviceId,
      date,
      time: data.data.time,
      notes: data.data.notes || "",
    },
  });

  await prisma.availabilitySlot.update({
    where: { id: slot.id },
    data: { available: false },
  });

  await sendEmail({
    to: data.data.email,
    subject: "Your appointment request was received",
    html: `<p>Hi ${data.data.fullName},</p><p>Thank you for your booking request for ${service.name} on ${data.data.date} at ${data.data.time}. We will confirm it shortly.</p>`,
  });

  if (process.env.ADMIN_NOTIFY_EMAIL) {
    await sendEmail({
      to: process.env.ADMIN_NOTIFY_EMAIL,
      subject: "New booking request",
      html: `<p>${data.data.fullName} requested ${service.name} on ${data.data.date} at ${data.data.time}.</p>`,
    });
  }

  revalidatePath("/admin/bookings");
  revalidatePath("/booking");
  return { ok: true, message: "Appointment request sent successfully." };
}

export async function submitContact(input: unknown): Promise<ActionResult> {
  const data = contactSchema.safeParse(input);
  if (!data.success) return { ok: false, message: "Please enter a valid message." };

  if (!hasDatabase) return { ok: true, message: "Message received. Configure the database to store messages." };

  await prisma.contactMessage.create({
    data: {
      name: data.data.name,
      email: data.data.email,
      phone: data.data.phone || "",
      message: data.data.message,
    },
  });

  if (process.env.ADMIN_NOTIFY_EMAIL) {
    await sendEmail({
      to: process.env.ADMIN_NOTIFY_EMAIL,
      subject: "New contact form message",
      html: `<p><strong>${data.data.name}</strong> (${data.data.email}) sent a message:</p><p>${data.data.message}</p>`,
    });
  }

  revalidatePath("/admin");
  return { ok: true, message: "Your message has been sent." };
}

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const next = String(formData.get("next") || "/admin");
  const safeNext = next.startsWith("/") ? next : "/admin";

  if (!hasDatabase) {
    redirect(`/admin/login?error=${encodeURIComponent("Database is required for admin authentication.")}&next=${encodeURIComponent(safeNext)}`);
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) redirect(`/admin/login?error=${encodeURIComponent("Invalid credentials.")}&next=${encodeURIComponent(safeNext)}`);

  const matched = await bcrypt.compare(password, user.passwordHash);
  if (!matched) redirect(`/admin/login?error=${encodeURIComponent("Invalid credentials.")}&next=${encodeURIComponent(safeNext)}`);

  await createSession(user.id);
  redirect(safeNext);
}

export async function logoutAction() {
  await clearSession();
  redirect("/admin/login");
}

export async function updateBookingStatus(formData: FormData) {
  const id = String(formData.get("id"));
  const status = String(formData.get("status")) as "CONFIRMED" | "REJECTED" | "CANCELLED";

  if (!hasDatabase) return;

  await prisma.booking.update({
    where: { id },
    data: { status },
  });

  revalidatePath("/admin/bookings");
}

export async function createAvailabilitySlot(formData: FormData) {
  if (!hasDatabase) return;

  const date = new Date(`${String(formData.get("date"))}T00:00:00.000Z`);
  await prisma.availabilitySlot.create({
    data: {
      date,
      startTime: String(formData.get("startTime")),
      endTime: String(formData.get("endTime")),
      available: formData.get("available") === "on",
    },
  });

  revalidatePath("/admin/availability");
  revalidatePath("/booking");
}

export async function deleteAvailabilitySlot(formData: FormData) {
  if (!hasDatabase) return;

  await prisma.availabilitySlot.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/admin/availability");
}

export async function createService(formData: FormData) {
  if (!hasDatabase) return;

  await prisma.service.create({
    data: {
      name: String(formData.get("name")),
      description: String(formData.get("description")),
      duration: Number(formData.get("duration")),
      price: String(formData.get("price")),
    },
  });

  revalidatePath("/services");
  revalidatePath("/admin/services");
}

export async function deleteService(formData: FormData) {
  if (!hasDatabase) return;

  await prisma.service.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/services");
  revalidatePath("/admin/services");
}

export async function updateService(formData: FormData) {
  if (!hasDatabase) return;

  await prisma.service.update({
    where: { id: String(formData.get("id")) },
    data: {
      name: String(formData.get("name")),
      description: String(formData.get("description")),
      duration: Number(formData.get("duration")),
      price: String(formData.get("price")),
    },
  });

  revalidatePath("/services");
  revalidatePath("/admin/services");
}

export async function createPortfolioItem(formData: FormData) {
  if (!hasDatabase) return;

  await prisma.portfolioItem.create({
    data: {
      title: String(formData.get("title")),
      imageUrl: String(formData.get("imageUrl")),
      category: String(formData.get("category")) as
        | "BRIDAL"
        | "EVENING"
        | "NATURAL"
        | "PHOTOSHOOT"
        | "BEFORE_AFTER",
      description: String(formData.get("description")),
    },
  });

  revalidatePath("/portfolio");
  revalidatePath("/admin/portfolio");
}

export async function deletePortfolioItem(formData: FormData) {
  if (!hasDatabase) return;

  await prisma.portfolioItem.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/portfolio");
  revalidatePath("/admin/portfolio");
}

export async function updatePortfolioItem(formData: FormData) {
  if (!hasDatabase) return;

  await prisma.portfolioItem.update({
    where: { id: String(formData.get("id")) },
    data: {
      title: String(formData.get("title")),
      imageUrl: String(formData.get("imageUrl")),
      description: String(formData.get("description")),
      category: String(formData.get("category")) as
        | "BRIDAL"
        | "EVENING"
        | "NATURAL"
        | "PHOTOSHOOT"
        | "BEFORE_AFTER",
    },
  });

  revalidatePath("/portfolio");
  revalidatePath("/admin/portfolio");
}

export async function createBlogPost(formData: FormData) {
  if (!hasDatabase) return;

  const title = String(formData.get("title"));
  const slug = slugify(title, { lower: true, strict: true });
  await prisma.blogPost.create({
    data: {
      title,
      slug,
      content: String(formData.get("content")),
      imageUrl: String(formData.get("imageUrl")),
      category: String(formData.get("category")),
    },
  });

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
}

export async function deleteBlogPost(formData: FormData) {
  if (!hasDatabase) return;

  await prisma.blogPost.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
}

export async function updateBlogPost(formData: FormData) {
  if (!hasDatabase) return;

  const id = String(formData.get("id"));
  const title = String(formData.get("title"));
  const slug = slugify(title, { lower: true, strict: true });
  await prisma.blogPost.update({
    where: { id },
    data: {
      title,
      slug,
      content: String(formData.get("content")),
      imageUrl: String(formData.get("imageUrl")),
      category: String(formData.get("category")),
    },
  });

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
}
