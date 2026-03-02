import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default async function ControlPage(): Promise<React.JSX.Element> {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <main>
      <h1>Admin Dashboard</h1>
      <p>Willkommen, {session.email}</p>
    </main>
  );
}
