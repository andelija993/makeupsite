import type { Metadata } from "next";
import { getPreferences } from "@/lib/preferences";

export const metadata: Metadata = {
  title: "About",
  description: "Meet the artist behind Luna Atelier and discover the beauty philosophy.",
};

export default async function AboutPage() {
  const { locale } = await getPreferences();
  const isSr = locale === "sr";

  return (
    <div className="section container-px mx-auto max-w-6xl space-y-10">
      <header>
        <p className="text-xs uppercase tracking-[0.25em] text-accent">{isSr ? "O meni" : "About Me"}</p>
        <h1 className="mt-3 text-5xl">
          {isSr ? "Umetnost zasnovana na eleganciji, samopouzdanju i autentičnosti." : "Artistry rooted in elegance, confidence, and individuality."}
        </h1>
      </header>
      <div className="grid gap-8 rounded-3xl border border-line bg-card p-8 md:grid-cols-2">
        <div className="space-y-5 text-foreground/80">
          {isSr ? (
            <>
              <p>Ja sam Luna, profesionalni makeup artist specijalizovan za bridal, glam i editorial beauty. Moj put je počeo u modnim studijima i prerastao u prepoznatljivo bridal iskustvo sa fokusom na besprekornu kožu i personalizovane detalje.</p>
              <p>Tokom poslednje decenije radila sam sa destination mlada, kampanjskim produkcijama i privatnim klijentima koji traže sofisticiran, luksuzan makeup sa modernim pristupom.</p>
              <p>Moja filozofija je jednostavna: makeup treba da naglasi identitet, a ne da ga prekrije. Svakom licu pristupam kroz pažljivo birane tonove, meke konture i dugotrajnu postojanost.</p>
            </>
          ) : (
            <>
              <p>I’m Luna, a professional makeup artist specializing in bridal, glam, and editorial beauty. My journey started in fashion studios and evolved into a signature bridal experience focused on timeless skin and personalized detail.</p>
              <p>Over the past decade, I’ve worked with destination brides, campaign productions, and private clients seeking polished, luxurious makeup that feels modern and effortless.</p>
              <p>My philosophy is simple: makeup should enhance identity, not mask it. Every face is approached with bespoke tones, soft architecture, and long-wear performance.</p>
            </>
          )}
        </div>
        <div className="space-y-6 rounded-2xl border border-line p-6">
          <h2 className="text-2xl">{isSr ? "Iskustvo i sertifikati" : "Experience & Certifications"}</h2>
          <ul className="space-y-3 text-sm text-foreground/80">
            <li>10+ years of professional beauty artistry</li>
            <li>Certified Bridal Specialist, Elite Beauty Academy</li>
            <li>Advanced Editorial Techniques, Paris Masterclass</li>
            <li>Hygiene & Sanitation Certification, Pro Beauty Standards</li>
          </ul>
          <h3 className="text-xl">{isSr ? "Usluge" : "Services"}</h3>
          <ul className="space-y-2 text-sm text-foreground/80">
            <li>Bridal Makeup</li>
            <li>Event / Red Carpet Makeup</li>
            <li>Photoshoot & Editorial Makeup</li>
            <li>Natural Signature Makeup</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
