import { KeyRound } from "lucide-react";
import { PasswordForm } from "@/components/control/PasswordForm";

export default function PasswortPage(): React.JSX.Element {
  return (
    <div className="max-w-md">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-lg bg-surface border border-border">
          <KeyRound size={20} strokeWidth={1.5} className="text-anthrazit" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-anthrazit">Passwort ändern</h1>
          <p className="text-sm text-foreground-muted">Zugang zum Admin-Dashboard</p>
        </div>
      </div>

      <PasswordForm />
    </div>
  );
}
