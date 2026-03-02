"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Loader2, Upload } from "lucide-react";
import { createPortfolioItem, deletePortfolioItem } from "@/actions/database/portfolio";
import { TATTOO_STYLES } from "@/types";
import type { TattooStyle } from "@/types";
import type { PortfolioItemData } from "@/actions/database/portfolio";

interface PortfolioAdminProps {
  items: PortfolioItemData[];
}

const CATEGORIES: Array<{ value: TattooStyle; label: string }> = [
  { value: "fineline", label: "Fineline" },
  { value: "realistic", label: "Realistic" },
  { value: "blackandwhite", label: "Black'n'White" },
];

export function PortfolioAdmin({ items }: PortfolioAdminProps): React.JSX.Element {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [category, setCategory] = useState<TattooStyle>("fineline");
  const [title, setTitle] = useState("");
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

    setUploading(true);
    setError("");

    // Upload zu Vercel Blob
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const json = await res.json() as { url?: string; error?: string };

    if (!res.ok || !json.url) {
      setError(json.error ?? "Upload fehlgeschlagen.");
      setUploading(false);
      return;
    }

    // In DB speichern
    const dbForm = new FormData();
    dbForm.set("imageUrl", json.url);
    dbForm.set("category", category);
    dbForm.set("title", title);

    const result = await createPortfolioItem(dbForm);
    if (!result.success) {
      setError(result.error);
    } else {
      setPreview(null);
      setTitle("");
      if (fileRef.current) fileRef.current.value = "";
      router.refresh();
    }

    setUploading(false);
  }

  async function handleDelete(id: string): Promise<void> {
    setDeleting(id);
    await deletePortfolioItem(id);
    router.refresh();
    setDeleting(null);
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Upload-Formular */}
      <div className="card p-6">
        <p className="font-semibold text-anthrazit mb-5">Neues Bild hochladen</p>
        <form onSubmit={handleUpload} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">Kategorie</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TattooStyle)}
                className="px-4 py-3 rounded-xl border border-border bg-surface text-foreground focus:outline-none focus:border-accent transition-colors duration-200 text-sm"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">
                Titel <span className="text-foreground-subtle text-xs">(optional)</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="z.B. Rose Fineline"
                className="px-4 py-3 rounded-xl border border-border bg-surface text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-accent transition-colors duration-200 text-sm"
              />
            </div>
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
              <div className="relative w-32 h-32 mx-auto rounded-lg overflow-hidden">
                <Image src={preview} alt="Vorschau" fill className="object-cover" />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-foreground-subtle">
                <Upload size={24} strokeWidth={1.5} />
                <p className="text-sm">Klicken zum Auswählen oder Bild hierher ziehen</p>
                <p className="text-xs">JPG, PNG, WebP – max. 10 MB</p>
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

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={uploading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-anthrazit text-white text-sm font-medium hover:bg-anthrazit-light disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 self-start"
          >
            {uploading ? (
              <><Loader2 size={15} strokeWidth={1.5} className="animate-spin" /> Wird hochgeladen…</>
            ) : (
              <><Plus size={15} strokeWidth={1.5} /> Hinzufügen</>
            )}
          </button>
        </form>
      </div>

      {/* Bestehende Einträge */}
      <div className="card p-6">
        <p className="font-semibold text-anthrazit mb-5">
          Einträge <span className="text-foreground-subtle font-normal">({items.length})</span>
        </p>

        {items.length === 0 ? (
          <p className="text-sm text-foreground-subtle py-4">Noch keine Einträge vorhanden.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {items.map((item) => (
              <div key={item.id} className="group relative rounded-xl overflow-hidden aspect-square bg-surface-muted">
                <Image
                  src={item.imageUrl}
                  alt={item.title ?? "Portfolio"}
                  fill
                  className="object-cover"
                  sizes="200px"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-200 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <span className="text-white text-xs font-medium px-2 py-1 bg-black/40 rounded-full">
                    {TATTOO_STYLES[item.category as TattooStyle] ?? item.category}
                  </span>
                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={deleting === item.id}
                    className="p-2 rounded-full bg-red-500/80 text-white hover:bg-red-500 transition-colors duration-200"
                    aria-label="Löschen"
                  >
                    {deleting === item.id
                      ? <Loader2 size={14} strokeWidth={1.5} className="animate-spin" />
                      : <Trash2 size={14} strokeWidth={1.5} />
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
