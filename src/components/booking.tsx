"use client";

import { useState } from "react";
import { Check, Loader2, MapPin, Send } from "lucide-react";
import { links, site } from "@/lib/site";
import { Reveal } from "./reveal";
import { SectionHeading, Sparkle } from "./brand";
import { InstagramIcon, ViberIcon, WhatsAppIcon } from "./icons";

type Form = { city: string; date: string; time: string; name: string; phone: string; note: string };
type Status = "idle" | "sending" | "sent" | "failed";
const empty: Form = { city: "", date: "", time: "", name: "", phone: "", note: "" };

const field =
  "block w-full min-w-0 max-w-full appearance-none rounded-2xl border border-line bg-bg px-4 py-3.5 text-base text-fg outline-none transition placeholder:text-fg-soft/60 focus:border-gold focus:ring-4 focus:ring-gold/15";
const label = "mb-2 block text-[11px] uppercase tracking-[0.2em] text-fg-soft";
const optional = <span className="normal-case tracking-normal">(opciono)</span>;

function today() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}.`;
}

function whatsappText(f: Form) {
  return [
    "Zdravo Julija! Želela bih da zakažem termin.",
    `Grad: ${f.city}`,
    `Datum: ${formatDate(f.date)}`,
    f.time && `Vreme: ${f.time}`,
    `Ime: ${f.name}`,
    f.note && `Napomena: ${f.note}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export function Booking() {
  const [form, setForm] = useState<Form>(empty);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const set = (key: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  function validate() {
    if (!form.city) return "Izaberite grad.";
    if (!form.date) return "Izaberite datum.";
    if (form.name.trim().length < 2) return "Upišite vaše ime.";
    if (form.phone.replace(/\D/g, "").length < 6) return "Upišite broj telefona kako bih vas kontaktirala.";
    return "";
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const problem = validate();
    setError(problem);
    if (problem) return;

    setStatus("sending");
    try {
      const honeypot = (e.currentTarget.elements.namedItem("botcheck") as HTMLInputElement | null)?.checked;
      const payload = new FormData();
      Object.entries({
        access_key: site.bookingFormKey,
        // Nazivi polja bez kvačica (š, ž, č) jer ih Web3Forms ne prikazuje ispravno u mejlu.
        subject: "Zahtev za zakazivanje sminke",
        from_name: "Sajt - rezervacije",
        "Ko zeli da zakaze": form.name.trim(),
        "Datum i vreme": form.time ? `${formatDate(form.date)} u ${form.time}` : `${formatDate(form.date)} (vreme nije navedeno)`,
        Lokacija: form.city,
        Komentar: form.note.trim() || "-",
        "Broj telefona": form.phone.trim(),
      }).forEach(([k, v]) => payload.append(k, v));
      if (honeypot) payload.append("botcheck", "on");
      // FormData (bez JSON zaglavlja) izbegava CORS preflight zahtev.
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: payload });
      const data = (await res.json()) as { success?: boolean };
      setStatus(res.ok && data.success ? "sent" : "failed");
    } catch {
      setStatus("failed");
    }
  }

  return (
    <section id="rezervacija" className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/3 -z-10 size-[40rem] -translate-x-1/2 rounded-full bg-[var(--glow)] blur-3xl" />
      <div className="mx-auto max-w-3xl px-4 md:px-10">
        <Reveal>
          <SectionHeading
            eyebrow="Rezervacija"
            title="Zakažite svoj termin"
            text="Popunite formu i pošaljite upit. Javiću vam se u najkraćem roku da potvrdimo termin."
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-12 rounded-[2rem] border border-line bg-card/80 p-5 shadow-[0_40px_80px_-50px_rgba(60,35,25,0.5)] backdrop-blur sm:p-8 md:p-10">
            {status === "sent" ? (
              <div className="fade-up flex flex-col items-center py-10 text-center" role="status">
                <span className="grid size-20 place-items-center rounded-full bg-gold text-gold-fg shadow-[0_20px_50px_-15px_var(--gold)]">
                  <Check className="size-9" strokeWidth={1.6} />
                </span>
                <h3 className="mt-8 font-serif text-4xl font-light">Hvala, {form.name.trim().split(" ")[0]}!</h3>
                <p className="mt-4 max-w-sm leading-relaxed text-fg-soft">
                  Vaš upit za <strong className="font-medium text-fg">{formatDate(form.date)}</strong> ({form.city}) je
                  poslat. Javiću vam se uskoro na broj <strong className="font-medium text-fg">{form.phone}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setForm(empty);
                    setStatus("idle");
                  }}
                  className="mt-8 text-xs uppercase tracking-[0.2em] text-gold underline-offset-4 hover:underline"
                >
                  Pošalji novi upit
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

                <fieldset>
                  <legend className={label}>Grad</legend>
                  <div className="grid grid-cols-2 gap-3">
                    {site.cities.map((city) => {
                      const selected = form.city === city;
                      return (
                        <label
                          key={city}
                          className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition ${
                            selected ? "border-gold bg-gold/10" : "border-line hover:border-gold/50"
                          }`}
                        >
                          <input
                            type="radio"
                            name="city"
                            value={city}
                            checked={selected}
                            onChange={set("city")}
                            className="sr-only"
                          />
                          <span
                            className={`grid size-9 shrink-0 place-items-center rounded-full transition ${
                              selected ? "bg-gold text-gold-fg" : "bg-bg-soft text-gold"
                            }`}
                          >
                            {selected ? <Check className="size-4" /> : <MapPin className="size-4" />}
                          </span>
                          <span className="font-serif text-lg sm:text-xl">{city}</span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="mt-6 grid gap-5 sm:grid-cols-2 [&>*]:min-w-0">
                  <div>
                    <label htmlFor="date" className={label}>
                      Datum
                    </label>
                    <input id="date" type="date" min={today()} value={form.date} onChange={set("date")} className={field} />
                  </div>
                  <div>
                    <label htmlFor="time" className={label}>
                      Vreme {optional}
                    </label>
                    <input id="time" type="time" step={900} value={form.time} onChange={set("time")} className={field} />
                  </div>
                  <div>
                    <label htmlFor="name" className={label}>
                      Ime i prezime
                    </label>
                    <input
                      id="name"
                      autoComplete="name"
                      placeholder="npr. Ana Petrović"
                      value={form.name}
                      onChange={set("name")}
                      className={field}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className={label}>
                      Telefon
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="06x xxx xxxx"
                      value={form.phone}
                      onChange={set("phone")}
                      className={field}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="note" className={label}>
                      Napomena {optional}
                    </label>
                    <textarea
                      id="note"
                      rows={3}
                      placeholder="Vrsta šminke, broj osoba, inspiracija…"
                      value={form.note}
                      onChange={set("note")}
                      className={`${field} resize-none`}
                    />
                  </div>
                </div>

                <div aria-live="polite" className="min-h-6 pt-4 text-center text-sm">
                  {error ? <p className="text-red-600 dark:text-red-400">{error}</p> : null}
                  {status === "failed" ? (
                    <p className="text-red-600 dark:text-red-400">
                      Slanje trenutno nije uspelo.{" "}
                      <a
                        href={links.whatsapp(whatsappText(form))}
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold underline underline-offset-4"
                      >
                        Pošaljite upit preko WhatsApp-a
                      </a>
                    </p>
                  ) : null}
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-2 flex w-full items-center justify-center gap-3 rounded-full bg-gold px-8 py-4.5 text-sm uppercase tracking-[0.25em] text-gold-fg shadow-[0_20px_45px_-20px_var(--gold)] transition hover:brightness-105 active:scale-[0.98] disabled:opacity-70"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="size-4 animate-spin" /> Šaljem…
                    </>
                  ) : (
                    <>
                      <Send className="size-4" /> Pošalji upit
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-10 flex flex-col items-center gap-4 text-center">
            <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-fg-soft">
              <Sparkle className="size-2.5 text-gold" /> Ili me kontaktirajte direktno
              <Sparkle className="size-2.5 text-gold" />
            </p>
            <div className="flex gap-3">
              {[
                { href: links.whatsapp(), label: "WhatsApp", icon: WhatsAppIcon, external: true },
                { href: links.viber, label: "Viber", icon: ViberIcon, external: false },
                { href: links.instagramDm, label: "Instagram", icon: InstagramIcon, external: true },
              ].map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  aria-label={c.label}
                  title={c.label}
                  {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="grid size-12 place-items-center rounded-full border border-line text-gold transition hover:border-gold hover:bg-gold hover:text-gold-fg"
                >
                  <c.icon className="size-5" />
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
