import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma/client";
import { Images, Award, MessageSquare, LayoutDashboard, Presentation } from "lucide-react";

export default async function ControlPage(): Promise<React.JSX.Element> {
  const session = await getSession();

  const [portfolioCount, certCount, requestCount, heroCount] = await Promise.all([
    prisma.portfolioItem.count({ where: { isVisible: true } }),
    prisma.certificate.count({ where: { isVisible: true } }),
    prisma.contactRequest.count({ where: { isRead: false } }),
    prisma.heroSlide.count({ where: { isActive: true } }),
  ]).catch(() => [0, 0, 0, 0]);

  const stats = [
    { label: "Hero Slides",       value: heroCount,       icon: Presentation },
    { label: "Portfolio-Einträge",value: portfolioCount,  icon: Images },
    { label: "Zertifikate",       value: certCount,       icon: Award },
    { label: "Neue Anfragen",     value: requestCount,    icon: MessageSquare, highlight: requestCount > 0 },
  ];

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-lg bg-surface border border-border">
          <LayoutDashboard size={20} strokeWidth={1.5} className="text-anthrazit" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-anthrazit">Dashboard</h1>
          <p className="text-sm text-foreground-muted">Willkommen, {session?.email}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`card p-6 flex items-center gap-4 ${stat.highlight ? "border-accent/40 bg-accent/5" : ""}`}
          >
            <div className={`p-3 rounded-xl ${stat.highlight ? "bg-accent/10" : "bg-surface-muted"}`}>
              <stat.icon size={20} strokeWidth={1.5} className={stat.highlight ? "text-accent" : "text-foreground-muted"} />
            </div>
            <div>
              <p className="text-2xl font-bold text-anthrazit">{stat.value}</p>
              <p className="text-xs text-foreground-muted mt-0.5">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="card p-6">
        <p className="text-sm font-semibold text-anthrazit mb-4">Schnellzugriff</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { href: "/control/hero",           label: "Hero Slider",         sub: "Startseiten-Slides verwalten" },
            { href: "/control/portfolio",       label: "Portfolio verwalten", sub: "Bilder hochladen & sortieren" },
            { href: "/control/zertifikate",     label: "Zertifikate",         sub: "Nachweise pflegen" },
            { href: "/control/kontaktdaten",    label: "Kontaktdaten",        sub: "Telefon, E-Mail & Biografie" },
            { href: "/control/oeffnungszeiten", label: "Öffnungszeiten",      sub: "Zeiten & Slots anpassen" },
            { href: "/control/social-media",    label: "Social Media",        sub: "Links aktivieren" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="flex flex-col gap-0.5 px-4 py-3 rounded-xl border border-border hover:border-anthrazit hover:bg-surface-muted transition-all duration-200"
            >
              <span className="text-sm font-medium text-anthrazit">{link.label}</span>
              <span className="text-xs text-foreground-subtle">{link.sub}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
