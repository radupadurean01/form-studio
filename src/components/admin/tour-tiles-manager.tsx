"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import type { TourTile } from "@/lib/supabase/types";
import {
  createTourTile,
  updateTourTile,
  deleteTourTile,
  reorderTourTiles,
} from "@/app/admin/actions";
import { ImageUploader } from "./image-uploader";

const SPAN_OPTIONS = [
  { value: "col-span-1 row-span-1", label: "1×1 (mic)" },
  { value: "col-span-2 row-span-1", label: "2×1 (lat)" },
  { value: "col-span-3 row-span-1", label: "3×1 (lat mare)" },
  { value: "col-span-1 row-span-2", label: "1×2 (înalt)" },
  { value: "col-span-2 row-span-2", label: "2×2 (pătrat mare)" },
  { value: "col-span-3 row-span-2", label: "3×2 (mare lat)" },
];

export function TourTilesManager({
  initialTiles,
}: {
  initialTiles: TourTile[];
}) {
  const router = useRouter();
  const [tiles, setTiles] = useState(initialTiles);
  const [editing, setEditing] = useState<TourTile | null>(null);
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTiles(initialTiles);
  }, [initialTiles]);

  const [imageUrl, setImageUrl] = useState("");
  const [eyebrow, setEyebrow] = useState("");
  const [title, setTitle] = useState("");
  const [spanClass, setSpanClass] = useState(SPAN_OPTIONS[1].value);

  function openCreate() {
    setImageUrl("");
    setEyebrow("");
    setTitle("");
    setSpanClass(SPAN_OPTIONS[1].value);
    setCreating(true);
    setEditing(null);
  }

  function openEdit(t: TourTile) {
    setImageUrl(t.image_url ?? "");
    setEyebrow(t.eyebrow);
    setTitle(t.title);
    setSpanClass(t.span_class);
    setEditing(t);
    setCreating(false);
  }

  function cancel() {
    setCreating(false);
    setEditing(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const data = {
      image_url: imageUrl || null,
      eyebrow,
      title,
      span_class: spanClass,
    };
    try {
      if (editing) {
        await updateTourTile(editing.id, data);
      } else {
        await createTourTile({ ...data, order: tiles.length + 1 });
      }
      cancel();
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Eroare");
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Ești sigur?")) return;
    await deleteTourTile(id);
    router.refresh();
  }

  async function handleMove(index: number, direction: "up" | "down") {
    const next = [...tiles];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= next.length) return;
    [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
    setTiles(next);
    await reorderTourTiles(next.map((t, i) => ({ id: t.id, order: i + 1 })));
    router.refresh();
  }

  const showForm = creating || editing;

  return (
    <div>
      {showForm ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          <h2 className="font-heading text-xl mb-4">
            {editing ? "Editează tile" : "Tile nou"}
          </h2>

          <ImageUploader
            value={imageUrl}
            onChange={setImageUrl}
            folder="tour"
            label="Imagine"
            helper="JPG, PNG, WebP — max 5 MB."
          />

          <div>
            <label className="block font-body text-base font-medium mb-2">
              Eyebrow (eticheta mică)
            </label>
            <input
              type="text"
              value={eyebrow}
              onChange={(e) => setEyebrow(e.target.value)}
              className="input"
              placeholder="01 — Sala principală"
            />
          </div>

          <div>
            <label className="block font-body text-base font-medium mb-2">
              Titlu <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="input"
              placeholder="Echipamente premium"
            />
          </div>

          <div>
            <label className="block font-body text-base font-medium mb-2">
              Mărime în grilă (bento)
            </label>
            <select
              value={spanClass}
              onChange={(e) => setSpanClass(e.target.value)}
              className="input"
            >
              {SPAN_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="font-body text-base font-medium px-6 py-2.5 rounded-lg bg-foreground text-white hover:bg-foreground/90 disabled:opacity-50 transition-colors"
            >
              {loading ? "Se salvează..." : "Salvează"}
            </button>
            <button
              type="button"
              onClick={cancel}
              className="font-body text-base px-6 py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Anulează
            </button>
          </div>
        </form>
      ) : (
        <>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 font-body text-base font-medium px-4 py-2.5 rounded-lg bg-foreground text-white hover:bg-foreground/90 transition-colors mb-6"
          >
            <Plus size={16} /> Adaugă tile
          </button>

          <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
            {tiles.map((t, i) => (
              <div key={t.id} className="flex items-center gap-4 p-4">
                {t.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={t.image_url}
                    alt=""
                    className="w-14 h-14 rounded-lg object-cover bg-gray-100 flex-shrink-0"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-lg bg-gray-100 flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-body text-base font-medium truncate">
                    {t.title || "(fără titlu)"}
                  </p>
                  <p className="font-body text-sm text-muted truncate">
                    {t.eyebrow}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleMove(i, "up")}
                    disabled={i === 0}
                    className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30 transition-colors"
                  >
                    <ChevronUp size={16} />
                  </button>
                  <button
                    onClick={() => handleMove(i, "down")}
                    disabled={i === tiles.length - 1}
                    className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30 transition-colors"
                  >
                    <ChevronDown size={16} />
                  </button>
                  <button
                    onClick={() => openEdit(t)}
                    className="p-1.5 rounded hover:bg-gray-100 transition-colors"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="p-1.5 rounded hover:bg-red-50 text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
            {tiles.length === 0 && (
              <p className="p-6 text-center font-body text-base text-muted">
                Nu există tile-uri. Adaugă primul.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
