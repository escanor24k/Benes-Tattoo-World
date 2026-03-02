import type { ReactNode } from "react";

export default function InternalLayout({ children }: { children: ReactNode }): React.JSX.Element {
  return <>{children}</>;
}
