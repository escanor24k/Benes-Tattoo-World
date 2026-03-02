"use server";

import * as argon2 from "argon2";
import { z } from "zod";
import { prisma } from "@/lib/prisma/client";
import { getSession } from "@/lib/auth/session";
import type { ActionResult } from "@/types";

const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Aktuelles Passwort ist erforderlich."),
  newPassword:     z.string().min(8, "Neues Passwort muss mindestens 8 Zeichen haben."),
  confirmPassword: z.string().min(1, "Bestätigung ist erforderlich."),
}).refine((d) => d.newPassword === d.confirmPassword, {
  message: "Passwörter stimmen nicht überein.",
  path: ["confirmPassword"],
});

export async function changePasswordAction(formData: FormData): Promise<ActionResult> {
  const session = await getSession();
  if (!session) return { success: false, error: "Nicht authentifiziert." };

  const raw = {
    currentPassword: formData.get("currentPassword"),
    newPassword:     formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const parsed = ChangePasswordSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Ungültige Eingabe." };
  }

  const { currentPassword, newPassword } = parsed.data;

  const user = await prisma.adminUser.findUnique({ where: { id: session.adminId } });
  if (!user) return { success: false, error: "Benutzer nicht gefunden." };

  const valid = await argon2.verify(user.passwordHash, currentPassword);
  if (!valid) return { success: false, error: "Aktuelles Passwort ist falsch." };

  const newHash = await argon2.hash(newPassword);
  await prisma.adminUser.update({
    where: { id: user.id },
    data: { passwordHash: newHash },
  });

  return { success: true };
}
