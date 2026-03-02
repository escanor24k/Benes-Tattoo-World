import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { getPublicContactInfo, getPublicOpeningHours } from "@/actions/database/public";

export async function LocationSection(): Promise<React.JSX.Element> {
  const [contact, hours] = await Promise.all([
    getPublicContactInfo(),
    getPublicOpeningHours(),
  ]);

  return (
    <section className="py-20 px-6 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <SectionHeading
            eyebrow="Standort"
            title="Wo du mich findest"
            centered
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Kontaktinfos */}
          <div className="card p-7 flex flex-col gap-5">
            {contact.city && (
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-surface-muted shrink-0">
                  <MapPin size={18} strokeWidth={1.5} className="text-accent" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-foreground-subtle mb-1">
                    Region
                  </p>
                  <p className="text-foreground">{contact.city}</p>
                </div>
              </div>
            )}

            {contact.phone && (
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-surface-muted shrink-0">
                  <Phone size={18} strokeWidth={1.5} className="text-accent" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-foreground-subtle mb-1">
                    Telefon
                  </p>
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="text-foreground hover:text-accent transition-colors duration-200"
                  >
                    {contact.phone}
                  </a>
                </div>
              </div>
            )}

            {contact.email && (
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-surface-muted shrink-0">
                  <Mail size={18} strokeWidth={1.5} className="text-accent" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-foreground-subtle mb-1">
                    E-Mail
                  </p>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-foreground hover:text-accent transition-colors duration-200"
                  >
                    {contact.email}
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Öffnungszeiten / Sprechstunde */}
          {hours.length > 0 && (
            <div className="card p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 rounded-lg bg-surface-muted">
                  <Clock size={18} strokeWidth={1.5} className="text-accent" />
                </div>
                <p className="font-semibold text-anthrazit">Sprechstunde</p>
              </div>
              <div className="flex flex-col gap-3">
                {hours.map((row) => (
                  <div
                    key={row.dayOfWeek}
                    className="flex justify-between items-center text-sm py-2 border-b border-border last:border-0"
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
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
