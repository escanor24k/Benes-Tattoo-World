import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { AdminSidebar } from "@/components/control/AdminSidebar";

export default async function InternalLayout({ children }: { children: ReactNode }): Promise<React.JSX.Element> {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <div className="flex min-h-dvh bg-surface-muted">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
