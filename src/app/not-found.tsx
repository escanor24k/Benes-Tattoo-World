import Link from "next/link";

export default function NotFound(): React.JSX.Element {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-20 bg-background">
      <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">
        Fehler 404
      </span>
      <h1 className="font-display text-5xl sm:text-6xl font-bold text-anthrazit mb-4 text-center">
        Seite nicht gefunden.
      </h1>
      <p className="text-foreground-muted text-lg text-center max-w-md mb-10">
        Die gesuchte Seite existiert nicht oder wurde verschoben.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link
          href="/"
          className="px-6 py-3 rounded-xl bg-anthrazit text-white font-medium hover:bg-anthrazit-light transition-colors duration-200"
        >
          Zur Startseite
        </Link>
        <Link
          href="/kontakt"
          className="px-6 py-3 rounded-xl border border-border text-foreground-muted hover:text-anthrazit hover:border-anthrazit transition-colors duration-200"
        >
          Kontakt
        </Link>
      </div>
    </div>
  );
}
