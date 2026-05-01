"use client";

import { useRef, useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB
const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"];

export function ImageUploader({
  value,
  onChange,
  folder,
  label = "Imagine",
  helper,
}: {
  /** Current image URL stored in form state. Empty string when none. */
  value: string;
  onChange: (url: string) => void;
  /** Folder inside the `media` bucket (e.g. "team", "tour", "programs"). */
  folder: string;
  label?: string;
  helper?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);

    if (!ACCEPTED.includes(file.type)) {
      setError("Format neacceptat. Folosește JPG, PNG, WebP sau SVG.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError("Fișierul depășește 5 MB.");
      return;
    }

    setUploading(true);
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
      const path = `${folder}/${crypto.randomUUID()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(path, file, { cacheControl: "3600", upsert: false });
      if (uploadError) throw new Error(uploadError.message);

      const { data } = supabase.storage.from("media").getPublicUrl(path);
      onChange(data.publicUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Eroare la încărcare");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function handleRemove() {
    onChange("");
    setError(null);
  }

  return (
    <div>
      <label className="block font-body text-base font-medium mb-2">{label}</label>

      {value ? (
        <div className="relative inline-block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt=""
            className="w-40 h-40 rounded-xl object-cover border border-gray-200 bg-gray-50"
          />
          <div className="absolute top-2 right-2 flex gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="p-1.5 rounded-md bg-white/95 border border-gray-200 hover:bg-white shadow-sm disabled:opacity-50"
              aria-label="Înlocuiește"
            >
              {uploading ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Upload size={14} />
              )}
            </button>
            <button
              type="button"
              onClick={handleRemove}
              disabled={uploading}
              className="p-1.5 rounded-md bg-white/95 border border-gray-200 hover:bg-red-50 hover:text-red-500 shadow-sm disabled:opacity-50"
              aria-label="Șterge"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-40 h-40 rounded-xl border-2 border-dashed border-gray-200 hover:border-gray-300 bg-gray-50 hover:bg-gray-100 flex flex-col items-center justify-center gap-2 text-muted disabled:opacity-50 transition-colors"
        >
          {uploading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <>
              <Upload size={20} />
              <span className="font-body text-sm">Încarcă imagine</span>
            </>
          )}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED.join(",")}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      {helper && !error && (
        <p className="font-body text-sm text-muted mt-2">{helper}</p>
      )}
      {error && (
        <p className="font-body text-sm text-red-500 mt-2">{error}</p>
      )}
    </div>
  );
}
