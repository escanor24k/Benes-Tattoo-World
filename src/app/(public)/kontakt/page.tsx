import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { Phone, Clock, Mail } from "lucide-react";
import { getPublicContactInfo, getPublicOpeningHours } from "@/actions/database/public";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Termin anfragen oder Fragen stellen – ich freue mich auf deine Nachricht.",
};

export default async function KontaktPage(): Promise<React.JSX.Element> {
  const [contact, hours] = await Promise.all([
    getPublicContactInfo(),
    getPublicOpeningHours(),
  ]);

  return (
    <div className="py-16 px-6 bg-background min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
            Kontakt
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-anthrazit mb-4">
            Lass uns reden.
          </h1>
          <p className="text-foreground-muted text-lg max-w-xl">
            Du hast eine Idee, eine Frage oder möchtest einen Termin anfragen?
            Schreib mir – ich antworte so schnell wie möglich.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-2 flex flex-col gap-4">
            {(contact.phone || contact.email) && (
              <div className="card p-6 flex flex-col gap-4">
                <p className="font-semibold text-anthrazit">Direkt erreichen</p>

                {contact.phone && (
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-3 text-sm text-foreground-muted hover:text-accent transition-colors duration-200"
                  >
                    <Phone size={16} strokeWidth={1.5} className="shrink-0 text-accent" />
                    {contact.phone}
                  </a>
                )}

                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-3 text-sm text-foreground-muted hover:text-accent transition-colors duration-200"
                  >
                    <Mail size={16} strokeWidth={1.5} className="shrink-0 text-accent" />
                    {contact.email}
                  </a>
                )}
              </div>
            )}

            {hours.length > 0 && (
              <div className="card p-6 flex flex-col gap-4">
                <div className="flex items-center gap-2.5">
                  <Clock size={16} strokeWidth={1.5} className="text-accent" />
                  <p className="font-semibold text-anthrazit">Sprechstunde</p>
                </div>

                {hours.map((row) => (
                  <div
                    key={row.dayOfWeek}
                    className="flex justify-between text-sm py-1.5 border-b border-border last:border-0"
                  >
                    <span className="text-foreground-muted">{row.dayLabel}</span>
                    <span
                      className={`font-medium ${
                        row.isClosed ? "text-foreground-subtle" : "text-anthrazit"
                      }`}
                    >
                      {row.isClosed
                        ? "Geschlossen"
                        : row.slots.map((s) => `${s.from} – ${s.to} Uhr`).join(", ")}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="card p-6 bg-anthrazit border-0">
              <p className="text-white/80 text-sm leading-relaxed">
                <span className="text-white font-semibold block mb-1">Hinweis</span>
                Terminanfragen werden in der Reihenfolge ihres Eingangs bearbeitet.
                Bitte hab etwas Geduld – ich antworte innerhalb von 1–2 Werktagen.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
