import { Sparkle } from "./brand";

const words = ["Mladenačka šminka", "Večernja šminka", "Maturska šminka", "Prirodan sjaj", "Fotografisanja", "Posebne prilike"];

export function Marquee() {
  const row = [...words, ...words];
  return (
    <div className="overflow-hidden border-y border-line bg-bg-soft py-5" aria-hidden>
      <div className="animate-marquee flex w-max items-center gap-10">
        {row.map((word, i) => (
          <span key={i} className="flex items-center gap-10 font-serif text-2xl font-light italic text-fg-soft md:text-3xl">
            {word}
            <Sparkle className="size-3 text-gold" />
          </span>
        ))}
      </div>
    </div>
  );
}
