"use client";

import { useState } from "react";
import { Loader2, LogIn, AlertCircle } from "lucide-react";
import { loginAction } from "@/actions/auth/login";

export function LoginForm(): React.JSX.Element {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await loginAction(formData);

    // redirect() wirft intern – wird hier also nur bei Fehler ausgeführt
    if (!result.success) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          E-Mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="admin@benes-tattoo.de"
          className="px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-accent transition-colors duration-200 text-sm"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-sm font-medium text-foreground">
          Passwort
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          placeholder="••••••••"
          className="px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-accent transition-colors duration-200 text-sm"
        />
      </div>

      {error && (
        <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-50 text-red-600 text-sm">
          <AlertCircle size={15} strokeWidth={1.5} className="shrink-0" />
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-anthrazit text-white font-medium hover:bg-anthrazit-light disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {loading ? (
          <>
            <Loader2 size={16} strokeWidth={1.5} className="animate-spin" />
            Anmelden…
          </>
        ) : (
          <>
            <LogIn size={16} strokeWidth={1.5} />
            Anmelden
          </>
        )}
      </button>
    </form>
  );
}
