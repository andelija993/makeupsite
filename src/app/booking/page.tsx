import type { Metadata } from "next";
import { BookingForm } from "@/components/shared/booking-form";
import { getServices } from "@/lib/data";
import { getPreferences } from "@/lib/preferences";
import { getDictionary } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Book Appointment",
  description: "Reserve your makeup appointment by selecting date, time slot, and service.",
};

export default async function BookingPage() {
  const services = await getServices();
  const { locale } = await getPreferences();
  const t = getDictionary(locale);

  return (
    <div className="section container-px mx-auto max-w-7xl">
      <p className="text-xs uppercase tracking-[0.25em] text-accent">{t.booking.eyebrow}</p>
      <h1 className="mt-3 text-5xl">{t.booking.title}</h1>
      <p className="mt-4 max-w-3xl text-foreground/75">{t.booking.subtitle}</p>
      <div className="mt-10">
        <BookingForm
          services={services.map((service) => ({ id: service.id, name: service.name }))}
          labels={{
            fullName: t.booking.fullName,
            email: t.booking.email,
            phone: t.booking.phone,
            service: t.booking.service,
            selectService: t.booking.selectService,
            notes: t.booking.notes,
            preferredDate: t.booking.preferredDate,
            slots: t.booking.slots,
            noSlots: t.booking.noSlots,
            submitting: t.booking.submitting,
            submit: t.booking.submit,
          }}
        />
      </div>
    </div>
  );
}
