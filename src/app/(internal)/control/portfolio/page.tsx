import { getPortfolioItems } from "@/actions/database/portfolio";
import { PortfolioAdmin } from "@/components/control/PortfolioAdmin";
import { Images } from "lucide-react";

export default async function PortfolioControlPage(): Promise<React.JSX.Element> {
  const result = await getPortfolioItems();
  const items = result.success ? (result.data ?? []) : [];

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-lg bg-surface border border-border">
          <Images size={20} strokeWidth={1.5} className="text-anthrazit" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-anthrazit">Portfolio</h1>
          <p className="text-sm text-foreground-muted">Bilder verwalten und hochladen</p>
        </div>
      </div>
      <PortfolioAdmin items={items} />
    </div>
  );
}
