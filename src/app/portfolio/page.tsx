import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MobileBar } from "@/components/mobile-bar";
import { Divider } from "@/components/brand";
import { Portfolio } from "@/components/portfolio";
import { getAlbums } from "@/lib/media";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Portfolio | ${site.name}`,
  description: `Izbor radova – šminka za mladenke, proslave i posebne prilike. ${site.name}, ${site.cities.join(" i ")}.`,
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  const years = new Map<string, ReturnType<typeof getAlbums>>();
  for (const album of getAlbums()) {
    const year = /^\d{4}/.exec(album.id)?.[0] ?? "Ostalo";
    years.set(year, [...(years.get(year) ?? []), album]);
  }

  return (
    <>
      <Navbar />
      <main className="pt-28 md:pt-36">
        <header className="mx-auto flex max-w-2xl flex-col items-center px-5 pb-12 text-center md:pb-16">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-fg-soft transition hover:text-gold"
          >
            <ArrowLeft className="size-3.5" strokeWidth={1.5} /> Početna
          </Link>
          <span className="font-script text-3xl text-gold md:text-4xl">Portfolio</span>
          <h1 className="mt-1 font-serif text-5xl font-light leading-tight md:text-7xl">Izbor radova</h1>
          <Divider className="mt-5" />
          <p className="mt-5 text-base leading-relaxed text-fg-soft md:text-lg">
            Svaka objava je jedna priča. Dodirnite fotografiju da otvorite ceo album.
          </p>
        </header>
        <Portfolio years={[...years].map(([year, albums]) => ({ year, albums }))} />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
