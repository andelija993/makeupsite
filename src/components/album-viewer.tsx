"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Album } from "@/lib/media";
import { site } from "@/lib/site";
import { Sparkle } from "./brand";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const pad = (n: number) => String(n).padStart(2, "0");
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type Props = { album: Album; origin: DOMRect | null; onClose: () => void };

export function AlbumViewer({ album, origin, onClose }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const thumbs = useRef<HTMLDivElement>(null);
  const closing = useRef(false);
  const [index, setIndex] = useState(0);
  const count = album.slides.length;

  // Animacija "rasta" iz sličice u galeriji do velikog prikaza (i nazad).
  const morph = useCallback(
    (reverse: boolean) => {
      const el = stage.current;
      if (!el || !origin || reducedMotion()) return null;
      const r = el.getBoundingClientRect();
      const scale = origin.width / r.width;
      const dx = origin.left + origin.width / 2 - (r.left + r.width / 2);
      const dy = origin.top + origin.height / 2 - (r.top + r.height / 2);
      const from = { transform: `translate(${dx}px, ${dy}px) scale(${scale})`, opacity: 0.4 };
      const to = { transform: "none", opacity: 1 };
      return el.animate(reverse ? [to, from] : [from, to], { duration: reverse ? 450 : 750, easing: EASE, fill: "both" });
    },
    [origin],
  );

  useLayoutEffect(() => {
    morph(false);
  }, [morph]);

  const close = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    root.current?.setAttribute("data-closing", "");
    const anim =
      index === 0
        ? morph(true)
        : reducedMotion()
          ? null
          : stage.current?.animate([{ transform: "none", opacity: 1 }, { transform: "scale(0.9)", opacity: 0 }], {
              duration: 350,
              easing: EASE,
              fill: "both",
            });
    if (anim) anim.finished.then(onClose, onClose);
    else onClose();
  }, [index, morph, onClose]);

  const goTo = useCallback(
    (i: number) => {
      const el = track.current;
      if (!el) return;
      el.scrollTo({ left: Math.max(0, Math.min(count - 1, i)) * el.clientWidth, behavior: "smooth" });
    },
    [count],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") goTo(index + 1);
      if (e.key === "ArrowLeft") goTo(index - 1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [close, goTo, index]);

  useEffect(() => {
    track.current?.querySelectorAll("video").forEach((v) => {
      if (Number(v.dataset.index) !== index) return v.pause();
      v.play().catch(() => {
        v.muted = true;
        v.play().catch(() => {});
      });
    });
    const thumb = thumbs.current?.children[index] as HTMLElement | undefined;
    thumb?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [index]);

  return (
    <div
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label="Pregled objave"
      className="viewer group/viewer fixed inset-0 z-50 text-white"
    >
      {/* Zamućena, topla pozadina od trenutne fotografije */}
      <div className="viewer-backdrop absolute inset-0 overflow-hidden bg-[#0e0a08]" onClick={close}>
        {album.slides.map((slide, i) => (
          <Image
            key={slide.src}
            src={slide.poster ?? slide.src}
            alt=""
            fill
            sizes="96px"
            className={`scale-125 object-cover blur-3xl saturate-150 transition-opacity duration-1000 ${
              i === index ? "opacity-55" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,10,8,0.25)_0%,rgba(14,10,8,0.85)_75%)]" />
        <div className="grain absolute inset-0" />
      </div>

      <div className="pointer-events-none relative flex h-full flex-col items-center justify-center gap-4 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 sm:gap-5">
        <header className="viewer-chrome flex w-[min(92vw,calc((100dvh-16rem)*0.8),34rem)] items-end justify-between">
          <div className="leading-none">
            {album.date ? <p className="font-script text-3xl capitalize text-[#e3b896]">{album.date}</p> : null}
          </div>
          {count > 1 ? (
            <p className="font-serif text-lg tracking-widest text-white/80">
              {pad(index + 1)} <span className="text-[#e3b896]">—</span> {pad(count)}
            </p>
          ) : null}
        </header>

        <div className="pointer-events-auto relative">
          <div
            ref={stage}
            className="relative aspect-[4/5] w-[min(92vw,calc((100dvh-16rem)*0.8),34rem)] overflow-hidden rounded-[1.75rem] bg-black/40 shadow-[0_60px_120px_-30px_rgba(0,0,0,0.9)] ring-1 ring-[#e3b896]/25 will-change-transform"
          >
            <div
              ref={track}
              onScroll={(e) => setIndex(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
              className="flex size-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {album.slides.map((slide, i) => {
                const near = Math.abs(i - index) <= 1;
                return (
                  <div key={slide.src} className="relative size-full shrink-0 snap-center snap-always overflow-hidden">
                    <div
                      className={`absolute inset-0 transition duration-700 ${
                        i === index ? "scale-100 opacity-100" : "scale-[0.92] opacity-40"
                      }`}
                    >
                      {near ? (
                        <Image
                          src={slide.poster ?? slide.src}
                          alt=""
                          fill
                          sizes="64px"
                          className="scale-110 object-cover opacity-60 blur-2xl"
                        />
                      ) : null}
                      {slide.type === "image" ? (
                        <Image
                          src={slide.src}
                          alt={`${site.name} – fotografija ${i + 1}`}
                          fill
                          sizes="(min-width: 640px) 34rem, 92vw"
                          priority={i === 0}
                          className="object-contain"
                        />
                      ) : (
                        <video
                          data-index={i}
                          src={near ? slide.src : undefined}
                          poster={slide.poster}
                          controls
                          playsInline
                          loop
                          preload="metadata"
                          className="absolute inset-0 size-full object-contain"
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {count > 1 ? (
            <>
              <button
                type="button"
                onClick={() => goTo(index - 1)}
                disabled={index === 0}
                aria-label="Prethodna"
                className="viewer-chrome absolute left-2 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-black/25 backdrop-blur-md transition hover:border-[#e3b896] hover:text-[#e3b896] disabled:pointer-events-none disabled:opacity-0 sm:-left-20 sm:size-12 sm:bg-white/5"
              >
                <ChevronLeft className="size-5" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={() => goTo(index + 1)}
                disabled={index === count - 1}
                aria-label="Sledeća"
                className="viewer-chrome absolute right-2 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-black/25 backdrop-blur-md transition hover:border-[#e3b896] hover:text-[#e3b896] disabled:pointer-events-none disabled:opacity-0 sm:-right-20 sm:size-12 sm:bg-white/5"
              >
                <ChevronRight className="size-5" strokeWidth={1.5} />
              </button>
            </>
          ) : null}
        </div>

        {album.caption ? (
          <p className="viewer-chrome line-clamp-2 w-[min(92vw,34rem)] whitespace-pre-line text-center font-serif text-lg italic leading-snug text-white/85 sm:text-xl">
            {album.caption}
          </p>
        ) : (
          <div className="viewer-chrome flex items-center gap-3 text-[#e3b896]" aria-hidden>
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#e3b896]/70" />
            <Sparkle className="size-3" />
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#e3b896]/70" />
          </div>
        )}

        {count > 1 ? (
          <div
            ref={thumbs}
            className="viewer-chrome pointer-events-auto flex max-w-[92vw] gap-2 overflow-x-auto px-1 py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {album.slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Prikaži ${i + 1}. od ${count}`}
                className={`relative h-14 w-11 shrink-0 overflow-hidden rounded-lg transition duration-500 ${
                  i === index ? "opacity-100 ring-2 ring-[#e3b896] ring-offset-2 ring-offset-black/60" : "opacity-45 hover:opacity-80"
                }`}
              >
                <Image src={slide.poster ?? slide.src} alt="" fill sizes="44px" className="object-cover" />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <button
        type="button"
        onClick={close}
        aria-label="Zatvori"
        className="viewer-chrome absolute right-3 top-3 grid size-11 place-items-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md transition hover:rotate-90 hover:border-[#e3b896] hover:text-[#e3b896] sm:right-6 sm:top-6"
      >
        <X className="size-5" strokeWidth={1.5} />
      </button>
    </div>
  );
}
