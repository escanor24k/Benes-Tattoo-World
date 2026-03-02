"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { PortfolioItemData } from "@/actions/database/portfolio";
import { TATTOO_STYLES } from "@/types";
import type { TattooStyle } from "@/types";

interface PortfolioModalProps {
  item: PortfolioItemData;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export function PortfolioModal({
  item,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: PortfolioModalProps): React.JSX.Element {
  useEffect(() => {
    function onKey(e: KeyboardEvent): void {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onPrev();
      if (e.key === "ArrowRight" && hasNext) onNext();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const styleLabel = TATTOO_STYLES[item.category as TattooStyle] ?? item.category;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

      {/* Bild — nimmt fast den ganzen Viewport ein */}
      <div
        className="relative z-10 w-full h-full max-w-[95dvw] max-h-[95dvh] mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={item.imageUrl}
          alt={item.title ?? styleLabel}
          fill
          className="object-contain"
          sizes="95vw"
          priority
        />

        {/* Info-Overlay unten */}
        <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent px-6 pb-5 pt-10 pointer-events-none">
          <div className="flex items-end justify-between gap-4">
            <div>
              {item.title && (
                <p className="text-white font-semibold text-lg leading-tight">{item.title}</p>
              )}
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/60">
                {styleLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Close-Button oben rechts */}
        <button
          onClick={onClose}
          aria-label="Schließen"
          className="absolute top-3 right-3 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors duration-200 backdrop-blur-sm"
        >
          <X size={20} strokeWidth={1.5} />
        </button>
      </div>

      {/* Navigation Arrows */}
      {hasPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Vorheriges Bild"
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors duration-200 backdrop-blur-sm"
        >
          <ChevronLeft size={26} strokeWidth={1.5} />
        </button>
      )}
      {hasNext && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Nächstes Bild"
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors duration-200 backdrop-blur-sm"
        >
          <ChevronRight size={26} strokeWidth={1.5} />
        </button>
      )}
    </div>
  );
}
