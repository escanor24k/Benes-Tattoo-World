"use client";

import { useRef, useState } from "react";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { submitContactRequest } from "@/actions/database/contact";

const STYLES = [
  { value: "fineline", label: "Fineline" },
  { value: "realistic", label: "Realistic" },
  { value: "blackandwhite", label: "Black'n'White" },
];

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm(): React.JSX.Element {
  const formRef = useRef<HTMLFormElement>(null);
  const [startedAt] = useState<number>(() => Date.now());
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    formData.set("startedAt", String(startedAt));

    const result = await submitContactRequest(formData);

    if (result.success) {
      setStatus("success");
      formRef.current?.reset();
    } else {
      setStatus("error");
      setErrorMsg(result.error);
    }
  }

  if (status === "success") {
    return (
      <div className="card p-10 flex flex-col items-center text-center gap-4">
        <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
          <CheckCircle size={28} strokeWidth={1.5} className="text-green-500" />
        </div>
        <h3 className="font-display text-xl font-bold text-anthrazit">
          Anfrage gesendet!
        </h3>
        <p className="text-foreground-muted max-w-sm">
          Vielen Dank für deine Nachricht. Ich melde mich so schnell wie möglich bei dir.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm text-accent hover:underline underline-offset-4"
        >
          Weitere Anfrage senden
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="card p-8 flex flex-col gap-5">
      {/* Honeypot – verstecktes Feld */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="sr-only"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            Name <span className="text-accent">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Dein Name"
            className="px-4 py-3 rounded-xl border border-border bg-surface text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-accent transition-colors duration-200 text-sm"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            E-Mail <span className="text-accent">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="deine@email.de"
            className="px-4 py-3 rounded-xl border border-border bg-surface text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-accent transition-colors duration-200 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="text-sm font-medium text-foreground">
            Telefon
            <span className="ml-1 text-xs text-foreground-subtle">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+49 000 000 0000"
            className="px-4 py-3 rounded-xl border border-border bg-surface text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-accent transition-colors duration-200 text-sm"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="tattooStyle" className="text-sm font-medium text-foreground">
            Gewünschter Stil
            <span className="ml-1 text-xs text-foreground-subtle">(optional)</span>
          </label>
          <select
            id="tattooStyle"
            name="tattooStyle"
            className="px-4 py-3 rounded-xl border border-border bg-surface text-foreground focus:outline-none focus:border-accent transition-colors duration-200 text-sm appearance-none cursor-pointer"
          >
            <option value="">Bitte wählen…</option>
            {STYLES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          Nachricht <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Beschreibe deine Idee, Wunschtermin oder stelle eine Frage…"
          className="px-4 py-3 rounded-xl border border-border bg-surface text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-accent transition-colors duration-200 text-sm resize-none"
        />
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-50 text-red-600 text-sm">
          <AlertCircle size={16} strokeWidth={1.5} className="shrink-0" />
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-accent text-white font-medium hover:bg-accent-dark disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 self-start"
      >
        {status === "loading" ? (
          <>
            <Loader2 size={16} strokeWidth={1.5} className="animate-spin" />
            Wird gesendet…
          </>
        ) : (
          <>
            <Send size={16} strokeWidth={1.5} />
            Anfrage senden
          </>
        )}
      </button>

      <p className="text-xs text-foreground-subtle">
        Mit dem Absenden stimmst du der Verarbeitung deiner Daten gemäß unserer{" "}
        <a href="/datenschutz" className="underline hover:text-accent">
          Datenschutzerklärung
        </a>{" "}
        zu. Pflichtfelder sind mit * markiert.
      </p>
    </form>
  );
}
