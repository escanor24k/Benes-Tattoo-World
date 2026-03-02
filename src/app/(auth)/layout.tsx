import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }): React.JSX.Element {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-[var(--color-surface-muted)]">
      {children}
    </div>
  );
}
