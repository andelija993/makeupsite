import Link from "next/link";
import { siteConfig } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { getPreferences } from "@/lib/preferences";
import { getDictionary } from "@/lib/i18n";
import { PreferenceSwitches } from "@/components/layout/preference-switches";

export async function Navbar() {
  const { locale, theme } = await getPreferences();
  const t = getDictionary(locale);

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/portfolio", label: t.nav.portfolio },
    { href: "/services", label: t.nav.services },
    { href: "/blog", label: t.nav.blog },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-background/90 backdrop-blur">
      <div className="container-px mx-auto flex h-20 max-w-7xl items-center justify-between">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          {siteConfig.name}
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm hover:text-accent">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <PreferenceSwitches locale={locale} theme={theme} labels={t.switches} />
          <Button href="/booking" className="hidden md:inline-flex">
            {t.nav.booking}
          </Button>
        </div>
      </div>
    </header>
  );
}
