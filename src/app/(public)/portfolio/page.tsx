import type { Metadata } from "next";
import { getPortfolioItems } from "@/actions/database/portfolio";
import { PortfolioGallery } from "@/components/portfolio/PortfolioGallery";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Einblick in meine Arbeiten – Fineline, Realistic und Black'n'White Tattoos.",
};

export default async function PortfolioPage(): Promise<React.JSX.Element> {
  const result = await getPortfolioItems();
  const items = result.success ? (result.data ?? []) : [];

  return (
    <div className="py-16 px-6 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
            Portfolio
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-anthrazit mb-4">
            Meine Arbeiten.
          </h1>
          <p className="text-foreground-muted text-lg max-w-xl">
            Jedes Tattoo ist ein Unikat – hier findest du einen Überblick meiner bisherigen Arbeiten.
          </p>
        </div>

        <PortfolioGallery items={items} />
      </div>
    </div>
  );
}
