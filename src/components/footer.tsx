import { MapPin, Phone } from "lucide-react";
import { links, site } from "@/lib/site";
import { Divider, Logo, Sparkle } from "./brand";
import { InstagramIcon, ViberIcon, WhatsAppIcon } from "./icons";

const contacts = [
  { href: links.instagram, label: `@${site.instagram}`, icon: InstagramIcon, external: true },
  { href: links.whatsapp(), label: "WhatsApp", icon: WhatsAppIcon, external: true },
  { href: links.viber, label: "Viber", icon: ViberIcon, external: false },
  { href: links.tel, label: site.phoneDisplay, icon: Phone, external: false },
];

export function Footer() {
  return (
    <footer id="kontakt" className="border-t border-line bg-bg-soft pb-28 pt-20 md:pb-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-5 text-center md:px-10">
        <Logo className="text-3xl" />
        <Divider className="mt-6" />
        <p className="mt-6 flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-fg-soft">
          <MapPin className="size-4 text-gold" />
          {site.cities.join(" · ")}
        </p>

        <ul className="mt-10 grid w-full max-w-2xl grid-cols-2 gap-3 md:grid-cols-4">
          {contacts.map((c) => (
            <li key={c.label}>
              <a
                href={c.href}
                {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}
                className="flex h-full flex-col items-center gap-2 rounded-2xl border border-line bg-card px-3 py-5 text-sm transition hover:border-gold hover:text-gold"
              >
                <c.icon className="size-5 text-gold" />
                <span className="break-all">{c.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-14 flex w-full max-w-md flex-col items-center gap-5">
          <div className="flex w-full items-center gap-4 text-gold/70" aria-hidden>
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-line" />
            <Sparkle className="size-2.5" />
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-line" />
          </div>

          <Credit />

          <p className="text-[10px] uppercase tracking-[0.3em] text-fg-soft/60">
            © {new Date().getFullYear()} {site.name} · Sva prava zadržana
          </p>
        </div>
      </div>
    </footer>
  );
}

function Credit() {
  const inner = (
    <>
      <span className="text-[10px] uppercase tracking-[0.35em] text-fg-soft/70">Dizajn i izrada sajta</span>
      <span className="font-script text-3xl leading-none text-gradient-gold transition duration-500 group-hover:tracking-wide">
        {site.author.name}
      </span>
    </>
  );
  const cls = "group flex flex-col items-center gap-1.5";
  return site.author.url ? (
    <a href={site.author.url} target="_blank" rel="noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <p className={cls}>{inner}</p>
  );
}
