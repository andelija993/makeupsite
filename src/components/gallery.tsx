"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Album } from "@/lib/media";
import { links, site } from "@/lib/site";
import { Reveal } from "./reveal";
import { SectionHeading } from "./brand";
import { InstagramIcon } from "./icons";
import { AlbumTile, useAlbumViewer } from "./album-tile";

// Telefon: jedna velika pa dve manje. Računar (4 kolone): velike se smenjuju u "šahovskom" rasporedu.
function layout(i: number) {
  const big = i % 3 === 0;
  return {
    big,
    li: big ? "col-span-2 md:row-span-2" : "col-span-1",
    tile: big ? "aspect-[4/5] rounded-[1.75rem]" : "aspect-[4/5] rounded-2xl",
  };
}

export function Gallery({ featured }: { featured: Album[] }) {
  const { open, viewer, activeId } = useAlbumViewer();

  return (
    <section id="galerija" className="bg-bg-soft pt-24 pb-12 md:pt-32 md:pb-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10">
        <Reveal>
          <SectionHeading
            eyebrow="Portfolio"
            title="Izdvojeni radovi"
            text="Mali izbor omiljenih trenutaka – od mladalačke svežine do venčanog sjaja."
          />
        </Reveal>

        {featured.length === 0 ? (
          <Reveal className="mx-auto mt-14 max-w-md rounded-[2rem] border border-dashed border-line bg-card p-10 text-center">
            <InstagramIcon className="mx-auto size-8 text-gold" />
            <p className="mt-4 text-fg-soft">Galerija se uskoro puni novim radovima. Do tada, pogledajte Instagram.</p>
          </Reveal>
        ) : (
          <ul className="mt-12 grid grid-flow-row-dense grid-cols-2 gap-2.5 sm:gap-4 md:mt-16 md:grid-cols-4 md:gap-5">
            {featured.map((album, i) => {
              const l = layout(i);
              return (
                <Reveal as="li" key={album.id} className={l.li} delay={(i % 3) * 90}>
                  <AlbumTile
                    album={album}
                    onOpen={open}
                    hidden={activeId === album.id}
                    sizes={l.big ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                    className={l.tile}
                    priority={i === 0}
                  >
                    {l.big ? (
                      <>
                        <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <span className="absolute inset-3 rounded-[1.4rem] border border-white/25 transition duration-700 group-hover:inset-4" />
                        <span className="absolute bottom-7 left-8 text-left text-white">
                          <span className="block font-serif text-xs tracking-[0.35em] text-white/75">
                            {String(i / 3 + 1).padStart(2, "0")}
                          </span>
                          {album.date ? (
                            <span className="mt-1 block font-script text-3xl capitalize text-[#e3b896] md:text-4xl">
                              {album.date}
                            </span>
                          ) : null}
                        </span>
                      </>
                    ) : null}
                  </AlbumTile>
                </Reveal>
              );
            })}
          </ul>
        )}

        <Reveal className="mt-10 flex flex-col items-center gap-5 text-center md:mt-12">
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-4 rounded-full border border-gold/60 py-2 pl-8 pr-2 transition hover:border-gold hover:bg-gold hover:text-gold-fg"
          >
            <span className="flex flex-col items-start leading-tight">
              <span className="text-xs uppercase tracking-[0.3em]">Portfolio</span>
              <span className="font-serif text-sm italic opacity-70">pogledajte još radova</span>
            </span>
            <span className="grid size-11 place-items-center rounded-full bg-gold text-gold-fg transition group-hover:bg-gold-fg group-hover:text-gold">
              <ArrowRight className="size-4 transition group-hover:translate-x-0.5" strokeWidth={1.5} />
            </span>
          </Link>
          <a
            href={links.instagram}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-fg-soft transition hover:text-gold"
          >
            <InstagramIcon className="size-4" />@{site.instagram}
          </a>
        </Reveal>
      </div>

      {viewer}
    </section>
  );
}
