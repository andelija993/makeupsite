import type { Metadata } from "next";
import { getPortfolio } from "@/lib/data";
import { Gallery } from "@/components/shared/gallery";
import { getPreferences } from "@/lib/preferences";
import { getDictionary } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Explore bridal, evening, natural, photoshoot, and before-after makeup gallery.",
};

export default async function PortfolioPage() {
  const items = await getPortfolio();
  const { locale } = await getPreferences();
  const t = getDictionary(locale);
  const isSr = locale === "sr";

  return (
    <div className="section container-px mx-auto max-w-7xl">
      <p className="text-xs uppercase tracking-[0.25em] text-accent">{isSr ? "Portfolio" : "Portfolio"}</p>
      <h1 className="mt-3 text-5xl">
        {isSr ? "Pažljivo odabrana galerija luksuznih makeup look-ova." : "A curated gallery of luxury makeup looks."}
      </h1>
      <p className="mt-4 max-w-3xl text-foreground/75">
        {isSr ? "Filtrirajte po kategoriji i otvorite svaki look u lightbox prikazu." : "Filter by category and open each look in a lightbox preview."}
      </p>
      <div className="mt-10">
        <Gallery items={items} labels={{ all: isSr ? "SVE" : "ALL", close: t.common.close }} />
      </div>
    </div>
  );
}
