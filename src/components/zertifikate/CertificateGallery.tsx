"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import type { CertificateData } from "@/actions/database/certificates";

interface CertificateGalleryProps {
  items: CertificateData[];
}

export function CertificateGallery({ items }: CertificateGalleryProps): React.JSX.Element {
  const [selected, setSelected] = useState<CertificateData | null>(null);

  if (items.length === 0) {
    return (
      <div className="py-24 text-center text-foreground-subtle">
        <p className="text-lg">Noch keine Zertifikate vorhanden.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelected(item)}
            className="group card overflow-hidden text-left hover:shadow-[var(--shadow-md)] transition-shadow duration-300 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            {/* Bild */}
            <div className="relative aspect-3/4 bg-surface-muted overflow-hidden">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-contain transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <ZoomIn
                  size={28}
                  strokeWidth={1.5}
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </div>
            {/* Info */}
            <div className="p-4">
              <p className="font-semibold text-anthrazit text-sm">{item.title}</p>
              {item.issuer && (
                <p className="text-xs text-foreground-muted mt-0.5">{item.issuer}</p>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={() => setSelected(null)}
        >
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

          <div
            className="relative z-10 w-full h-full max-w-[95dvw] max-h-[95dvh] mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selected.imageUrl}
              alt={selected.title}
              fill
              className="object-contain"
              sizes="95vw"
              priority
            />

            {/* Info-Overlay unten */}
            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent px-6 pb-5 pt-10 pointer-events-none">
              <p className="text-white font-semibold">{selected.title}</p>
              {selected.issuer && (
                <p className="text-sm text-white/60">{selected.issuer}</p>
              )}
            </div>

            {/* Close */}
            <button
              onClick={() => setSelected(null)}
              aria-label="Schließen"
              className="absolute top-3 right-3 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors duration-200 backdrop-blur-sm"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
