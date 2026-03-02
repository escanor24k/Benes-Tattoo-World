import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import { getPublicContactInfo, getActiveSocialLinks } from "@/actions/database/public";
import { SOCIAL_ICON_MAP } from "@/components/ui/SocialIcons";

export async function Footer(): Promise<React.JSX.Element> {
  const [contact, socialLinks] = await Promise.all([
    getPublicContactInfo(),
    getActiveSocialLinks(),
  ]);

  return (
    <footer className="bg-anthrazit text-white/70">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Marke */}
        <div className="flex flex-col gap-4">
          <p className="font-display text-xl font-bold text-white">
            Bene&apos;s Tattoo World
          </p>
          <p className="text-sm leading-relaxed">
            Fineline · Realistic · Black&apos;n&apos;White
            <br />
            Individuell. Präzise. Unvergesslich.
          </p>
          {socialLinks.length > 0 && (
            <div className="flex items-center gap-3 mt-1">
              {socialLinks.map(({ platform, url }) => {
                const Icon = SOCIAL_ICON_MAP[platform];
                if (!Icon) return null;
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={platform}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {/* Kontakt */}
        <div className="flex flex-col gap-4">
          <p className="text-sm font-semibold text-white uppercase tracking-widest">
            Kontakt
          </p>
          <div className="flex flex-col gap-3 text-sm">
            {contact.phone && (
              <a
                href={`tel:${contact.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2.5 hover:text-white transition-colors duration-200"
              >
                <Phone size={15} strokeWidth={1.5} className="shrink-0" />
                {contact.phone}
              </a>
            )}
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2.5 hover:text-white transition-colors duration-200"
              >
                <Mail size={15} strokeWidth={1.5} className="shrink-0" />
                {contact.email}
              </a>
            )}
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-4">
          <p className="text-sm font-semibold text-white uppercase tracking-widest">
            Rechtliches
          </p>
          <nav className="flex flex-col gap-2 text-sm">
            <Link href="/impressum" className="hover:text-white transition-colors duration-200">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-white transition-colors duration-200">
              Datenschutzerklärung
            </Link>
            <Link href="/agb" className="hover:text-white transition-colors duration-200">
              AGB
            </Link>
          </nav>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40">
          <span>
            © {new Date().getFullYear()} Bene&apos;s Tattoo World. Alle Rechte vorbehalten.
          </span>
          <span>Made with care.</span>
        </div>
      </div>
    </footer>
  );
}
