"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { upsertSocialLink } from "@/actions/database/settings";

const PLATFORMS = [
  { id: "instagram", label: "Instagram", placeholder: "https://instagram.com/bene_tattoo" },
  { id: "facebook",  label: "Facebook",  placeholder: "https://facebook.com/bene_tattoo" },
  { id: "tiktok",    label: "TikTok",    placeholder: "https://tiktok.com/@bene_tattoo" },
  { id: "youtube",   label: "YouTube",   placeholder: "https://youtube.com/@bene_tattoo" },
];

export interface SocialLinkData {
  platform: string;
  url: string;
  isActive: boolean;
}

interface SocialMediaFormProps {
  initialLinks: SocialLinkData[];
}

export function SocialMediaForm({ initialLinks }: SocialMediaFormProps): React.JSX.Element {
  const router = useRouter();
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  const getInitial = (platform: string): SocialLinkData =>
    initialLinks.find((l) => l.platform === platform) ?? { platform, url: "", isActive: false };

  async function handleSave(platform: string, formData: FormData): Promise<void> {
    setSaving(platform);
    setSaved(null);
    const url = formData.get("url") as string;
    const isActive = formData.get("isActive") === "on";
    await upsertSocialLink(platform, url, isActive);
    setSaved(platform);
    setSaving(null);
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-4">
      {PLATFORMS.map((p) => {
        const initial = getInitial(p.id);
        return (
          <form
            key={p.id}
            onSubmit={(e) => { e.preventDefault(); handleSave(p.id, new FormData(e.currentTarget)); }}
            className="card p-5 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <p className="font-medium text-anthrazit text-sm">{p.label}</p>
              <label className="flex items-center gap-2 cursor-pointer">
                <span className="text-xs text-foreground-muted">Aktiv</span>
                <input
                  type="checkbox"
                  name="isActive"
                  defaultChecked={initial.isActive}
                  className="w-4 h-4 accent-accent"
                />
              </label>
            </div>
            <input
              name="url"
              type="url"
              defaultValue={initial.url}
              placeholder={p.placeholder}
              className="px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-accent transition-colors duration-200 text-sm"
            />
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={saving === p.id}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-anthrazit text-white text-xs font-medium hover:bg-anthrazit-light disabled:opacity-60 transition-colors duration-200"
              >
                {saving === p.id && <Loader2 size={12} strokeWidth={1.5} className="animate-spin" />}
                Speichern
              </button>
              {saved === p.id && <span className="text-xs text-green-600">Gespeichert ✓</span>}
            </div>
          </form>
        );
      })}
    </div>
  );
}
