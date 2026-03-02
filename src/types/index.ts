export type { SessionPayload } from "./session";

export type ActionResult<T = undefined> =
  | { success: true; data?: T }
  | { success: false; error: string };

export type TattooStyle = "fineline" | "realistic" | "blackandwhite";

export const TATTOO_STYLES: Record<TattooStyle, string> = {
  fineline: "Fineline",
  realistic: "Realistic",
  blackandwhite: "Black'n'White",
};

export type SocialPlatform = "instagram" | "facebook" | "tiktok" | "youtube";

export const SOCIAL_PLATFORMS: Record<SocialPlatform, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  tiktok: "TikTok",
  youtube: "YouTube",
};
