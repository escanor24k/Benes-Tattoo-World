"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import { upsertOpeningHours } from "@/actions/database/settings";

const DAYS = [
  { day: 1, label: "Montag" },
  { day: 2, label: "Dienstag" },
  { day: 3, label: "Mittwoch" },
  { day: 4, label: "Donnerstag" },
  { day: 5, label: "Freitag" },
  { day: 6, label: "Samstag" },
  { day: 0, label: "Sonntag" },
];

interface DayState {
  from: string;
  to: string;
  isClosed: boolean;
}

export interface OpeningHourData {
  dayOfWeek: number;
  slots: { from: string; to: string }[];
  isClosed: boolean;
}

interface OeffnungszeitenFormProps {
  initialHours: OpeningHourData[];
}

function buildInitial(initialHours: OpeningHourData[]): Record<number, DayState> {
  return Object.fromEntries(
    DAYS.map(({ day }) => {
      const existing = initialHours.find((h) => h.dayOfWeek === day);
      return [
        day,
        {
          from: existing?.slots[0]?.from ?? "10:00",
          to:   existing?.slots[0]?.to   ?? "18:00",
          isClosed: existing?.isClosed ?? false,
        },
      ];
    })
  );
}

export function OeffnungszeitenForm({ initialHours }: OeffnungszeitenFormProps): React.JSX.Element {
  const router = useRouter();
  const [days, setDays] = useState<Record<number, DayState>>(() => buildInitial(initialHours));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function update(day: number, field: keyof DayState, value: string | boolean): void {
    setDays((prev) => ({ ...prev, [day]: { ...prev[day]!, [field]: value } }));
  }

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    await Promise.all(
      DAYS.map(({ day, label }) => {
        const s = days[day]!;
        return upsertOpeningHours(day, label, [{ from: s.from, to: s.to }], s.isClosed);
      })
    );
    setSaved(true);
    setSaving(false);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6 flex flex-col gap-3">
      {DAYS.map(({ day, label }) => {
        const s = days[day]!;
        return (
          <div key={day} className="grid grid-cols-[120px_1fr] items-center gap-4 py-2 border-b border-border last:border-0">
            <span className="text-sm font-medium text-foreground">{label}</span>
            <div className="flex items-center gap-3 flex-wrap">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={s.isClosed}
                  onChange={(e) => update(day, "isClosed", e.target.checked)}
                  className="w-4 h-4 accent-accent"
                />
                <span className="text-xs text-foreground-muted">Geschlossen</span>
              </label>
              {!s.isClosed && (
                <>
                  <input
                    type="time"
                    value={s.from}
                    onChange={(e) => update(day, "from", e.target.value)}
                    className="px-3 py-1.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-accent text-sm"
                  />
                  <span className="text-foreground-subtle text-sm">–</span>
                  <input
                    type="time"
                    value={s.to}
                    onChange={(e) => update(day, "to", e.target.value)}
                    className="px-3 py-1.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-accent text-sm"
                  />
                </>
              )}
            </div>
          </div>
        );
      })}

      <div className="flex items-center gap-3 mt-2 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-anthrazit text-white text-sm font-medium hover:bg-anthrazit-light disabled:opacity-60 transition-colors duration-200"
        >
          {saving ? <Loader2 size={15} strokeWidth={1.5} className="animate-spin" /> : <Save size={15} strokeWidth={1.5} />}
          Alle speichern
        </button>
        {saved && <span className="text-sm text-green-600">Gespeichert ✓</span>}
      </div>
    </form>
  );
}
