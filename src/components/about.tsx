import { Reveal } from "./reveal";
import { SectionHeading } from "./brand";

export function About() {
  return (
    <section id="o-meni" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Reveal>
          <SectionHeading
            eyebrow="O meni"
            title={
              <>
                Ćao, ja sam <em className="text-gold">Julija Nešić</em>
              </>
            }
          />
        </Reveal>

        <Reveal delay={120} className="mx-auto mt-8 max-w-2xl space-y-5 text-center text-base leading-relaxed text-fg-soft md:text-lg">
          <p>
            Profesionalnim šminkanjem bavim se više od 5 godina, a iza sebe imam mnogo zadovoljnih klijentkinja,
            različitih makeup look-ova i dragocenog iskustva. Svoje znanje sam usavršavala i kroz edukacije kod poznatih
            makeup artista <span className="text-fg">Bojana Vukadinova</span> i{" "}
            <span className="text-fg">Stefana Subotića</span>.
          </p>
          <p className="font-serif text-xl italic leading-snug text-fg md:text-2xl">
            Najviše volim da kroz šminku istaknem ono najlepše na svakoj ženi i učinim da se oseća lepo, posebno i
            samouvereno.
          </p>
          <p>
            Ako želiš da zablistaš za neku posebnu priliku ili jednostavno želiš da se prepustiš profesionalnom
            šminkanju, <span className="font-script text-3xl text-gold">tu sam za tebe!</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
