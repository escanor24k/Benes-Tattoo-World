"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Start" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/zertifikate", label: "Zertifikate" },
  { href: "/kontakt", label: "Kontakt" },
];

export function MobileMenu(): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Menü öffnen"
        className="lg:hidden p-2 rounded-lg text-anthrazit hover:bg-surface-muted transition-colors duration-200"
      >
        <Menu size={24} strokeWidth={1.5} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-surface shadow-xl transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-border">
          <span className="font-display text-lg font-semibold text-anthrazit">
            Menü
          </span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Menü schließen"
            className="p-2 rounded-lg hover:bg-surface-muted transition-colors duration-200"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        <nav className="p-5 flex flex-col gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`px-4 py-3 rounded-xl font-medium transition-colors duration-200 ${
                  isActive
                    ? "bg-surface-muted text-anthrazit border-l-2 border-accent pl-3"
                    : "text-foreground hover:bg-surface-muted hover:text-accent"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="mt-4 pt-4 border-t border-border">
            <Link
              href="/kontakt"
              onClick={() => setOpen(false)}
              className="block w-full text-center px-4 py-3 rounded-xl bg-accent text-white font-medium hover:bg-accent-dark transition-colors duration-200"
            >
              Termin anfragen
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
