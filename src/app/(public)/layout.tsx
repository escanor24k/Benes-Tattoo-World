import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function PublicLayout({ children }: { children: ReactNode }): React.JSX.Element {
  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
