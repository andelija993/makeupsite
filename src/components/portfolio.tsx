"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Album } from "@/lib/media";
import { Divider, Sparkle } from "./brand";
import { AlbumTile, useAlbumViewer } from "./album-tile";

type Year = { year: string; albums: Album[] };

export function Portfolio({ years }: { years: Year[] }) {
  const { open, viewer, activeId } = useAlbumViewer();
  const [current, setCurrent] = useState(years[0]?.year);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setCurrent(e.target.id.replace("godina-", ""))),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    years.forEach((y) => {
      const el = document.getElementById(`godina-${y.year}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [years]);

  return (
    <>
      <nav
        aria-label="Godine"
        className="sticky top-[3.8rem] z-30 overflow-x-auto border-y border-line/70 bg-bg/80 backdrop-blur-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <ul className="mx-auto flex w-max gap-1 px-4 py-2">
          {years.map((y) => (
            <li key={y.year}>
              <a
                href={`#godina-${y.year}`}
                className={`block rounded-full px-4 py-2 font-serif text-lg transition ${
                  current === y.year ? "bg-gold text-gold-fg" : "text-fg-soft hover:text-fg"
                }`}
              >
                {y.year}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mx-auto max-w-6xl px-3 sm:px-6 md:px-10">
        {years.map((y) => (
          <section key={y.year} id={`godina-${y.year}`} className="scroll-mt-36 pt-16 md:pt-24">
            <header className="mb-8 flex items-end justify-between gap-4 border-b border-line px-1 pb-4 md:mb-10">
              <h2 className="font-serif text-5xl font-light leading-none md:text-7xl">{y.year}</h2>
              <p className="pb-1 text-[11px] uppercase tracking-[0.3em] text-fg-soft">
                {y.albums.length} {y.albums.length % 10 === 1 && y.albums.length % 100 !== 11 ? "rad" : "radova"}
              </p>
            </header>
            <ul className="grid grid-cols-3 gap-1.5 sm:gap-3 md:grid-cols-4 md:gap-4">
              {y.albums.map((album) => (
                <li key={album.id} className="[content-visibility:auto] [contain-intrinsic-size:auto_300px]">
                  <AlbumTile
                    album={album}
                    onOpen={open}
                    hidden={activeId === album.id}
                    sizes="(min-width: 768px) 25vw, 33vw"
                    className="aspect-[4/5] rounded-lg md:rounded-2xl"
                  />
                </li>
              ))}
            </ul>
          </section>
        ))}

        <div className="flex flex-col items-center px-4 py-24 text-center md:py-32">
          <Divider />
          <p className="mt-6 font-script text-4xl text-gold md:text-5xl">Vaš red je sledeći</p>
          <p className="mt-3 max-w-sm text-fg-soft">Zakažite termin i postanite deo ove kolekcije.</p>
          <Link
            href="/#rezervacija"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-xs uppercase tracking-[0.25em] text-gold-fg transition hover:opacity-90"
          >
            <Sparkle className="size-3" /> Zakaži termin
          </Link>
        </div>
      </div>

      {viewer}
    </>
  );
}
