import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";
import type { LegalSection } from "@/components/ui/LegalPage";

export const metadata: Metadata = {
  title: "AGB",
  robots: { index: false, follow: false },
};

const sections: LegalSection[] = [
  {
    id: "geltungsbereich",
    title: "Geltungsbereich",
    content: (
      <p>
        Diese Allgemeinen Geschäftsbedingungen gelten für alle Dienstleistungen von
        Bene Mustermann, Bene&apos;s Tattoo World (nachfolgend &bdquo;Studio&ldquo;), gegenüber
        Kunden (nachfolgend &bdquo;Kunde&ldquo;). Abweichende Bedingungen des Kunden werden nicht
        anerkannt, es sei denn, das Studio stimmt ihrer Geltung ausdrücklich schriftlich zu.
      </p>
    ),
  },
  {
    id: "terminvereinbarung",
    title: "Terminvereinbarung & Anzahlung",
    content: (
      <>
        <p>
          Termine werden ausschließlich nach vorheriger Anfrage und Bestätigung durch das
          Studio vereinbart. Mit der Bestätigung eines Termins erklärt sich der Kunde mit
          diesen AGB einverstanden.
        </p>
        <p>
          Für die Reservierung eines Termins kann eine <strong>Anzahlung</strong> verlangt
          werden. Die Anzahlung beträgt in der Regel 20–50 % des vereinbarten Gesamtpreises
          und wird auf den Endpreis angerechnet. Die Höhe wird im Einzelfall kommuniziert.
        </p>
        <p>
          Die Anzahlung ist nicht erstattungsfähig, wenn der Kunde den Termin ohne
          wichtigen Grund absagt oder nicht erscheint.
        </p>
      </>
    ),
  },
  {
    id: "stornierung",
    title: "Stornierung & Verschiebung",
    content: (
      <>
        <p>
          Terminabsagen oder -verschiebungen sind mindestens{" "}
          <strong>48 Stunden vor dem vereinbarten Termin</strong> mitzuteilen. Bei
          rechtzeitiger Absage wird die Anzahlung auf einen Folgetermin übertragen.
        </p>
        <p>
          Bei kurzfristiger Absage (weniger als 48 Stunden) oder Nichterscheinen ohne
          vorherige Absage verfällt die Anzahlung. Das Studio behält sich vor, bei
          wiederholtem Nichterscheinen keine weiteren Termine zu vergeben.
        </p>
      </>
    ),
  },
  {
    id: "preise-zahlung",
    title: "Preise & Zahlung",
    content: (
      <>
        <p>
          Die Preise werden im Vorfeld individuell vereinbart. Maßgeblich sind der
          Zeitaufwand, die Komplexität und der Materialverbrauch. Der endgültige Preis
          kann vom Voranschlag abweichen, wenn sich Umfang oder Komplexität ändern –
          darüber wird der Kunde rechtzeitig informiert.
        </p>
        <p>
          Die Zahlung erfolgt unmittelbar nach Fertigstellung der Leistung in bar oder
          per vereinbartem Zahlungsmittel.
        </p>
      </>
    ),
  },
  {
    id: "gesundheit",
    title: "Gesundheitliche Voraussetzungen",
    content: (
      <>
        <p>
          Der Kunde versichert, keine gesundheitlichen Beeinträchtigungen zu haben, die
          einer Tätowierung entgegenstehen (z. B. Blutgerinnungsstörungen, aktive Hauterkrankungen,
          Allergien gegen Tattootinte, Schwangerschaft oder bestimmte Medikamente).
        </p>
        <p>
          Das Studio ist berechtigt, eine Tätowierung zu verweigern, wenn Anzeichen
          einer gesundheitlichen Kontraindikation vorliegen oder der Kunde sichtlich
          unter dem Einfluss von Alkohol oder Drogen steht.
        </p>
      </>
    ),
  },
  {
    id: "nachsorge",
    title: "Nachsorge & Heilung",
    content: (
      <>
        <p>
          Das Studio gibt dem Kunden Nachsorgeanweisungen. Der Kunde ist für die
          ordnungsgemäße Pflege des frischen Tattoos selbst verantwortlich.
        </p>
        <p>
          Eine Nachbesserung innerhalb der ersten 3 Monate nach dem Termin ist
          kostenfrei, sofern die Ursache in der Tätowierung selbst liegt und die
          Nachsorgehinweise befolgt wurden. Nachbesserungen aufgrund unsachgemäßer
          Pflege oder äußerer Einwirkungen sind kostenpflichtig.
        </p>
      </>
    ),
  },
  {
    id: "urheberrecht",
    title: "Urheberrecht & Designs",
    content: (
      <>
        <p>
          Custom-Designs, die das Studio speziell für den Kunden erstellt, sind
          urheberrechtlich geschützt und dürfen nicht ohne schriftliche Genehmigung
          anderweitig verwertet werden.
        </p>
        <p>
          Das Studio behält sich das Recht vor, Fotos des fertiggestellten Tattoos für
          Portfolio- und Werbezwecke zu verwenden, sofern der Kunde nicht ausdrücklich
          widerspricht. Der Widerspruch kann jederzeit schriftlich erklärt werden.
        </p>
      </>
    ),
  },
  {
    id: "haftung",
    title: "Haftungsbeschränkung",
    content: (
      <p>
        Das Studio haftet nur für Schäden, die auf grob fahrlässigem oder vorsätzlichem
        Handeln beruhen. Für normale Heilungsverläufe, die zu Farbveränderungen oder
        leichten Abweichungen vom ursprünglichen Design führen können, wird keine Haftung
        übernommen, da diese biologisch bedingt sind.
      </p>
    ),
  },
  {
    id: "schlussbestimmungen",
    title: "Schlussbestimmungen",
    content: (
      <>
        <p>
          Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand für alle
          Streitigkeiten ist, soweit gesetzlich zulässig, der Sitz des Studios.
        </p>
        <p>
          Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleibt die
          Wirksamkeit der übrigen Bestimmungen unberührt.
        </p>
      </>
    ),
  },
];

export default function AgbPage(): React.JSX.Element {
  return (
    <LegalPage
      eyebrow="Rechtliches"
      title="Allgemeine Geschäftsbedingungen"
      lastUpdated="März 2026"
      sections={sections}
    />
  );
}
