export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex flex-col items-center leading-none ${className}`}>
      <span className="font-script text-gradient-gold text-[1.9em] leading-[0.7]">Mua</span>
      <span className="font-serif text-gradient-gold text-[1.05em] font-medium tracking-[0.12em]">JULIJA</span>
      <span className="mt-[0.15em] font-sans text-[0.42em] tracking-[0.55em] text-fg-soft">NESIĆ</span>
    </span>
  );
}

export function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" />
    </svg>
  );
}

export function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 text-gold ${className}`} aria-hidden>
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold/70" />
      <Sparkle className="size-3" />
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold/70" />
    </div>
  );
}

export function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: React.ReactNode; text?: string }) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
      <span className="font-script text-3xl text-gold md:text-4xl">{eyebrow}</span>
      <h2 className="mt-1 font-serif text-4xl font-light leading-tight md:text-6xl">{title}</h2>
      <Divider className="mt-5" />
      {text ? <p className="mt-5 text-base leading-relaxed text-fg-soft md:text-lg">{text}</p> : null}
    </div>
  );
}
