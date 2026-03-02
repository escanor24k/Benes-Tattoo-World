import { Share2 } from "lucide-react";
import { getSocialLinks } from "@/actions/database/settings";
import { SocialMediaForm } from "@/components/control/SocialMediaForm";
import type { SocialLinkData } from "@/components/control/SocialMediaForm";

export default async function SocialMediaPage(): Promise<React.JSX.Element> {
  const rows = await getSocialLinks();
  const initialLinks: SocialLinkData[] = rows.map((r) => ({
    platform: r.platform,
    url: r.url,
    isActive: r.isActive,
  }));

  return (
    <div className="max-w-xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-lg bg-surface border border-border">
          <Share2 size={20} strokeWidth={1.5} className="text-anthrazit" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-anthrazit">Social Media</h1>
          <p className="text-sm text-foreground-muted">Links verwalten und aktivieren</p>
        </div>
      </div>

      <SocialMediaForm initialLinks={initialLinks} />
    </div>
  );
}
