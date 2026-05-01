"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import type { Program } from "@/lib/supabase/types";
import {
  createProgram,
  updateProgram,
  deleteProgram,
  reorderPrograms,
} from "@/app/admin/actions";
import { ImageUploader } from "./image-uploader";

export function ProgramsManager({
  initialPrograms,
}: {
  initialPrograms: Program[];
}) {
  const router = useRouter();
  const [items, setItems] = useState(initialPrograms);
  const [editing, setEditing] = useState<Program | null>(null);
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(false);

  const [num, setNum] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  function openCreate() {
    setNum(String(items.length + 1).padStart(2, "0"));
    setTitle("");
    setBody("");
    setPhotoUrl("");
    setCreating(true);
    setEditing(null);
  }

  function openEdit(p: Program) {
    setNum(p.num);
    setTitle(p.title);
    setBody(p.body);
    setPhotoUrl(p.photo_url ?? "");
    setEditing(p);
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
      num,
      title,
      body,
      photo_url: photoUrl || null,
    };
    try {
      if (editing) {
        await updateProgram(editing.id, data);
      } else {
        await createProgram({ ...data, order: items.length + 1 });
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
    await deleteProgram(id);
    router.refresh();
  }

  async function handleMove(index: number, direction: "up" | "down") {
    const next = [...items];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= next.length) return;
    [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
    setItems(next);
    await reorderPrograms(next.map((p, i) => ({ id: p.id, order: i + 1 })));
    router.refresh();
  }

  const showForm = creating || editing;

  return (
    <div>
      {showForm ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          <h2 className="font-heading text-xl mb-4">
            {editing ? "Editează program" : "Program nou"}
          </h2>

          <div>
            <label className="block font-body text-base font-medium mb-2">
              Număr afișat
            </label>
            <input
              type="text"
              value={num}
              onChange={(e) => setNum(e.target.value)}
              className="input"
              placeholder="01"
            />
            <p className="font-body text-sm text-muted mt-1.5">
              Eticheta de deasupra titlului (ex. 01, 02). Pentru ordinea reală
              folosește săgețile din listă.
            </p>
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
              placeholder="Antrenament personal"
            />
          </div>

          <div>
            <label className="block font-body text-base font-medium mb-2">
              Descriere <span className="text-red-500">*</span>
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              rows={4}
              className="input resize-none"
              placeholder="Sesiuni 1-la-1 cu un antrenor dedicat..."
            />
          </div>

          <ImageUploader
            value={photoUrl}
            onChange={setPhotoUrl}
            folder="programs"
            label="Imagine"
            helper="JPG, PNG, WebP — max 5 MB. Apare în panoul lateral la hover."
          />

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
            <Plus size={16} /> Adaugă program
          </button>

          <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
            {items.map((p, i) => (
              <div key={p.id} className="flex items-center gap-4 p-4">
                {p.photo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.photo_url}
                    alt=""
                    className="w-14 h-14 rounded-lg object-cover bg-gray-100 flex-shrink-0"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-lg bg-gray-100 flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-body text-sm text-muted">
                      {p.num}
                    </span>
                    <p className="font-body text-base font-medium truncate">
                      {p.title}
                    </p>
                  </div>
                  <p className="font-body text-sm text-muted line-clamp-1">
                    {p.body}
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
                    disabled={i === items.length - 1}
                    className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30 transition-colors"
                  >
                    <ChevronDown size={16} />
                  </button>
                  <button
                    onClick={() => openEdit(p)}
                    className="p-1.5 rounded hover:bg-gray-100 transition-colors"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="p-1.5 rounded hover:bg-red-50 text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
            {items.length === 0 && (
              <p className="p-6 text-center font-body text-base text-muted">
                Nu există programe. Adaugă primul.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
