import type { Metadata } from "next";
import { getServices } from "@/lib/data";
import { currency } from "@/lib/utils";
import { getPreferences } from "@/lib/preferences";
import { getDictionary } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Services",
  description: "Luxury makeup services for bridal, events, and photoshoots.",
};

export default async function ServicesPage() {
  const services = await getServices();
  const { locale } = await getPreferences();
  const t = getDictionary(locale);
  const isSr = locale === "sr";

  return (
    <div className="section container-px mx-auto max-w-6xl">
      <p className="text-xs uppercase tracking-[0.25em] text-accent">{isSr ? "Usluge" : "Services"}</p>
      <h1 className="mt-3 text-5xl">
        {isSr ? "Makeup usluge prilagođene vašoj prilici." : "Makeup services tailored to your occasion."}
      </h1>
      <div className="mt-10 grid gap-6">
        {services.map((service) => (
          <article key={service.id} className="rounded-3xl border border-line bg-card p-7">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h2 className="text-3xl">{service.name}</h2>
              <p className="text-2xl font-semibold">{currency(Number(service.price))}</p>
            </div>
            <p className="mt-3 max-w-3xl text-foreground/75">{service.description}</p>
            <p className="mt-4 text-sm text-foreground/70">
              {t.common.duration}: {service.duration} {t.common.minutes}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
