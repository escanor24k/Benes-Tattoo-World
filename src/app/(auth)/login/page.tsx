import type { Metadata } from "next";
import { LoginForm } from "@/components/forms/LoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function LoginPage(): React.JSX.Element {
  return (
    <div className="card p-8 w-full max-w-sm mx-4">
      <div className="mb-8 text-center">
        <p className="font-display text-2xl font-bold text-anthrazit">
          Bene&apos;s Tattoo World
        </p>
        <p className="text-sm text-foreground-muted mt-1">
          Admin-Bereich
        </p>
      </div>
      <LoginForm />
    </div>
  );
}
