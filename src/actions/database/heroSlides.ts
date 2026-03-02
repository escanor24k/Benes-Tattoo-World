"use server";

import { prisma } from "@/lib/prisma/client";
import type { ActionResult } from "@/types";
import { revalidatePath } from "next/cache";

export interface HeroSlideData {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string | null;
  sortOrder: number;
  isActive: boolean;
}

export async function getHeroSlides(): Promise<ActionResult<HeroSlideData[]>> {
  try {
    const slides = await prisma.heroSlide.findMany({
      orderBy: { sortOrder: "asc" },
      select: { id: true, imageUrl: true, title: true, subtitle: true, sortOrder: true, isActive: true },
    });
    return { success: true, data: slides };
  } catch {
    return { success: false, error: "Slides konnten nicht geladen werden." };
  }
}

export async function createHeroSlide(formData: FormData): Promise<ActionResult> {
  try {
    const imageUrl = formData.get("imageUrl") as string;
    const title = formData.get("title") as string;
    const subtitle = (formData.get("subtitle") as string) || null;
    const sortOrder = parseInt((formData.get("sortOrder") as string) || "0", 10);

    if (!imageUrl || !title) {
      return { success: false, error: "Bild und Titel sind Pflichtfelder." };
    }

    await prisma.heroSlide.create({ data: { imageUrl, title, subtitle, sortOrder } });
    revalidatePath("/");
    return { success: true };
  } catch {
    return { success: false, error: "Fehler beim Erstellen des Slides." };
  }
}

export async function deleteHeroSlide(id: string): Promise<ActionResult> {
  try {
    await prisma.heroSlide.delete({ where: { id } });
    revalidatePath("/");
    return { success: true };
  } catch {
    return { success: false, error: "Fehler beim Löschen." };
  }
}

export async function toggleHeroSlideActive(id: string, isActive: boolean): Promise<ActionResult> {
  try {
    await prisma.heroSlide.update({ where: { id }, data: { isActive } });
    revalidatePath("/");
    return { success: true };
  } catch {
    return { success: false, error: "Fehler beim Aktualisieren." };
  }
}
