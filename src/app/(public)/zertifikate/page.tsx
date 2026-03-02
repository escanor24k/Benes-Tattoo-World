import type { Metadata } from "next";
import { getCertificates } from "@/actions/database/certificates";
import { CertificateGallery } from "@/components/zertifikate/CertificateGallery";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Zertifikate",
  description: "Zertifikate und Nachweise – für deine Sicherheit und meine Qualität.",
};

export default async function ZertifikatePage(): Promise<React.JSX.Element> {
  const result = await getCertificates();
  const items = result.success ? (result.data ?? []) : [];

  return (
    <div className="py-16 px-6 bg-background min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end gap-6">
          <div>
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
              Nachweise
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-anthrazit mb-4">
              Zertifikate.
            </h1>
            <p className="text-foreground-muted text-lg max-w-xl">
              Hygiene, Sicherheit und fachliche Qualifikation – hier findest du alle
              relevanten Nachweise auf einen Blick.
            </p>
          </div>
          <div className="shrink-0 p-4 rounded-2xl bg-surface border border-border flex items-center gap-3 self-start sm:self-end">
            <ShieldCheck size={20} strokeWidth={1.5} className="text-accent" />
            <span className="text-sm font-medium text-anthrazit">Geprüfte Qualität</span>
          </div>
        </div>

        <CertificateGallery items={items} />
      </div>
    </div>
  );
}
