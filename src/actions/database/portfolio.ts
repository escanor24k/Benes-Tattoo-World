"use server";

import { prisma } from "@/lib/prisma/client";
import type { ActionResult, TattooStyle } from "@/types";

export interface PortfolioItemData {
  id: string;
  title: string | null;
  imageUrl: string;
  category: string;
  description: string | null;
  sortOrder: number;
}

export async function getPortfolioItems(
  category?: TattooStyle
): Promise<ActionResult<PortfolioItemData[]>> {
  try {
    const items = await prisma.portfolioItem.findMany({
      where: {
        isVisible: true,
        ...(category ? { category } : {}),
      },
      orderBy: { sortOrder: "asc" },
      select: {
        id: true,
        title: true,
        imageUrl: true,
        category: true,
        description: true,
        sortOrder: true,
      },
    });
    return { success: true, data: items };
  } catch {
    return { success: false, error: "Portfolio konnte nicht geladen werden." };
  }
}

export async function createPortfolioItem(formData: FormData): Promise<ActionResult> {
  try {
    const imageUrl = formData.get("imageUrl") as string;
    const category = formData.get("category") as string;
    const title = formData.get("title") as string | null;
    const description = formData.get("description") as string | null;

    if (!imageUrl || !category) {
      return { success: false, error: "Bild und Kategorie sind Pflichtfelder." };
    }

    await prisma.portfolioItem.create({
      data: {
        imageUrl,
        category,
        title: title || null,
        description: description || null,
      },
    });
    return { success: true };
  } catch {
    return { success: false, error: "Fehler beim Erstellen des Eintrags." };
  }
}

export async function deletePortfolioItem(id: string): Promise<ActionResult> {
  try {
    await prisma.portfolioItem.delete({ where: { id } });
    return { success: true };
  } catch {
    return { success: false, error: "Fehler beim Löschen des Eintrags." };
  }
}

export async function updatePortfolioItem(
  id: string,
  data: Partial<{ title: string; description: string; category: string; sortOrder: number; isVisible: boolean }>
): Promise<ActionResult> {
  try {
    await prisma.portfolioItem.update({ where: { id }, data });
    return { success: true };
  } catch {
    return { success: false, error: "Fehler beim Aktualisieren des Eintrags." };
  }
}
