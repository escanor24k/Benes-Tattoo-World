# Benes-Tattoo-World

Moderne, vollständig responsive Website für einen Tattoo-Artist  
(Fokus: Fineline, Realistic & Black 'n White)

---

## 🚀 Tech Stack

- Next.js (App Router)
- TailwindCSS (reines Tailwind-Projekt)
- Prisma ORM
- NeonDB (Serverless)
- Zod
- Nodemailer (SMTP)
- Vercel Blob Storage
- argon2 (Passwort-Hashing)
- lucide-react (Icons)

Deployment-Ziel: **Vercel**

---

## ✨ Features

### Öffentlicher Bereich

- Landingpage mit Hero Slider
- Portfolio Galerie (Filter + Modal)
- Termin- & Kontaktformular (SMTP, keine Auto-Buchung)
- Zertifikate Übersicht
- Dynamischer Header & Footer
- Impressum, AGB, Datenschutz (DSGVO-konform)

### Admin Dashboard (`/control`)

- Kontaktangaben verwalten
- Portfolio CRUD + Bild-Uploads
- Zertifikate CRUD
- Social Media Links dynamisch steuerbar
- Öffnungszeiten vollständig verwaltbar

---

## 📱 Responsiveness

- Mobile First
- Vollständig optimiert für:
  - Mobile
  - Tablet
  - Desktop
- Smooth Scroll & subtile 3D Effekte

---

## 🗂 Projektstruktur

```text
root/
├── prisma/
├── public/
└── src/
    ├── app/
    │   ├── (public)/
    │   ├── (internal)/control/
    │   └── (auth)/
    ├── actions/
    ├── components/
    ├── lib/
    ├── hooks/
    ├── types/
    ├── config/
    └── proxy.ts
```

---

## 🔐 Sicherheit

- argon2 Passwort-Hashing
- Serverseitige Session-Prüfung
- Zod Validierung
- Keine unnötigen Cookies
- DSGVO-konforme Datenminimierung

---

## 🛠 Development

```bash
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

---

## 🎯 Ziel

Eine moderne, elegante Tattoo-Website mit starker visueller Präsenz, maximaler Responsiveness und vollständiger administrativer Kontrolle.