"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { HeroSlidePublic } from "@/actions/database/public";

const STATIC_SLIDES = [
  { id: "s1", title: "Fineline",       subtitle: "Zarte Linien. Bleibende Eindrücke.",       imageUrl: null },
  { id: "s2", title: "Realistic",      subtitle: "Haut als Leinwand. Kunst als Aussage.",     imageUrl: null },
  { id: "s3", title: "Black'n'White",  subtitle: "Kontraste, die erzählen.",                  imageUrl: null },
];

type SlideItem = { id: string; title: string; subtitle: string | null; imageUrl: string | null };

interface HeroSliderClientProps {
  slides: HeroSlidePublic[];
}

export function HeroSliderClient({ slides }: HeroSliderClientProps): React.JSX.Element {
  const items: SlideItem[] = slides.length > 0 ? slides : STATIC_SLIDES;
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const go = useCallback(
    (next: number) => {
      if (animating) return;
      setAnimating(true);
      setCurrent(next);
      setTimeout(() => setAnimating(false), 500);
    },
    [animating]
  );

  const prev = () => go((current - 1 + items.length) % items.length);
  const next = () => go((current + 1) % items.length);

  useEffect(() => {
    const id = setInterval(() => go((current + 1) % items.length), 5000);
    return () => clearInterval(id);
  }, [current, go, items.length]);

  const slide = items[current]!;

  return (
    <section className="relative w-full h-[90dvh] min-h-140 overflow-hidden bg-anthrazit">
      {/* Hintergrund */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${animating ? "opacity-0" : "opacity-100"}`}
      >
        {slide.imageUrl ? (
          <Image
            src={slide.imageUrl}
            alt={slide.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <div
            style={{ background: "linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 50%, #3d3d3d 100%)" }}
            className="absolute inset-0"
          />
        )}
        {/* Crosshatch texture — dezentes Overlay auf allen Slides */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/30 to-transparent" />

      {/* Content */}
      <div
        className={`relative z-10 h-full flex flex-col justify-center px-6 max-w-7xl mx-auto transition-all duration-500 ${
          animating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
        }`}
      >
        <div className="max-w-xl">
          <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase mb-4 text-sand">
            Tattoo Studio
          </span>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
            {slide.title}
          </h1>
          {slide.subtitle && (
            <p className="text-white/70 text-lg sm:text-xl mb-8 font-light">
              {slide.subtitle}
            </p>
          )}
          <div className="flex flex-wrap gap-3">
            <Link
              href="/kontakt"
              className="px-6 py-3.5 rounded-xl bg-accent text-white font-medium hover:bg-accent-dark transition-colors duration-200 shadow-lg"
            >
              Termin anfragen
            </Link>
            <Link
              href="/portfolio"
              className="px-6 py-3.5 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-colors duration-200 backdrop-blur-sm border border-white/20"
            >
              Portfolio ansehen
            </Link>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        {items.map((s, i) => (
          <button
            key={s.id}
            onClick={() => go(i)}
            aria-label={`Slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        aria-label="Vorheriger Slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200 backdrop-blur-sm"
      >
        <ChevronLeft size={24} strokeWidth={1.5} />
      </button>
      <button
        onClick={next}
        aria-label="Nächster Slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200 backdrop-blur-sm"
      >
        <ChevronRight size={24} strokeWidth={1.5} />
      </button>
    </section>
  );
}
