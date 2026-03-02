import Link from "next/link";
import Image from "next/image";
import { SectionHeading } from "./SectionHeading";
import { getPortfolioItems } from "@/actions/database/portfolio";

export async function PortfolioPreview(): Promise<React.JSX.Element> {
  const result = await getPortfolioItems();
  const items = result.success ? (result.data ?? []) : [];
  const preview = items.slice(0, 6);

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <SectionHeading
            eyebrow="Portfolio"
            title="Ausgewählte Arbeiten"
            subtitle="Ein Blick in meine Welt."
          />
          <Link
            href="/portfolio"
            className="shrink-0 text-sm font-medium text-accent hover:underline underline-offset-4"
          >
            Alle ansehen →
          </Link>
        </div>

        {preview.length === 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-xl bg-surface-muted overflow-hidden"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {preview.map((item) => (
              <Link
                key={item.id}
                href="/portfolio"
                className="aspect-square rounded-xl overflow-hidden relative block img-hover"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title ?? "Portfolio Bild"}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover"
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
