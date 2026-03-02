"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import { upsertContactInfo } from "@/actions/database/settings";

const FIELDS = [
  { key: "phone", label: "Telefon", type: "tel", placeholder: "+49 000 000 0000" },
  { key: "email", label: "E-Mail", type: "email", placeholder: "info@benes-tattoo.de" },
  { key: "city", label: "Stadt / Region", type: "text", placeholder: "Landkreis Dachau" },
];

interface KontaktdatenFormProps {
  initialValues: Record<string, string>;
}

export function KontaktdatenForm({ initialValues }: KontaktdatenFormProps): React.JSX.Element {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setLoading(true);
    setSaved(false);
    setError("");

    const result = await upsertContactInfo(new FormData(e.currentTarget));
    if (result.success) {
      setSaved(true);
      router.refresh();
    } else {
      setError(result.error);
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6 flex flex-col gap-4">
      {FIELDS.map((f) => (
        <div key={f.key} className="flex flex-col gap-1.5">
          <label htmlFor={f.key} className="text-sm font-medium text-foreground">
            {f.label}
          </label>
          <input
            id={f.key}
            name={f.key}
            type={f.type}
            defaultValue={initialValues[f.key] ?? ""}
            placeholder={f.placeholder}
            className="px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-accent transition-colors duration-200 text-sm"
          />
        </div>
      ))}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="about" className="text-sm font-medium text-foreground">
          Über mich
          <span className="ml-1 text-xs text-foreground-subtle">(Kurzbiografie für die Website)</span>
        </label>
        <textarea
          id="about"
          name="about"
          rows={5}
          defaultValue={initialValues["about"] ?? ""}
          placeholder={"Ich bin Bene – Tattoo-Artist ...\n\nTrenne Absätze mit einer Leerzeile."}
          className="px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-accent transition-colors duration-200 text-sm resize-none"
        />
      </div>

      {saved && <p className="text-sm text-green-600">Gespeichert ✓</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-anthrazit text-white text-sm font-medium hover:bg-anthrazit-light disabled:opacity-60 transition-colors duration-200 self-start mt-2"
      >
        {loading
          ? <Loader2 size={15} strokeWidth={1.5} className="animate-spin" />
          : <Save size={15} strokeWidth={1.5} />}
        Speichern
      </button>
    </form>
  );
}
