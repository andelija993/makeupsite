"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import type { MediaItem } from "@/lib/media";
import { links, site } from "@/lib/site";
import { Reveal } from "./reveal";
import { SectionHeading } from "./brand";
import { InstagramIcon } from "./icons";

const PAGE = 12;
const filters = [
  { id: "all", label: "Sve" },
  { id: "image", label: "Fotografije" },
  { id: "video", label: "Video" },
] as const;
type Filter = (typeof filters)[number]["id"];

function VideoThumb({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={`${src}#t=0.1`}
      muted
      loop
      playsInline
      preload="metadata"
      className="absolute inset-0 size-full object-cover"
    />
  );
}

export function Gallery({ items }: { items: MediaItem[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [visible, setVisible] = useState(PAGE);
  const [active, setActive] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);

  const filtered = filter === "all" ? items : items.filter((i) => i.type === filter);
  const shown = filtered.slice(0, visible);
  const hasVideo = items.some((i) => i.type === "video");
  const hasImage = items.some((i) => i.type === "image");

  const close = useCallback(() => setActive(null), []);
  const go = useCallback(
    (dir: 1 | -1) => setActive((i) => (i === null ? i : (i + dir + filtered.length) % filtered.length)),
    [filtered.length],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close, go]);

  const current = active === null ? null : filtered[active];

  return (
    <section id="galerija" className="bg-bg-soft py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-3 sm:px-5 md:px-10">
        <Reveal>
          <SectionHeading
            eyebrow="Portfolio"
            title="Moji radovi"
            text="Deo transformacija i trenutaka koje sam imala čast da stvorim. Kliknite na fotografiju za pun prikaz."
          />
        </Reveal>

        {hasVideo && hasImage ? (
          <div className="mt-10 flex justify-center">
            <div className="inline-flex rounded-full border border-line bg-card p-1">
              {filters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => {
                    setFilter(f.id);
                    setVisible(PAGE);
                  }}
                  className={`rounded-full px-5 py-2.5 text-xs uppercase tracking-[0.18em] transition sm:px-6 ${
                    filter === f.id ? "bg-gold text-gold-fg" : "text-fg-soft hover:text-fg"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {items.length === 0 ? (
          <Reveal className="mx-auto mt-14 max-w-md rounded-[2rem] border border-dashed border-line bg-card p-10 text-center">
            <InstagramIcon className="mx-auto size-8 text-gold" />
            <p className="mt-4 text-fg-soft">Galerija se uskoro puni novim radovima. Do tada, pogledajte Instagram.</p>
          </Reveal>
        ) : (
          <ul className="mt-10 grid grid-cols-2 gap-1.5 sm:gap-3 md:mt-14 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {shown.map((item, i) => (
              <li key={item.src} className="fade-up" style={{ animationDelay: `${(i % PAGE) * 40}ms` }}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={item.type === "video" ? "Pusti video" : "Otvori fotografiju"}
                  className="group relative block aspect-[4/5] w-full overflow-hidden rounded-xl bg-line/40 sm:rounded-2xl"
                >
                  {item.type === "image" ? (
                    <Image
                      src={item.src}
                      alt={`${site.name} – rad ${i + 1}`}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <>
                      <VideoThumb src={item.src} />
                      <span className="absolute right-2.5 top-2.5 grid size-8 place-items-center rounded-full bg-black/40 text-white backdrop-blur">
                        <Play className="size-3.5 fill-current" />
                      </span>
                    </>
                  )}
                  <span className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {visible < filtered.length ? (
            <button
              type="button"
              onClick={() => setVisible((v) => v + PAGE)}
              className="w-full rounded-full bg-fg px-8 py-4 text-xs uppercase tracking-[0.25em] text-bg transition hover:bg-gold hover:text-gold-fg sm:w-auto"
            >
              Prikaži još
            </button>
          ) : null}
          <a
            href={links.instagram}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-line px-8 py-4 text-xs uppercase tracking-[0.25em] transition hover:border-gold hover:text-gold sm:w-auto"
          >
            <InstagramIcon className="size-4" />@{site.instagram}
          </a>
        </div>
      </div>

      {current ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={close}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <div className="relative h-[85dvh] w-full max-w-5xl px-2" onClick={(e) => e.stopPropagation()}>
            {current.type === "image" ? (
              <Image src={current.src} alt="" fill sizes="100vw" className="object-contain" />
            ) : (
              <video
                key={current.src}
                src={current.src}
                controls
                autoPlay
                playsInline
                className="size-full object-contain"
              />
            )}
          </div>

          <button
            type="button"
            onClick={close}
            aria-label="Zatvori"
            className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X className="size-5" />
          </button>
          {filtered.length > 1 ? (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
                aria-label="Prethodna"
                className="absolute left-3 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:grid"
              >
                <ChevronLeft className="size-6" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
                aria-label="Sledeća"
                className="absolute right-3 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:grid"
              >
                <ChevronRight className="size-6" />
              </button>
              <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs tracking-[0.3em] text-white/70">
                {active! + 1} / {filtered.length}
              </p>
            </>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
