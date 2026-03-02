"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Start" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/zertifikate", label: "Zertifikate" },
  { href: "/kontakt", label: "Kontakt" },
];

export function NavLinks(): React.JSX.Element {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex items-center gap-1">
      {NAV_LINKS.map((link) => {
        const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
              isActive
                ? "text-anthrazit bg-surface-muted"
                : "text-foreground-muted hover:text-anthrazit hover:bg-surface-muted"
            }`}
          >
            {link.label}
            {isActive && (
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3.5 h-0.5 rounded-full bg-accent" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
