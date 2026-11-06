import { Clock, Gem, HeartHandshake } from "lucide-react";
import { Reveal } from "./reveal";
import { SectionHeading } from "./brand";

const features = [
  {
    icon: Gem,
    title: "Premium kozmetika",
    text: "Radim isključivo sa proverenim, kvalitetnim proizvodima koji su nežni prema koži.",
  },
  {
    icon: Clock,
    title: "Dugotrajan efekat",
    text: "Šminka koja ostaje besprekorna od jutra do kasno u noć – i na fotografijama i uživo.",
  },
  {
    icon: HeartHandshake,
    title: "Individualan pristup",
    text: "Svaki izgled kreiram prema vašim željama, crtama lica i stilu prilike.",
  },
];

export function About() {
  return (
    <section id="o-meni" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Reveal>
          <SectionHeading
            eyebrow="Zdravo, ja sam Julija"
            title={
              <>
                Šminka je moj način da <em className="text-gold">istaknem vašu lepotu</em>
              </>
            }
            text="Verujem da je najlepša šminka ona u kojoj se osećate kao najbolja verzija sebe. Bilo da je u pitanju venčanje, matura ili fotografisanje, posvećujem se svakom detalju kako biste blistali."
          />
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 120}>
              <article className="group h-full rounded-[2rem] border border-line bg-card p-8 transition duration-500 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_30px_60px_-35px_var(--gold)]">
                <span className="grid size-14 place-items-center rounded-full bg-bg-soft text-gold transition duration-500 group-hover:bg-gold group-hover:text-gold-fg">
                  <f.icon className="size-6" strokeWidth={1.4} />
                </span>
                <h3 className="mt-6 font-serif text-2xl">{f.title}</h3>
                <p className="mt-3 leading-relaxed text-fg-soft">{f.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
