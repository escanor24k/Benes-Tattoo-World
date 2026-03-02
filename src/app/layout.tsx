import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Bene's Tattoo World – Fineline, Realistic & Black'n'White",
    template: "%s | Bene's Tattoo World",
  },
  description:
    "Professionelles Tattoo Studio mit Fokus auf Fineline, Realistic und Black'n'White. Jetzt Termin anfragen.",
  keywords: ["Tattoo", "Fineline", "Realistic", "Black and White", "Tattoo Studio"],
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <html lang="de" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
