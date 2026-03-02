"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Upload, Loader2, Trash2 } from "lucide-react";
import { upsertArtistPhoto } from "@/actions/database/settings";

interface ArtistPhotoUploadProps {
  currentUrl: string;
}

const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "image/avif"];

export function ArtistPhotoUpload({ currentUrl }: ArtistPhotoUploadProps): React.JSX.Element {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>(currentUrl);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");

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
    if (file) applyFile(file);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) applyFile(file);
  }

  async function handleUpload(): Promise<void> {
    const file = fileRef.current?.files?.[0];
    if (!file) { setError("Bitte ein Bild auswählen."); return; }

    setUploading(true);
    setError("");

    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: form });
    const json = await res.json() as { url?: string; error?: string };

    if (!res.ok || !json.url) {
      setError(json.error ?? "Upload fehlgeschlagen.");
      setUploading(false);
      return;
    }

    const result = await upsertArtistPhoto(json.url);
    if (!result.success) {
      setError(result.error);
    } else {
      setPreview(json.url);
      if (fileRef.current) fileRef.current.value = "";
      router.refresh();
    }
    setUploading(false);
  }

  async function handleRemove(): Promise<void> {
    setUploading(true);
    const result = await upsertArtistPhoto("");
    if (result.success) {
      setPreview("");
      router.refresh();
    }
    setUploading(false);
  }

  return (
    <div className="card p-6 flex flex-col gap-5">
      <p className="font-semibold text-anthrazit">Artist-Foto</p>

      <div className="flex flex-col sm:flex-row gap-6 items-start">
        {/* Vorschau */}
        <div className="relative shrink-0">
          <div className="w-36 h-44 rounded-2xl overflow-hidden bg-surface-muted border border-border">
            {preview ? (
              <Image
                src={preview}
                alt="Artist-Foto"
                fill
                className="object-cover"
                sizes="144px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-foreground-subtle">
                Kein Foto
              </div>
            )}
          </div>
          {preview && (
            <button
              onClick={handleRemove}
              disabled={uploading}
              aria-label="Foto entfernen"
              className="absolute -top-2 -right-2 p-1.5 rounded-full bg-white border border-border shadow-sm text-foreground-subtle hover:text-red-500 transition-colors duration-200 disabled:opacity-50"
            >
              <Trash2 size={13} strokeWidth={1.5} />
            </button>
          )}
        </div>

        {/* Dropzone + Button */}
        <div className="flex flex-col gap-3 flex-1 w-full">
          <div
            onClick={() => fileRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragEnter={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors duration-200 ${
              dragOver ? "border-accent bg-accent/5" : "border-border hover:border-accent"
            }`}
          >
            <div className="flex flex-col items-center gap-2 text-foreground-subtle">
              <Upload size={20} strokeWidth={1.5} />
              <p className="text-sm">Klicken oder Bild hierher ziehen</p>
              <p className="text-xs">JPG, PNG, WebP – empfohlen: Hochformat</p>
            </div>
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
            onClick={handleUpload}
            disabled={uploading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-anthrazit text-white text-sm font-medium hover:bg-anthrazit-light disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 self-start"
          >
            {uploading
              ? <><Loader2 size={15} strokeWidth={1.5} className="animate-spin" /> Wird hochgeladen…</>
              : <><Upload size={15} strokeWidth={1.5} /> Foto speichern</>
            }
          </button>
        </div>
      </div>
    </div>
  );
}
