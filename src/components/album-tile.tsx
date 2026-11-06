"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import type { Album } from "@/lib/media";
import { site } from "@/lib/site";
import { AlbumViewer } from "./album-viewer";

export const cover = (album: Album) => album.slides[0].poster ?? album.slides[0].src;

/** Stanje otvorenog albuma + prikaz pregledača. */
export function useAlbumViewer() {
  const [active, setActive] = useState<{ album: Album; origin: DOMRect } | null>(null);
  const open = useCallback((album: Album, el: HTMLElement) => setActive({ album, origin: el.getBoundingClientRect() }), []);
  const close = useCallback(() => setActive(null), []);
  const viewer = active ? (
    <AlbumViewer key={active.album.id} album={active.album} origin={active.origin} onClose={close} />
  ) : null;
  return { open, viewer, activeId: active?.album.id };
}

type TileProps = {
  album: Album;
  onOpen: (album: Album, el: HTMLElement) => void;
  hidden?: boolean;
  sizes: string;
  className?: string;
  priority?: boolean;
  children?: React.ReactNode;
};

export function AlbumTile({ album, onOpen, hidden, sizes, className = "", priority, children }: TileProps) {
  return (
    <button
      type="button"
      onClick={(e) => onOpen(album, e.currentTarget)}
      aria-label={album.type === "video" ? "Pusti video" : "Otvori objavu"}
      className={`group relative block w-full overflow-hidden bg-line/40 transition-opacity duration-300 ${
        hidden ? "opacity-0" : ""
      } ${className}`}
    >
      <Image
        src={cover(album)}
        alt={`${site.name} – šminka`}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
      />
      {album.type === "video" ? (
        <span className="absolute right-2.5 top-2.5 text-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
          <Play className="size-3.5 fill-current" strokeWidth={0} />
        </span>
      ) : null}
      {children}
    </button>
  );
}
