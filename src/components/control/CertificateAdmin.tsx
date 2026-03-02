"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Loader2, Upload } from "lucide-react";
import { createCertificate, deleteCertificate } from "@/actions/database/certificates";
import type { CertificateData } from "@/actions/database/certificates";

interface CertificateAdminProps {
  items: CertificateData[];
}

export function CertificateAdmin({ items }: CertificateAdminProps): React.JSX.Element {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  function applyFile(file: File): void {
    if (!file.type.startsWith("image/")) {
      setError("Nur Bilddateien erlaubt.");
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
    if (file) setPreview(URL.createObjectURL(file));
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) applyFile(file);
  }

  async function handleUpload(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const formEl = e.currentTarget;
    const file = fileRef.current?.files?.[0];
    if (!file) { setError("Bitte eine Datei auswählen."); return; }

    setUploading(true);
    setError("");

    const uploadForm = new FormData();
    uploadForm.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: uploadForm });
    const json = await res.json() as { url?: string; error?: string };

    if (!res.ok || !json.url) {
      setError(json.error ?? "Upload fehlgeschlagen.");
      setUploading(false);
      return;
    }

    const form = new FormData(formEl);
    form.set("imageUrl", json.url);
    const result = await createCertificate(form);

    if (!result.success) {
      setError(result.error);
    } else {
      setPreview(null);
      if (fileRef.current) fileRef.current.value = "";
      router.refresh();
    }
    setUploading(false);
  }

  async function handleDelete(id: string): Promise<void> {
    setDeleting(id);
    await deleteCertificate(id);
    router.refresh();
    setDeleting(null);
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Upload */}
      <div className="card p-6">
        <p className="font-semibold text-anthrazit mb-5">Neues Zertifikat hochladen</p>
        <form onSubmit={handleUpload} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">Titel *</label>
              <input
                name="title"
                required
                placeholder="z.B. Hygiene-Zertifikat 2024"
                className="px-4 py-3 rounded-xl border border-border bg-surface text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-accent transition-colors duration-200 text-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">
                Aussteller <span className="text-foreground-subtle text-xs">(optional)</span>
              </label>
              <input
                name="issuer"
                placeholder="z.B. TÜV Rheinland"
                className="px-4 py-3 rounded-xl border border-border bg-surface text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-accent transition-colors duration-200 text-sm"
              />
            </div>
          </div>

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
                <p className="text-sm">Klicken zum Auswählen</p>
                <p className="text-xs">JPG, PNG, WebP – max. 10 MB</p>
              </div>
            )}
            <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={uploading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-anthrazit text-white text-sm font-medium hover:bg-anthrazit-light disabled:opacity-60 transition-colors duration-200 self-start"
          >
            {uploading
              ? <><Loader2 size={15} strokeWidth={1.5} className="animate-spin" /> Wird hochgeladen…</>
              : <><Plus size={15} strokeWidth={1.5} /> Hinzufügen</>
            }
          </button>
        </form>
      </div>

      {/* Liste */}
      <div className="card p-6">
        <p className="font-semibold text-anthrazit mb-5">
          Einträge <span className="text-foreground-subtle font-normal">({items.length})</span>
        </p>
        {items.length === 0 ? (
          <p className="text-sm text-foreground-subtle py-4">Noch keine Zertifikate vorhanden.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-3 rounded-xl border border-border">
                <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-surface-muted">
                  <Image src={item.imageUrl} alt={item.title} fill className="object-cover" sizes="56px" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-anthrazit truncate">{item.title}</p>
                  {item.issuer && <p className="text-xs text-foreground-muted">{item.issuer}</p>}
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  disabled={deleting === item.id}
                  className="p-2 rounded-lg text-foreground-subtle hover:text-red-500 hover:bg-red-50 transition-colors duration-200"
                  aria-label="Löschen"
                >
                  {deleting === item.id
                    ? <Loader2 size={16} strokeWidth={1.5} className="animate-spin" />
                    : <Trash2 size={16} strokeWidth={1.5} />
                  }
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
