"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { PortfolioModal } from "./PortfolioModal";
import type { PortfolioItemData } from "@/actions/database/portfolio";
import { TATTOO_STYLES } from "@/types";
import type { TattooStyle } from "@/types";

const FILTER_OPTIONS: Array<{ value: "all" | TattooStyle; label: string }> = [
  { value: "all", label: "Alle" },
  { value: "fineline", label: "Fineline" },
  { value: "realistic", label: "Realistic" },
  { value: "blackandwhite", label: "Black'n'White" },
];

interface PortfolioGalleryProps {
  items: PortfolioItemData[];
}

export function PortfolioGallery({ items }: PortfolioGalleryProps): React.JSX.Element {
  const [activeFilter, setActiveFilter] = useState<"all" | TattooStyle>("all");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => (activeFilter === "all" ? items : items.filter((i) => i.category === activeFilter)),
    [items, activeFilter]
  );

  function openModal(index: number): void {
    setSelectedIndex(index);
  }

  function closeModal(): void {
    setSelectedIndex(null);
  }

  function goPrev(): void {
    setSelectedIndex((i) => (i !== null && i > 0 ? i - 1 : i));
  }

  function goNext(): void {
    setSelectedIndex((i) => (i !== null && i < filtered.length - 1 ? i + 1 : i));
  }

  if (items.length === 0) {
    return (
      <div className="py-24 text-center text-foreground-subtle">
        <p className="text-lg">Noch keine Portfolio-Einträge vorhanden.</p>
        <p className="text-sm mt-2">Schau bald wieder vorbei!</p>
      </div>
    );
  }

  return (
    <>
      {/* Filter Tabs */}
      <div className="flex items-center gap-2 flex-wrap mb-10">
        {FILTER_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setActiveFilter(opt.value)}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeFilter === opt.value
                ? "bg-anthrazit text-white shadow-sm"
                : "bg-surface text-foreground-muted border border-border hover:border-anthrazit hover:text-anthrazit"
            }`}
          >
            {opt.label}
            {opt.value !== "all" && (
              <span className={`ml-2 text-xs ${activeFilter === opt.value ? "text-white/60" : "text-foreground-subtle"}`}>
                {items.filter((i) => i.category === opt.value).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center text-foreground-subtle">
          <p>Keine Einträge in dieser Kategorie.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {filtered.map((item, index) => (
            <button
              key={item.id}
              onClick={() => openModal(index)}
              className="group relative aspect-square rounded-xl overflow-hidden bg-surface-muted focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              aria-label={item.title ?? TATTOO_STYLES[item.category as TattooStyle] ?? item.category}
            >
              <Image
                src={item.imageUrl}
                alt={item.title ?? "Portfolio Bild"}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                loading="lazy"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end p-3">
                <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  {TATTOO_STYLES[item.category as TattooStyle] ?? item.category}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedIndex !== null && filtered[selectedIndex] && (
        <PortfolioModal
          item={filtered[selectedIndex]}
          onClose={closeModal}
          onPrev={goPrev}
          onNext={goNext}
          hasPrev={selectedIndex > 0}
          hasNext={selectedIndex < filtered.length - 1}
        />
      )}
    </>
  );
}
