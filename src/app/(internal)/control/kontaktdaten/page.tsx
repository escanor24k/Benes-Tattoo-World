import { Phone } from "lucide-react";
import { getContactInfo } from "@/actions/database/settings";
import { KontaktdatenForm } from "@/components/control/KontaktdatenForm";
import { ArtistPhotoUpload } from "@/components/control/ArtistPhotoUpload";

export default async function KontaktdatenPage(): Promise<React.JSX.Element> {
  const initialValues = await getContactInfo();

  return (
    <div className="max-w-xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-lg bg-surface border border-border">
          <Phone size={20} strokeWidth={1.5} className="text-anthrazit" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-anthrazit">Kontaktdaten</h1>
          <p className="text-sm text-foreground-muted">Telefon, E-Mail & Biografie verwalten</p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <ArtistPhotoUpload currentUrl={initialValues["artistPhoto"] ?? ""} />
        <KontaktdatenForm initialValues={initialValues} />
      </div>
    </div>
  );
}
