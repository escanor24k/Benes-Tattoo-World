import { z } from "zod";

export const ContactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name muss mindestens 2 Zeichen lang sein")
    .max(100, "Name ist zu lang"),
  email: z.string().email("Bitte eine gültige E-Mail-Adresse eingeben"),
  phone: z
    .string()
    .max(30, "Telefonnummer ist zu lang")
    .optional()
    .or(z.literal("")),
  tattooStyle: z
    .enum(["fineline", "realistic", "blackandwhite", ""])
    .optional(),
  message: z
    .string()
    .min(10, "Nachricht muss mindestens 10 Zeichen lang sein")
    .max(2000, "Nachricht ist zu lang"),
  // Honeypot – muss leer bleiben
  website: z.string().max(0, "Spam erkannt").optional(),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;
