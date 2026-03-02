"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Loader2, Upload, Eye, EyeOff } from "lucide-react";
import { createHeroSlide, deleteHeroSlide, toggleHeroSlideActive } from "@/actions/database/heroSlides";
import type { HeroSlideData } from "@/actions/database/heroSlides";

interface HeroAdminProps {
  slides: HeroSlideData[];
}

export function HeroAdmin({ slides }: HeroAdminProps): React.JSX.Element {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toggling, setToggling] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [sortOrder, setSortOrder] = useState("0");
  const [dragOver, setDragOver] = useState(false);

  const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "image/avif"];

  function applyFile(file: File): void {
    if (!ACCEPTED.includes(file.type)) {
      setError("Nur JPG, PNG, WebP oder AVIF erlaubt.");
      return;
    }
    const dt = new DataTransfer();
    dt.items.add(file);
    if (fileRef.current) fileRef.current.files = dt.files;
    setPreview(URL.createObjectURL(file));
    setError("");
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) applyFile(file);
  }

  async function handleUpload(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file) { setError("Bitte eine Datei auswählen."); return; }
    if (!title.trim()) { setError("Bitte einen Titel eingeben."); return; }

    setUploading(true);
    setError("");

    const uploadData = new FormData();
    uploadData.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: uploadData });
    const json = await res.json() as { url?: string; error?: string };

    if (!res.ok || !json.url) {
      setError(json.error ?? "Upload fehlgeschlagen.");
      setUploading(false);
      return;
    }

    const dbForm = new FormData();
    dbForm.set("imageUrl", json.url);
    dbForm.set("title", title);
    dbForm.set("subtitle", subtitle);
    dbForm.set("sortOrder", sortOrder);

    const result = await createHeroSlide(dbForm);
    if (!result.success) {
      setError(result.error);
    } else {
      setPreview(null);
      setTitle("");
      setSubtitle("");
      setSortOrder("0");
      if (fileRef.current) fileRef.current.value = "";
      router.refresh();
    }

    setUploading(false);
  }

  async function handleDelete(id: string): Promise<void> {
    setDeleting(id);
    await deleteHeroSlide(id);
    router.refresh();
    setDeleting(null);
  }

  async function handleToggle(id: string, current: boolean): Promise<void> {
    setToggling(id);
    await toggleHeroSlideActive(id, !current);
    router.refresh();
    setToggling(null);
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Upload-Formular */}
      <div className="card p-6">
        <p className="font-semibold text-anthrazit mb-5">Neuen Slide hinzufügen</p>
        <form onSubmit={handleUpload} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">
                Titel <span className="text-accent">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="z.B. Fineline"
                className="px-4 py-3 rounded-xl border border-border bg-surface text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-accent transition-colors duration-200 text-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">
                Untertitel <span className="text-foreground-subtle text-xs">(optional)</span>
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="z.B. Zarte Linien. Bleibende Eindrücke."
                className="px-4 py-3 rounded-xl border border-border bg-surface text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-accent transition-colors duration-200 text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 w-32">
            <label className="text-sm font-medium text-foreground">Reihenfolge</label>
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              min="0"
              className="px-4 py-3 rounded-xl border border-border bg-surface text-foreground focus:outline-none focus:border-accent transition-colors duration-200 text-sm"
            />
          </div>

          {/* Dropzone */}
          <div
            onClick={() => fileRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragEnter={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors duration-200 ${
              dragOver ? "border-accent bg-accent/5" : "border-border hover:border-accent"
            }`}
          >
            {preview ? (
              <div className="relative w-48 h-28 mx-auto rounded-lg overflow-hidden">
                <Image src={preview} alt="Vorschau" fill className="object-cover" />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-foreground-subtle">
                <Upload size={24} strokeWidth={1.5} />
                <p className="text-sm">Klicken zum Auswählen oder Bild hierher ziehen</p>
                <p className="text-xs">JPG, PNG, WebP – max. 10 MB (16:9 empfohlen)</p>
              </div>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={uploading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-anthrazit text-white text-sm font-medium hover:bg-anthrazit-light disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 self-start"
          >
            {uploading
              ? <><Loader2 size={15} strokeWidth={1.5} className="animate-spin" /> Wird hochgeladen…</>
              : <><Plus size={15} strokeWidth={1.5} /> Hinzufügen</>
            }
          </button>
        </form>
      </div>

      {/* Bestehende Slides */}
      <div className="card p-6">
        <p className="font-semibold text-anthrazit mb-5">
          Slides <span className="text-foreground-subtle font-normal">({slides.length})</span>
        </p>

        {slides.length === 0 ? (
          <p className="text-sm text-foreground-subtle py-4">Noch keine Slides vorhanden.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {slides.map((slide) => (
              <div key={slide.id} className="flex items-center gap-4 p-3 rounded-xl border border-border hover:bg-surface-muted transition-colors duration-200">
                <div className="relative w-20 h-12 rounded-lg overflow-hidden shrink-0 bg-surface-muted">
                  <Image src={slide.imageUrl} alt={slide.title} fill className="object-cover" sizes="80px" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-anthrazit truncate">{slide.title}</p>
                  {slide.subtitle && (
                    <p className="text-xs text-foreground-subtle truncate">{slide.subtitle}</p>
                  )}
                  <p className="text-xs text-foreground-subtle mt-0.5">Reihenfolge: {slide.sortOrder}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleToggle(slide.id, slide.isActive)}
                    disabled={toggling === slide.id}
                    title={slide.isActive ? "Deaktivieren" : "Aktivieren"}
                    className={`p-2 rounded-lg transition-colors duration-200 ${
                      slide.isActive
                        ? "text-accent bg-accent/10 hover:bg-accent/20"
                        : "text-foreground-subtle bg-surface-muted hover:bg-surface"
                    }`}
                  >
                    {toggling === slide.id
                      ? <Loader2 size={15} strokeWidth={1.5} className="animate-spin" />
                      : slide.isActive
                        ? <Eye size={15} strokeWidth={1.5} />
                        : <EyeOff size={15} strokeWidth={1.5} />
                    }
                  </button>
                  <button
                    onClick={() => handleDelete(slide.id)}
                    disabled={deleting === slide.id}
                    className="p-2 rounded-lg text-foreground-subtle hover:text-red-500 hover:bg-red-50 transition-colors duration-200"
                    aria-label="Löschen"
                  >
                    {deleting === slide.id
                      ? <Loader2 size={15} strokeWidth={1.5} className="animate-spin" />
                      : <Trash2 size={15} strokeWidth={1.5} />
                    }
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
