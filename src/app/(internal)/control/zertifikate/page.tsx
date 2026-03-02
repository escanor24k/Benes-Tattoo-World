import { getCertificates } from "@/actions/database/certificates";
import { CertificateAdmin } from "@/components/control/CertificateAdmin";
import { Award } from "lucide-react";

export default async function ZertifikateControlPage(): Promise<React.JSX.Element> {
  const result = await getCertificates();
  const items = result.success ? (result.data ?? []) : [];

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-lg bg-surface border border-border">
          <Award size={20} strokeWidth={1.5} className="text-anthrazit" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-anthrazit">Zertifikate</h1>
          <p className="text-sm text-foreground-muted">Nachweise hochladen und verwalten</p>
        </div>
      </div>
      <CertificateAdmin items={items} />
    </div>
  );
}
