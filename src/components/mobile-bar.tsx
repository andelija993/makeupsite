"use client";

import { useEffect, useState } from "react";
import { Sparkle } from "./brand";
import { WhatsAppIcon } from "./icons";
import { links } from "@/lib/site";

/** Traka na dnu ekrana (samo telefon) za brzo zakazivanje. */
export function MobileBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const booking = document.getElementById("rezervacija");
    let inBooking = false;
    const update = () => setShow(window.scrollY > window.innerHeight * 0.6 && !inBooking);
    const observer = new IntersectionObserver(([entry]) => {
      inBooking = entry.isIntersecting;
      update();
    });
    if (booking) observer.observe(booking);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bg/85 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl transition-transform duration-500 md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex gap-3">
        <a
          href="/#rezervacija"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gold py-3.5 text-xs uppercase tracking-[0.22em] text-gold-fg"
        >
          <Sparkle className="size-3" /> Zakaži termin
        </a>
        <a
          href={links.whatsapp("Zdravo Julija! Imam pitanje u vezi sa terminom.")}
          target="_blank"
          rel="noreferrer"
          aria-label="Pišite na WhatsApp"
          className="grid size-12 place-items-center rounded-full bg-[#25D366] text-white"
        >
          <WhatsAppIcon className="size-5" />
        </a>
      </div>
    </div>
  );
}
