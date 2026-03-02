"use server";

import { prisma } from "@/lib/prisma/client";

export interface PublicContactInfo {
  phone: string;
  email: string;
  city: string;
  about: string;
  artistPhoto: string;
}

export interface PublicSocialLink {
  platform: string;
  url: string;
}

export interface PublicOpeningHour {
  dayLabel: string;
  slots: { from: string; to: string }[];
  isClosed: boolean;
  dayOfWeek: number;
}

export interface HeroSlidePublic {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string | null;
}

export async function getPublicContactInfo(): Promise<PublicContactInfo> {
  const rows = await prisma.contactInfo.findMany().catch(() => []);
  const map = Object.fromEntries(rows.map((r) => [r.key, r.value]));
  return {
    phone:       map["phone"]       ?? "",
    email:       map["email"]       ?? "",
    city:        map["city"]        ?? "",
    about:       map["about"]       ?? "",
    artistPhoto: map["artistPhoto"] ?? "",
  };
}

export async function getActiveSocialLinks(): Promise<PublicSocialLink[]> {
  const rows = await prisma.socialLink
    .findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" } })
    .catch(() => []);
  return rows.map((r) => ({ platform: r.platform, url: r.url }));
}

export async function getPublicOpeningHours(): Promise<PublicOpeningHour[]> {
  const rows = await prisma.openingHours
    .findMany({ orderBy: { dayOfWeek: "asc" } })
    .catch(() => []);
  return rows.map((r) => ({
    dayLabel:  r.dayLabel,
    slots:     r.slots as { from: string; to: string }[],
    isClosed:  r.isClosed,
    dayOfWeek: r.dayOfWeek,
  }));
}

export async function getPublicHeroSlides(): Promise<HeroSlidePublic[]> {
  const rows = await prisma.heroSlide
    .findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" } })
    .catch(() => []);
  return rows.map((r) => ({
    id:       r.id,
    imageUrl: r.imageUrl,
    title:    r.title,
    subtitle: r.subtitle,
  }));
}
