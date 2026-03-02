import Link from "next/link";
import Image from "next/image";
import { SectionHeading } from "./SectionHeading";
import { getPublicContactInfo } from "@/actions/database/public";

const FALLBACK_BIO = [
  "Ich bin Bene – Tattoo-Artist mit Leidenschaft für präzise Linien, realistische Darstellungen und ausdrucksstarke Schwarz-Weiß-Arbeiten.",
  "Für mich ist jedes Tattoo eine Zusammenarbeit: Deine Idee, meine Umsetzung. Gemeinsam erschaffen wir etwas, das dich ein Leben lang begleitet.",
  "Qualität, Hygiene und ein entspanntes Studio-Erlebnis stehen bei mir an erster Stelle.",
];

export async function AboutSection(): Promise<React.JSX.Element> {
  const contact = await getPublicContactInfo();
  const paragraphs = contact.about
    ? contact.about.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split(/\n{2,}/).filter(Boolean)
    : FALLBACK_BIO;

  return (
    <section className="py-20 px-6 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Artist-Foto */}
          <div className="relative">
            <div className="aspect-4/5 rounded-2xl bg-surface-muted overflow-hidden">
              {contact.artistPhoto ? (
                <Image
                  src={contact.artistPhoto}
                  alt="Bene – Tattoo Artist"
                  fill
                  className="object-cover rounded-2xl"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-foreground-subtle text-sm">
                  Artist-Foto
                </div>
              )}
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-accent/10 -z-10" />
            <div className="absolute -top-4 -left-4 w-16 h-16 rounded-xl bg-sand/20 -z-10" />
          </div>

          {/* Text */}
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="Über mich"
              title="Kunst, die unter die Haut geht."
            />
            <div className="flex flex-col gap-4 text-foreground-muted leading-relaxed">
              {paragraphs.map((p, i) => (
                <p key={i} className="whitespace-pre-line">{p}</p>
              ))}
            </div>
            <Link
              href="/kontakt"
              className="self-start px-6 py-3.5 rounded-xl bg-anthrazit text-white font-medium hover:bg-anthrazit-light transition-colors duration-200"
            >
              Jetzt anfragen
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
