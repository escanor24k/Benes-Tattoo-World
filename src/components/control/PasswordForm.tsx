"use client";

import { useState } from "react";
import { Loader2, Save, Eye, EyeOff } from "lucide-react";
import { changePasswordAction } from "@/actions/auth/password";

export function PasswordForm(): React.JSX.Element {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    const result = await changePasswordAction(new FormData(e.currentTarget));
    if (result.success) {
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } else {
      setError(result.error);
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6 flex flex-col gap-4">
      {/* Aktuelles Passwort */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="currentPassword" className="text-sm font-medium text-foreground">
          Aktuelles Passwort
        </label>
        <div className="relative">
          <input
            id="currentPassword"
            name="currentPassword"
            type={showCurrent ? "text" : "password"}
            required
            autoComplete="current-password"
            className="w-full px-4 py-3 pr-11 rounded-xl border border-border bg-background text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-accent transition-colors duration-200 text-sm"
          />
          <button
            type="button"
            onClick={() => setShowCurrent((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-subtle hover:text-foreground transition-colors"
            tabIndex={-1}
          >
            {showCurrent ? <EyeOff size={16} strokeWidth={1.5} /> : <Eye size={16} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Neues Passwort */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="newPassword" className="text-sm font-medium text-foreground">
          Neues Passwort
          <span className="ml-1 text-xs text-foreground-subtle">(min. 8 Zeichen)</span>
        </label>
        <div className="relative">
          <input
            id="newPassword"
            name="newPassword"
            type={showNew ? "text" : "password"}
            required
            minLength={8}
            autoComplete="new-password"
            className="w-full px-4 py-3 pr-11 rounded-xl border border-border bg-background text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-accent transition-colors duration-200 text-sm"
          />
          <button
            type="button"
            onClick={() => setShowNew((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-subtle hover:text-foreground transition-colors"
            tabIndex={-1}
          >
            {showNew ? <EyeOff size={16} strokeWidth={1.5} /> : <Eye size={16} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Bestätigung */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
          Neues Passwort bestätigen
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className="px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-accent transition-colors duration-200 text-sm"
        />
      </div>

      {success && <p className="text-sm text-green-600">Passwort erfolgreich geändert ✓</p>}
      {error   && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-anthrazit text-white text-sm font-medium hover:bg-anthrazit-light disabled:opacity-60 transition-colors duration-200 self-start mt-2"
      >
        {loading
          ? <Loader2 size={15} strokeWidth={1.5} className="animate-spin" />
          : <Save size={15} strokeWidth={1.5} />}
        Passwort ändern
      </button>
    </form>
  );
}
