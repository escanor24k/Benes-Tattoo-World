"use server";

import { prisma } from "@/lib/prisma/client";
import type { ActionResult } from "@/types";
import { revalidatePath } from "next/cache";

// ─── ContactInfo ────────────────────────────────────────
export async function getContactInfo(): Promise<Record<string, string>> {
  const rows = await prisma.contactInfo.findMany();
  return Object.fromEntries(rows.map((r) => [r.key, r.value]));
}

export async function upsertContactInfo(formData: FormData): Promise<ActionResult> {
  try {
    const keys = ["phone", "email", "city", "about"];
    await Promise.all(
      keys.map((key) => {
        const value = (formData.get(key) as string) ?? "";
        return prisma.contactInfo.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        });
      })
    );
    revalidatePath("/");
    return { success: true };
  } catch {
    return { success: false, error: "Speichern fehlgeschlagen." };
  }
}

export async function upsertArtistPhoto(url: string): Promise<ActionResult> {
  try {
    await prisma.contactInfo.upsert({
      where: { key: "artistPhoto" },
      update: { value: url },
      create: { key: "artistPhoto", value: url },
    });
    revalidatePath("/");
    return { success: true };
  } catch {
    return { success: false, error: "Speichern fehlgeschlagen." };
  }
}

// ─── SocialLinks ─────────────────────────────────────────
export async function getSocialLinks() {
  return prisma.socialLink.findMany({ orderBy: { sortOrder: "asc" } });
}

export async function upsertSocialLink(
  platform: string,
  url: string,
  isActive: boolean
): Promise<ActionResult> {
  try {
    await prisma.socialLink.upsert({
      where: { platform },
      update: { url, isActive },
      create: { platform, url, isActive, sortOrder: 0 },
    });
    revalidatePath("/");
    return { success: true };
  } catch {
    return { success: false, error: "Speichern fehlgeschlagen." };
  }
}

// ─── OpeningHours ─────────────────────────────────────────
export async function getOpeningHours() {
  return prisma.openingHours.findMany({ orderBy: { dayOfWeek: "asc" } });
}

export async function upsertOpeningHours(
  dayOfWeek: number,
  dayLabel: string,
  slots: { from: string; to: string }[],
  isClosed: boolean
): Promise<ActionResult> {
  try {
    await prisma.openingHours.upsert({
      where: { dayOfWeek },
      update: { slots, isClosed },
      create: { dayOfWeek, dayLabel, slots, isClosed, sortOrder: dayOfWeek },
    });
    revalidatePath("/");
    return { success: true };
  } catch {
    return { success: false, error: "Speichern fehlgeschlagen." };
  }
}
