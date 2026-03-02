"use server";

import { ContactFormSchema } from "@/lib/validations/contact";
import { sendMail } from "@/lib/utils/mailer";
import { prisma } from "@/lib/prisma/client";
import type { ActionResult } from "@/types";

export async function submitContactRequest(
  formData: FormData
): Promise<ActionResult> {
  // Honeypot: Feld muss leer sein
  const website = formData.get("website");
  if (website && String(website).length > 0) {
    return { success: false, error: "Spam erkannt." };
  }

  // Zeitprüfung: Formular muss mind. 3 Sekunden ausgefüllt worden sein
  const startedAt = formData.get("startedAt");
  if (startedAt) {
    const elapsed = Date.now() - Number(startedAt);
    if (elapsed < 3000) {
      return { success: false, error: "Bitte fülle das Formular vollständig aus." };
    }
  }

  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    tattooStyle: formData.get("tattooStyle"),
    message: formData.get("message"),
    website: "",
  };

  const parsed = ContactFormSchema.safeParse(raw);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return { success: false, error: first?.message ?? "Ungültige Eingabe." };
  }

  const { name, email, phone, tattooStyle, message } = parsed.data;

  const styleLabel: Record<string, string> = {
    fineline: "Fineline",
    realistic: "Realistic",
    blackandwhite: "Black'n'White",
    "": "Keine Angabe",
  };

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px;">
      <h2 style="color: #2d2d2d;">Neue Kontaktanfrage</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; color: #6b6b6b; width: 140px;">Name</td>
          <td style="padding: 8px 0; font-weight: bold;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b6b6b;">E-Mail</td>
          <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
        </tr>
        ${
          phone
            ? `<tr>
          <td style="padding: 8px 0; color: #6b6b6b;">Telefon</td>
          <td style="padding: 8px 0;">${phone}</td>
        </tr>`
            : ""
        }
        <tr>
          <td style="padding: 8px 0; color: #6b6b6b;">Stil</td>
          <td style="padding: 8px 0;">${styleLabel[tattooStyle ?? ""] ?? "Keine Angabe"}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b6b6b; vertical-align: top;">Nachricht</td>
          <td style="padding: 8px 0; white-space: pre-line;">${message}</td>
        </tr>
      </table>
    </div>
  `;

  try {
    await sendMail({
      subject: `Neue Anfrage von ${name}`,
      html,
      replyTo: email,
    });

    // Optionales DB-Logging
    await prisma.contactRequest.create({
      data: { name, email, phone: phone ?? null, tattooStyle: tattooStyle ?? null, message },
    });
  } catch (err) {
    console.error("Kontaktformular Fehler:", err);
    return {
      success: false,
      error: "Beim Senden ist ein Fehler aufgetreten. Bitte versuche es später erneut.",
    };
  }

  return { success: true };
}
