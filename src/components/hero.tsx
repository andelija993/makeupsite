import Image from "next/image";
import { ArrowDown, MapPin } from "lucide-react";
import { Sparkle } from "./brand";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="grain relative isolate overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 right-[-10%] size-[42rem] rounded-full bg-[var(--glow)] blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-15%] size-[36rem] rounded-full bg-[var(--glow)] opacity-70 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-10 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
        <div className="text-center lg:text-left">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-card/60 px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-fg-soft backdrop-blur">
            <MapPin className="size-3.5 text-gold" />
            {site.cities.join(" · ")}
          </p>

          <h1 className="mt-8 font-serif text-5xl font-light leading-[1.05] sm:text-6xl md:text-7xl xl:text-[5.5rem]">
            Lepota koja
            <span className="block font-script text-gradient-gold text-[1.25em] leading-[1.1]">sija iznutra</span>
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-fg-soft md:text-lg lg:mx-0">
            Profesionalna šminka za mlade, maturante, proslave i fotografisanja. Nežno istaknuta prirodna lepota –
            postojana od prvog do poslednjeg plesa.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <a
              href="#rezervacija"
              className="group inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-xs uppercase tracking-[0.25em] text-gold-fg shadow-[0_15px_40px_-15px_var(--gold)] transition hover:-translate-y-0.5"
            >
              <Sparkle className="size-3 transition group-hover:rotate-90" />
              Zakaži termin
            </a>
            <a
              href="#galerija"
              className="inline-flex items-center gap-2 rounded-full border border-line px-8 py-4 text-xs uppercase tracking-[0.25em] transition hover:border-gold hover:text-gold"
            >
              Pogledaj radove
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[30rem]">
          <div aria-hidden className="absolute inset-[-6%] animate-spin-slow rounded-full border border-dashed border-gold/40" />
          <div aria-hidden className="absolute inset-[-12%] rounded-full border border-line/60" />
          <div className="animate-float relative aspect-square overflow-hidden rounded-full shadow-[0_40px_80px_-30px_rgba(60,35,25,0.55)] ring-1 ring-gold/40">
            <Image
              src="/logo.png"
              alt="Julija Nesić – šminkerka"
              fill
              priority
              sizes="(min-width: 1024px) 30rem, 90vw"
              className="object-cover"
            />
          </div>
          <Sparkle className="absolute -left-2 top-10 size-6 text-gold" />
          <Sparkle className="absolute -right-1 bottom-16 size-4 text-gold-soft" />
        </div>
      </div>

      <a
        href="#o-meni"
        aria-label="Skroluj dole"
        className="mx-auto mt-16 hidden size-11 place-items-center rounded-full border border-line text-fg-soft transition hover:text-gold md:grid"
      >
        <ArrowDown className="size-4 animate-bounce" />
      </a>
    </section>
  );
}
