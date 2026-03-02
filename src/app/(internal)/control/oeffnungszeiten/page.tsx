import { Clock } from "lucide-react";
import { getOpeningHours } from "@/actions/database/settings";
import { OeffnungszeitenForm } from "@/components/control/OeffnungszeitenForm";
import type { OpeningHourData } from "@/components/control/OeffnungszeitenForm";

export default async function OeffnungszeitenPage(): Promise<React.JSX.Element> {
  const rows = await getOpeningHours();
  const initialHours: OpeningHourData[] = rows.map((r) => ({
    dayOfWeek: r.dayOfWeek,
    slots: r.slots as { from: string; to: string }[],
    isClosed: r.isClosed,
  }));

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-lg bg-surface border border-border">
          <Clock size={20} strokeWidth={1.5} className="text-anthrazit" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-anthrazit">Öffnungszeiten</h1>
          <p className="text-sm text-foreground-muted">Zeiten pro Tag festlegen</p>
        </div>
      </div>

      <OeffnungszeitenForm initialHours={initialHours} />
    </div>
  );
}
