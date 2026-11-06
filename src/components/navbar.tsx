"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./brand";
import { ThemeToggle } from "./theme-toggle";

const nav = [
  { href: "/#o-meni", label: "O meni" },
  { href: "/#galerija", label: "Galerija" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/#rezervacija", label: "Rezervacija" },
  { href: "/#kontakt", label: "Kontakt" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled || open ? "border-b border-line/70 bg-bg/80 py-2 backdrop-blur-xl" : "py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-10">
        <a href="/#" aria-label="Početak" className="text-[15px]" onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative text-[13px] uppercase tracking-[0.2em] text-fg-soft transition hover:text-fg"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="/#rezervacija"
            className="hidden rounded-full bg-fg px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-bg transition hover:bg-gold hover:text-gold-fg md:inline-block"
          >
            Zakaži termin
          </a>
          <button
            type="button"
            aria-label={open ? "Zatvori meni" : "Otvori meni"}
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-full border border-line md:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      <div
        className={`grid overflow-hidden transition-all duration-500 md:hidden ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <nav className="min-h-0">
          <ul className="flex h-[calc(100dvh-4rem)] flex-col items-center justify-center gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setOpen(false)} className="font-serif text-4xl font-light">
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/#rezervacija"
                onClick={() => setOpen(false)}
                className="mt-4 inline-block rounded-full bg-gold px-8 py-3.5 text-xs uppercase tracking-[0.25em] text-gold-fg"
              >
                Zakaži termin
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
