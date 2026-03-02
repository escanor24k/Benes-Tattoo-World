import Link from "next/link";
import { logoutAction } from "@/actions/auth/login";
import {
  LayoutDashboard,
  Images,
  Presentation,
  Award,
  Phone,
  Share2,
  Clock,
  KeyRound,
  LogOut,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/control",                 label: "Dashboard",      icon: LayoutDashboard },
  { href: "/control/hero",            label: "Hero Slider",    icon: Presentation },
  { href: "/control/portfolio",       label: "Portfolio",      icon: Images },
  { href: "/control/zertifikate",     label: "Zertifikate",    icon: Award },
  { href: "/control/kontaktdaten",    label: "Kontaktdaten",   icon: Phone },
  { href: "/control/social-media",    label: "Social Media",   icon: Share2 },
  { href: "/control/oeffnungszeiten", label: "Öffnungszeiten", icon: Clock },
  { href: "/control/passwort",        label: "Passwort",       icon: KeyRound },
];

export function AdminSidebar(): React.JSX.Element {
  return (
    <aside className="w-60 shrink-0 bg-anthrazit min-h-dvh flex flex-col">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10">
        <p className="font-display text-base font-bold text-white leading-tight">
          Bene&apos;s Tattoo World
        </p>
        <p className="text-xs text-white/40 mt-0.5">Admin</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            <Icon size={16} strokeWidth={1.5} />
            {label}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-white/10">
        <form action={logoutAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            <LogOut size={16} strokeWidth={1.5} />
            Abmelden
          </button>
        </form>
      </div>
    </aside>
  );
}
