"use client";

import { useEffect, useState } from "react";

export interface LegalSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface LegalPageProps {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
}

export function LegalPage({ eyebrow, title, lastUpdated, sections }: LegalPageProps): React.JSX.Element {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className="py-16 px-6 bg-background min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 pb-8 border-b border-border">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
            {eyebrow}
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-anthrazit">
            {title}
          </h1>
          <p className="text-sm text-foreground-subtle mt-3">
            Stand: {lastUpdated}
          </p>
        </div>

        <div className="flex gap-12 items-start">
          {/* Sticky Sidebar Nav */}
          <aside className="hidden lg:block w-56 shrink-0 sticky top-24">
            <p className="text-xs font-semibold uppercase tracking-widest text-foreground-subtle mb-3">
              Inhalt
            </p>
            <nav className="flex flex-col gap-0.5">
              {sections.map(({ id, title: sTitle }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`text-sm px-3 py-2 rounded-lg transition-all duration-200 ${
                    activeId === id
                      ? "bg-anthrazit text-white font-medium"
                      : "text-foreground-muted hover:text-anthrazit hover:bg-surface-muted"
                  }`}
                >
                  {sTitle}
                </a>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <article className="flex-1 min-w-0 flex flex-col gap-12">
            {sections.map(({ id, title: sTitle, content }) => (
              <section key={id} id={id} className="scroll-mt-28">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-anthrazit mb-4 pb-3 border-b border-border">
                  {sTitle}
                </h2>
                <div className="prose-legal">{content}</div>
              </section>
            ))}
          </article>
        </div>
      </div>
    </div>
  );
}
