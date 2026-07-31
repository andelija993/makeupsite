import { z } from "zod";

export const bookingSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  serviceId: z.string().min(1),
  date: z.string().min(1),
  time: z.string().min(1),
  notes: z.string().max(1000).optional(),
  website: z.string().max(0).optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10).max(1500),
  website: z.string().max(0).optional(),
});
