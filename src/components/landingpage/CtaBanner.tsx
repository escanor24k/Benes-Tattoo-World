import Link from "next/link";

export function CtaBanner(): React.JSX.Element {
  return (
    <section className="py-20 px-6 bg-anthrazit">
      <div className="max-w-3xl mx-auto text-center">
        <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-sand mb-4">
          Bereit?
        </span>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
          Dein nächstes Tattoo wartet.
        </h2>
        <p className="text-white/60 text-lg mb-8 leading-relaxed">
          Schreib mir – ich berate dich unverbindlich zu deiner Idee, dem passenden
          Stil und einem Termin, der zu dir passt.
        </p>
        <Link
          href="/kontakt"
          className="inline-block px-8 py-4 rounded-xl bg-accent text-white font-medium text-lg hover:bg-accent-dark transition-colors duration-200 shadow-lg"
        >
          Termin anfragen
        </Link>
      </div>
    </section>
  );
}
