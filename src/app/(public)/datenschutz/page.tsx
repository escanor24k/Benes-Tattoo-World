import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";
import type { LegalSection } from "@/components/ui/LegalPage";
import { getPublicContactInfo } from "@/actions/database/public";

export const metadata: Metadata = {
  title: "Datenschutz",
  robots: { index: false, follow: false },
};

const STATIC_SECTIONS: LegalSection[] = [
  {
    id: "grundsaetze",
    title: "Grundsätze der Datenverarbeitung",
    content: (
      <>
        <p>
          Wir verarbeiten personenbezogene Daten nur im Rahmen der geltenden
          datenschutzrechtlichen Vorschriften, insbesondere der DSGVO. Daten werden
          ausschließlich für die jeweils angegebenen Zwecke erhoben und nicht ohne
          Einwilligung an Dritte weitergegeben.
        </p>
        <p>
          Wir erheben grundsätzlich nur die Daten, die zur Erfüllung des jeweiligen
          Zwecks notwendig sind (<strong>Datensparsamkeit</strong>).
        </p>
      </>
    ),
  },
  {
    id: "hosting",
    title: "Hosting & technische Infrastruktur",
    content: (
      <>
        <p>
          Diese Website wird bei <strong>Vercel Inc.</strong> (340 Pine Street, Suite 701,
          San Francisco, CA 94104, USA) gehostet. Bei jedem Aufruf unserer Website werden
          automatisch Informationen in sogenannten Server-Log-Dateien gespeichert, die dein
          Browser automatisch übermittelt:
        </p>
        <ul>
          <li>Browsertyp und -version</li>
          <li>Verwendetes Betriebssystem</li>
          <li>Referrer-URL</li>
          <li>IP-Adresse (anonymisiert)</li>
          <li>Datum und Uhrzeit des Zugriffs</li>
        </ul>
        <p>
          Diese Daten werden nicht mit anderen Datenquellen zusammengeführt und nach
          spätestens 7 Tagen automatisch gelöscht. Rechtsgrundlage ist Art. 6 Abs. 1
          lit. f DSGVO (berechtigtes Interesse an einem sicheren Betrieb).
        </p>
      </>
    ),
  },
  {
    id: "kontaktformular",
    title: "Kontaktformular",
    content: (
      <>
        <p>
          Wenn du uns über das Kontaktformular eine Anfrage zukommen lässt, werden deine
          Angaben inklusive der von dir angegebenen Kontaktdaten zur Bearbeitung der Anfrage
          und für den Fall von Anschlussfragen bei uns gespeichert.
        </p>
        <p>
          Folgende Daten werden erhoben:
        </p>
        <ul>
          <li>Name (Pflichtfeld)</li>
          <li>E-Mail-Adresse (Pflichtfeld)</li>
          <li>Telefonnummer (freiwillig)</li>
          <li>Gewünschter Tattoo-Stil (freiwillig)</li>
          <li>Nachrichteninhalt (Pflichtfeld)</li>
        </ul>
        <p>
          Die Daten werden ausschließlich zur Beantwortung deiner Anfrage genutzt und
          nicht an Dritte weitergegeben. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO
          (vorvertragliche Maßnahmen) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
          Interesse). Daten werden nach vollständiger Bearbeitung der Anfrage gelöscht,
          spätestens nach 6 Monaten.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies & Session",
    content: (
      <>
        <p>
          Diese Website verwendet ausschließlich technisch notwendige Cookies. Es werden
          keine Tracking-, Analyse- oder Werbe-Cookies eingesetzt.
        </p>
        <p>
          Das einzige gesetzte Cookie ist ein <strong>Session-Cookie</strong>, das
          ausschließlich im passwortgeschützten Administrationsbereich gesetzt wird und
          nach 24 Stunden automatisch abläuft. Es enthält keine personenbezogenen Daten
          in lesbarer Form. Eine Einwilligung ist gemäß § 25 Abs. 2 TTDSG nicht
          erforderlich.
        </p>
      </>
    ),
  },
  {
    id: "bilder",
    title: "Portfolio & Bilder",
    content: (
      <p>
        Die auf dieser Website gezeigten Tattoo-Fotografien zeigen Kunden, die der
        Veröffentlichung ausdrücklich zugestimmt haben. Sofern du eine Entfernung
        deiner Person betreffender Bilder wünschst, wende dich bitte an uns unter
        der oben genannten E-Mail-Adresse.
      </p>
    ),
  },
  {
    id: "rechte",
    title: "Deine Rechte",
    content: (
      <>
        <p>Du hast gegenüber uns folgende Rechte hinsichtlich deiner Daten:</p>
        <ul>
          <li><strong>Auskunft</strong> (Art. 15 DSGVO)</li>
          <li><strong>Berichtigung</strong> (Art. 16 DSGVO)</li>
          <li><strong>Löschung</strong> (Art. 17 DSGVO)</li>
          <li><strong>Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO)</li>
          <li><strong>Datenübertragbarkeit</strong> (Art. 20 DSGVO)</li>
          <li><strong>Widerspruch</strong> gegen die Verarbeitung (Art. 21 DSGVO)</li>
        </ul>
        <p>
          Du hast außerdem das Recht, dich bei einer Datenschutz-Aufsichtsbehörde über
          die Verarbeitung deiner personenbezogenen Daten zu beschweren.
        </p>
        <p>
          Zur Geltendmachung deiner Rechte wende dich an:{" "}
          <a href="mailto:info@benes-tattoo.de">info@benes-tattoo.de</a>
        </p>
      </>
    ),
  },
  {
    id: "aenderungen",
    title: "Änderungen dieser Erklärung",
    content: (
      <p>
        Wir behalten uns vor, diese Datenschutzerklärung anzupassen, um sie stets den
        aktuellen rechtlichen Anforderungen entsprechen zu lassen oder um Änderungen
        unserer Leistungen umzusetzen. Die jeweils aktuelle Version ist stets auf dieser
        Seite abrufbar.
      </p>
    ),
  },
];

export default async function DatenschutzPage(): Promise<React.JSX.Element> {
  const contact = await getPublicContactInfo();

  const verantwortlicher: LegalSection = {
    id: "verantwortlicher",
    title: "Verantwortlicher",
    content: (
      <p>
        Verantwortlich für die Datenverarbeitung auf dieser Website ist:<br /><br />
        <strong>Bene&apos;s Tattoo World</strong><br />
        {contact.city && <>{contact.city}<br /></>}
        {contact.email && (
          <>E-Mail: <a href={`mailto:${contact.email}`}>{contact.email}</a><br /></>
        )}
        {contact.phone && <>Telefon: {contact.phone}</>}
      </p>
    ),
  };

  return (
    <LegalPage
      eyebrow="Rechtliches"
      title="Datenschutzerklärung"
      lastUpdated="März 2026"
      sections={[verantwortlicher, ...STATIC_SECTIONS]}
    />
  );
}
