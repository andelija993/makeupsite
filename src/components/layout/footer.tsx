import Link from "next/link";
import { siteConfig } from "@/lib/constants";
import { getPreferences } from "@/lib/preferences";
import { getDictionary } from "@/lib/i18n";
import { requireSession } from "@/lib/auth";

export async function Footer() {
  const { locale } = await getPreferences();
  const t = getDictionary(locale);
  const sessionUserId = await requireSession();

  return (
    <footer className="border-t border-line/60 bg-card">
      <div className="container-px mx-auto max-w-7xl py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-lg font-semibold">{siteConfig.name}</h2>
            <p className="mt-2 max-w-md text-sm text-foreground/70">{siteConfig.description}</p>
          </div>
          <div className="flex flex-col gap-1 text-sm">
            <a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            <a href={siteConfig.instagram} target="_blank" rel="noreferrer">
              {t.footer.instagram}
            </a>
            {sessionUserId ? <Link href="/admin">{t.footer.admin}</Link> : null}
          </div>
        </div>
      </div>
    </footer>
  );
}
