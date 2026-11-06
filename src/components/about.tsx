import { Reveal } from "./reveal";
import { SectionHeading } from "./brand";

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
      </div>
    </section>
  );
}
