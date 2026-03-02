"use server";

import { prisma } from "@/lib/prisma/client";
import type { ActionResult } from "@/types";
import { revalidatePath } from "next/cache";

export interface CertificateData {
  id: string;
  title: string;
  imageUrl: string;
  issuer: string | null;
  description: string | null;
  sortOrder: number;
  isVisible: boolean;
}

export async function getCertificates(): Promise<ActionResult<CertificateData[]>> {
  try {
    const items = await prisma.certificate.findMany({
      where: { isVisible: true },
      orderBy: { sortOrder: "asc" },
    });
    return { success: true, data: items };
  } catch {
    return { success: false, error: "Zertifikate konnten nicht geladen werden." };
  }
}

export async function createCertificate(formData: FormData): Promise<ActionResult> {
  try {
    const imageUrl = formData.get("imageUrl") as string;
    const title = formData.get("title") as string;
    if (!imageUrl || !title) return { success: false, error: "Titel und Bild sind Pflichtfelder." };

    await prisma.certificate.create({
      data: {
        imageUrl,
        title,
        issuer: (formData.get("issuer") as string) || null,
        description: (formData.get("description") as string) || null,
      },
    });
    revalidatePath("/zertifikate");
    return { success: true };
  } catch {
    return { success: false, error: "Fehler beim Erstellen." };
  }
}

export async function deleteCertificate(id: string): Promise<ActionResult> {
  try {
    await prisma.certificate.delete({ where: { id } });
    revalidatePath("/zertifikate");
    return { success: true };
  } catch {
    return { success: false, error: "Fehler beim Löschen." };
  }
}
