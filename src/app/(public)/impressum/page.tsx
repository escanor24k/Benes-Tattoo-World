import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";
import type { LegalSection } from "@/components/ui/LegalPage";
import { getPublicContactInfo } from "@/actions/database/public";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: false, follow: false },
};

const STATIC_SECTIONS: LegalSection[] = [
  {
    id: "berufsrecht",
    title: "Berufsrechtliche Angaben",
    content: (
      <>
        <p>
          Tätowierer sind kein zulassungspflichtiger Beruf im Sinne der Handwerksordnung.
          Die Tätigkeit wird in Übereinstimmung mit den einschlägigen gesundheitsrechtlichen
          Vorschriften ausgeübt, insbesondere dem Infektionsschutzgesetz (IfSG).
        </p>
        <p>
          Zuständige Aufsichtsbehörde für Hygienebelange:<br />
          Gesundheitsamt Landkreis Dachau
        </p>
      </>
    ),
  },
  {
    id: "haftung-inhalte",
    title: "Haftung für Inhalte",
    content: (
      <>
        <p>
          Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen
          Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind
          wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte
          fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine
          rechtswidrige Tätigkeit hinweisen.
        </p>
        <p>
          Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach
          den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung
          ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung
          möglich.
        </p>
      </>
    ),
  },
  {
    id: "haftung-links",
    title: "Haftung für Links",
    content: (
      <>
        <p>
          Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir
          keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine
          Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige
          Anbieter oder Betreiber der Seiten verantwortlich.
        </p>
        <p>
          Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche
          Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der
          Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten
          Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht
          zumutbar.
        </p>
      </>
    ),
  },
  {
    id: "urheberrecht",
    title: "Urheberrecht",
    content: (
      <>
        <p>
          Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
          unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung,
          Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes
          bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
        </p>
        <p>
          Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen
          Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber
          erstellt wurden, werden die Urheberrechte Dritter beachtet.
        </p>
      </>
    ),
  },
];

export default async function ImpressumPage(): Promise<React.JSX.Element> {
  const contact = await getPublicContactInfo();

  const angaben: LegalSection = {
    id: "angaben",
    title: "Angaben gemäß § 5 TMG",
    content: (
      <p>
        <strong>Benedikt Schmutz</strong><br />
        Bene&apos;s Tattoo World<br />
        {contact.city || "Landkreis Dachau"}
      </p>
    ),
  };

  const kontakt: LegalSection = {
    id: "kontakt",
    title: "Kontakt",
    content: (
      <>
        {contact.phone && (
          <p>
            <strong>Telefon:</strong>{" "}
            <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a>
          </p>
        )}
        {contact.email && (
          <p>
            <strong>E-Mail:</strong>{" "}
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </p>
        )}
      </>
    ),
  };

  return (
    <LegalPage
      eyebrow="Rechtliches"
      title="Impressum"
      lastUpdated="März 2026"
      sections={[angaben, kontakt, ...STATIC_SECTIONS]}
    />
  );
}
