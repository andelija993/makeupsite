import type { Metadata } from "next";
import { ContactForm } from "@/components/shared/contact-form";
import { siteConfig } from "@/lib/constants";
import { getPreferences } from "@/lib/preferences";
import { getDictionary } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Luna Atelier for bookings, inquiries, and collaborations.",
};

export default async function ContactPage() {
  const { locale } = await getPreferences();
  const t = getDictionary(locale);

  return (
    <div className="section container-px mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_1.1fr]">
      <div className="space-y-6">
        <p className="text-xs uppercase tracking-[0.25em] text-accent">{t.contact.eyebrow}</p>
        <h1 className="text-5xl">{t.contact.title}</h1>
        <p className="text-foreground/75">{t.contact.subtitle}</p>
        <div className="rounded-3xl border border-line bg-card p-6 text-sm">
          <p>{t.contact.email}: {siteConfig.email}</p>
          <p className="mt-2">{t.contact.phone}: {siteConfig.phone}</p>
          <p className="mt-2">
            Instagram:{" "}
            <a href={siteConfig.instagram} className="underline">
              @lunaatelierbeauty
            </a>
          </p>
          <p className="mt-2">{t.contact.location}</p>
        </div>
        <div className="h-72 overflow-hidden rounded-3xl border border-line">
          <iframe
            title="Studio location"
            src="https://maps.google.com/maps?q=New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="h-full w-full"
            loading="lazy"
          />
        </div>
      </div>
      <ContactForm
        labels={{
          name: t.contact.name,
          email: t.contact.email,
          phone: t.contact.phone,
          message: t.contact.message,
          sending: t.contact.sending,
          send: t.contact.send,
        }}
      />
    </div>
  );
}
