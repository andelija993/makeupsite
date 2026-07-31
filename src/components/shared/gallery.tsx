"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type GalleryItem = {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  category: string;
  createdAt: Date;
};

type GalleryProps = {
  items: GalleryItem[];
  labels?: {
    all: string;
    close: string;
  };
};

const filters = ["ALL", "BRIDAL", "EVENING", "NATURAL", "PHOTOSHOOT", "BEFORE_AFTER"];

export function Gallery({ items, labels }: GalleryProps) {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(
    () => items.filter((item) => activeFilter === "ALL" || item.category === activeFilter),
    [activeFilter, items],
  );

  const openedItem = filtered.find((item) => item.id === openId);

  const allLabel = labels?.all ?? "ALL";
  const closeLabel = labels?.close ?? "Close";

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-3">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={cn(
              "rounded-full border px-4 py-2 text-xs tracking-wider",
              activeFilter === filter ? "border-foreground bg-foreground text-background" : "border-line",
            )}
          >
            {filter === "ALL" ? allLabel : filter.replace("_", " ")}
          </button>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <button
            key={item.id}
            className="group relative h-80 overflow-hidden rounded-3xl border border-line"
            onClick={() => setOpenId(item.id)}
          >
            <Image src={item.imageUrl} alt={item.title} fill className="object-cover transition duration-300 group-hover:scale-105" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 p-5 text-left text-white">
              <p className="text-xs tracking-[0.2em]">{item.category.replace("_", " ")}</p>
              <h3 className="mt-2 text-lg">{item.title}</h3>
              <p className="mt-1 text-xs">{new Date(item.createdAt).toLocaleDateString()}</p>
            </div>
          </button>
        ))}
      </div>

      {openedItem ? (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-black/75 p-5" role="dialog" aria-modal="true">
          <div className="relative w-full max-w-4xl rounded-2xl bg-card p-4">
            <button onClick={() => setOpenId(null)} className="absolute right-4 top-4 rounded-full bg-foreground px-3 py-1 text-background">
              {closeLabel}
            </button>
            <div className="relative h-[70vh] w-full overflow-hidden rounded-xl">
              <Image src={openedItem.imageUrl} alt={openedItem.title} fill className="object-contain bg-black/10" />
            </div>
            <div className="mt-4 px-2 pb-2">
              <h4 className="text-xl">{openedItem.title}</h4>
              <p className="mt-2 text-sm text-foreground/80">{openedItem.description}</p>
              <p className="mt-2 text-xs text-foreground/65">{new Date(openedItem.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
