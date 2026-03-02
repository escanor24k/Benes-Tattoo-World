import Link from "next/link";
import { SectionHeading } from "./SectionHeading";

const STYLES = [
  {
    id: "fineline",
    label: "Fineline",
    description:
      "Hauchzarte, präzise Linien. Minimalistisch und doch ausdrucksstark – ideal für botanische Motive, Portraits und geometrische Designs.",
    color: "var(--color-sand)",
  },
  {
    id: "realistic",
    label: "Realistic",
    description:
      "Fotorealistische Darstellungen, die auf der Haut zum Leben erwachen. Portraits, Tiere, Natur – mit Tiefe, Licht und Schatten.",
    color: "var(--color-accent)",
  },
  {
    id: "blackandwhite",
    label: "Black'n'White",
    description:
      "Starke Kontraste, kräftige Schatten, zeitlose Ästhetik. Schwarz und Weiß als kraftvolle Kunstform – klassisch und modern zugleich.",
    color: "var(--color-anthrazit)",
  },
];

export function StylesSection(): React.JSX.Element {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <SectionHeading
            eyebrow="Spezialisierungen"
            title="Drei Stile. Eine Leidenschaft."
            subtitle="Jedes Tattoo ist ein Unikat – angepasst an deine Persönlichkeit und deine Geschichte."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STYLES.map((style) => (
            <div
              key={style.id}
              className="group card p-8 hover:shadow-[var(--shadow-md)] transition-shadow duration-300"
            >
              <div
                className="w-10 h-1 rounded-full mb-6 transition-all duration-300 group-hover:w-16"
                style={{ backgroundColor: style.color }}
              />
              <h3 className="font-display text-2xl font-bold text-anthrazit mb-3">
                {style.label}
              </h3>
              <p className="text-foreground-muted text-sm leading-relaxed mb-6">
                {style.description}
              </p>
              <Link
                href={`/portfolio?style=${style.id}`}
                className="text-sm font-medium text-accent hover:underline underline-offset-4"
              >
                Arbeiten ansehen →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
