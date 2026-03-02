"use server";

import { redirect } from "next/navigation";
import * as argon2 from "argon2";
import { prisma } from "@/lib/prisma/client";
import { createSession, setSessionCookie } from "@/lib/auth/session";
import { LoginSchema } from "@/lib/validations/auth";
import type { ActionResult } from "@/types";

export async function loginAction(formData: FormData): Promise<ActionResult> {
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const parsed = LoginSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Ungültige Eingabe." };
  }

  const { email, password } = parsed.data;

  const user = await prisma.adminUser.findUnique({ where: { email } });
  if (!user) {
    return { success: false, error: "E-Mail oder Passwort ist falsch." };
  }

  const valid = await argon2.verify(user.passwordHash, password);
  if (!valid) {
    return { success: false, error: "E-Mail oder Passwort ist falsch." };
  }

  const token = await createSession({ adminId: user.id, email: user.email });
  await setSessionCookie(token);

  redirect("/control");
}

export async function logoutAction(): Promise<void> {
  const { deleteSessionCookie } = await import("@/lib/auth/session");
  await deleteSessionCookie();
  redirect("/login");
}
