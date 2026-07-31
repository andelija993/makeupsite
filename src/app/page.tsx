import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getPortfolio } from "@/lib/data";
import { getPreferences } from "@/lib/preferences";

const testimonials = [
  {
    name: "Sophia R.",
    text: "Every detail felt couture. My bridal makeup stayed flawless for 14 hours and looked perfect in every photo.",
  },
  {
    name: "Emma L.",
    text: "Elegant, modern, and exactly what I wanted. The process felt premium from consultation to final look.",
  },
  {
    name: "Mila K.",
    text: "The most refined glam makeup I have ever had. Soft, polished, and still looked like me.",
  },
];

export default async function Home() {
  const { locale } = await getPreferences();
  const isSr = locale === "sr";
  const portfolio = await getPortfolio();
  const featured = portfolio.slice(0, 4);

  return (
    <div className="fade-in">
      <section className="section container-px mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-accent">{isSr ? "Luksuzna Makeup Umetnost" : "Luxury Makeup Artistry"}</p>
          <h1 className="mt-5 text-5xl leading-tight md:text-6xl">
            {isSr ? "Rafinirana lepota za vaše nezaboravne trenutke." : "Refined beauty for your most unforgettable moments."}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-foreground/75">
            {isSr
              ? "Premium bridal, glam, natural i editorial makeup by Luna Atelier. Elegantni finiš, camera-ready koža i bezvremena umetnost."
              : "Premium bridal, glam, natural, and editorial makeup by Luna Atelier. Elegant finishes, camera-ready skin, and timeless artistry."}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/booking">{isSr ? "Zakaži termin" : "Book Appointment"}</Button>
            <Button href="/portfolio" variant="secondary">
              {isSr ? "Pogledaj portfolio" : "View Portfolio"}
            </Button>
          </div>
        </div>
        <div className="relative h-[520px] overflow-hidden rounded-[2rem] border border-line elevated">
          <Image
            src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1400&q=80"
            alt="Professional bridal makeup"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      <section className="section container-px mx-auto max-w-7xl">
        <div className="rounded-[2rem] border border-line bg-card p-8 md:p-12">
          <p className="text-xs uppercase tracking-[0.25em] text-accent">{isSr ? "O meni" : "About"}</p>
          <h2 className="mt-3 text-4xl">{isSr ? "Personalizovano luksuzno beauty iskustvo." : "A personalized luxury beauty experience."}</h2>
          <p className="mt-4 max-w-3xl text-foreground/75">
            {isSr
              ? "Sa više od 10 godina iskustva u bridal, fashion i editorial beauty svetu, Luna spaja tehničku preciznost i intuitivan pristup fokusiran na zdravu i blistavu kožu."
              : "With over 10 years of artistry in bridal, fashion, and editorial beauty, Luna combines technical precision with an intuitive, skin-first approach to elevate your natural features."}
          </p>
          <Button href="/about" variant="secondary" className="mt-6">
            {isSr ? "Upoznajte moju priču" : "Discover My Story"}
          </Button>
        </div>
      </section>

      <section className="section container-px mx-auto max-w-7xl">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-accent">Portfolio</p>
            <h2 className="mt-2 text-4xl">{isSr ? "Istaknuti makeup look-ovi" : "Featured Makeup Looks"}</h2>
          </div>
          <Button href="/portfolio" variant="ghost">
            {isSr ? "Ceo portfolio" : "Full Portfolio"}
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((item) => (
            <article key={item.id} className="overflow-hidden rounded-3xl border border-line bg-card">
              <div className="relative h-72">
                <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
              </div>
              <div className="p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-accent">{item.category.replace("_", " ")}</p>
                <h3 className="mt-2 text-lg">{item.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section container-px mx-auto max-w-7xl">
        <p className="text-xs uppercase tracking-[0.25em] text-accent">{isSr ? "Utisci klijenata" : "Testimonials"}</p>
        <h2 className="mt-2 text-4xl">{isSr ? "Omiljena među mlada-ma i modernim beauty klijentima." : "Loved by brides and modern beauty clients."}</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article key={testimonial.name} className="rounded-3xl border border-line bg-card p-6">
              <p className="text-foreground/80">{testimonial.text}</p>
              <p className="mt-4 text-sm font-semibold">{testimonial.name}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section container-px mx-auto max-w-7xl">
        <div className="rounded-[2rem] border border-line bg-champagne p-8 md:p-12">
          <h2 className="text-4xl">{isSr ? "Pratite najnovije look-ove na Instagramu" : "Follow the latest looks on Instagram"}</h2>
          <p className="mt-3 text-foreground/75">
            {isSr ? "Behind-the-scenes bridal jutra, editorijali i beauty transformacije." : "Behind-the-scenes bridal mornings, editorials, and beauty transformations."}
          </p>
          <Button href="https://instagram.com" className="mt-6">
            @lunaatelierbeauty
          </Button>
        </div>
      </section>

      <section className="section container-px mx-auto max-w-7xl pt-0">
        <div className="rounded-[2rem] border border-line bg-foreground p-10 text-background">
          <h2 className="text-4xl">{isSr ? "Rezervišite svoj termin" : "Reserve your appointment"}</h2>
          <p className="mt-3 max-w-2xl text-background/80">
            {isSr
              ? "Obezbedite svoj datum za bridal događaje, editorial projekte i makeup za posebne prilike."
              : "Secure your date for bridal events, editorial projects, and elevated occasion makeup."}
          </p>
          <Button href="/booking" variant="secondary" className="mt-6 border-background bg-background text-foreground">
            {isSr ? "Zakaži termin" : "Book Appointment"}
          </Button>
        </div>
      </section>
    </div>
  );
}
