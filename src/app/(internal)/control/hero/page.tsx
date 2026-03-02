import { Images } from "lucide-react";
import { getHeroSlides } from "@/actions/database/heroSlides";
import { HeroAdmin } from "@/components/control/HeroAdmin";

export default async function HeroPage(): Promise<React.JSX.Element> {
  const result = await getHeroSlides();
  const slides = result.success ? (result.data ?? []) : [];

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-lg bg-surface border border-border">
          <Images size={20} strokeWidth={1.5} className="text-anthrazit" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-anthrazit">Hero-Slider</h1>
          <p className="text-sm text-foreground-muted">Startseiten-Slides verwalten</p>
        </div>
      </div>

      <HeroAdmin slides={slides} />
    </div>
  );
}
