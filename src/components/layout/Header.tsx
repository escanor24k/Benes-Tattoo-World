import Link from "next/link";
import { Phone, Clock } from "lucide-react";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";
import {
  getPublicContactInfo,
  getActiveSocialLinks,
  getPublicOpeningHours,
} from "@/actions/database/public";
import type { PublicSocialLink, PublicOpeningHour } from "@/actions/database/public";
import { SOCIAL_ICON_MAP } from "@/components/ui/SocialIcons";


function formatTime(t: string): string {
  return t.endsWith(":00") ? t.slice(0, -3) : t;
}

function buildHoursLabel(hours: PublicOpeningHour[]): string | null {
  const active = hours.filter((h) => !h.isClosed && h.slots.length > 0);
  if (active.length === 0) return null;
  return active
    .map((h) => {
      const short = h.dayLabel.slice(0, 2);
      const slots = h.slots.map((s) => `${formatTime(s.from)}–${formatTime(s.to)}`).join(", ");
      return `${short} ${slots}`;
    })
    .join(" · ") + " Uhr";
}

function SocialLinks({ links }: { links: PublicSocialLink[] }): React.JSX.Element | null {
  if (links.length === 0) return null;
  return (
    <div className="flex items-center gap-3">
      {links.map(({ platform, url }) => {
        const Icon = SOCIAL_ICON_MAP[platform];
        if (!Icon) return null;
        return (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={platform}
            className="hover:text-white transition-colors duration-200"
          >
            <Icon size={15} />
          </a>
        );
      })}
    </div>
  );
}

export async function Header(): Promise<React.JSX.Element> {
  const [contact, socialLinks, hours] = await Promise.all([
    getPublicContactInfo(),
    getActiveSocialLinks(),
    getPublicOpeningHours(),
  ]);

  const hoursLabel = buildHoursLabel(hours);
  const hasTopbar = !!(contact.phone || contact.city || hoursLabel);

  return (
    <header className="w-full">
      {/* Topbar */}
      {hasTopbar && (
        <div className="hidden md:block bg-anthrazit text-white/80 text-sm">
          <div className="max-w-7xl mx-auto px-6 py-2.5 flex items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              {contact.phone && (
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-1.5 hover:text-white transition-colors duration-200"
                >
                  <Phone size={13} strokeWidth={1.5} />
                  <span>{contact.phone}</span>
                </a>
              )}
              {hoursLabel && (
                <span className="flex items-center gap-1.5">
                  <Clock size={13} strokeWidth={1.5} />
                  <span>
                    <span className="text-white/50 mr-1">Sprechstunde:</span>
                    {hoursLabel}
                  </span>
                </span>
              )}
            </div>
            <SocialLinks links={socialLinks} />
          </div>
        </div>
      )}

      {/* Main Nav */}
      <div className="bg-surface border-b border-border sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-8">
          <Link
            href="/"
            className="font-display text-xl font-bold text-anthrazit hover:text-accent transition-colors duration-300 shrink-0"
          >
            Bene&apos;s Tattoo World
          </Link>

          <NavLinks />

          <div className="flex items-center gap-3">
            <Link
              href="/kontakt"
              className="hidden lg:block px-5 py-2.5 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent-dark transition-colors duration-200 shadow-sm"
            >
              Termin anfragen
            </Link>
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
