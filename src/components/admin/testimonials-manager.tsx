"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Pencil,
  Trash2,
  ChevronUp,
  ChevronDown,
  Eye,
  EyeOff,
} from "lucide-react";
import type { Testimonial } from "@/lib/supabase/types";
import {
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  reorderTestimonials,
} from "@/app/admin/actions";
import { ImageUploader } from "./image-uploader";

export function TestimonialsManager({
  initialTestimonials,
}: {
  initialTestimonials: Testimonial[];
}) {
  const router = useRouter();
  const [items, setItems] = useState(initialTestimonials);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form state
  const [authorName, setAuthorName] = useState("");
  const [authorRole, setAuthorRole] = useState("");
  const [quote, setQuote] = useState("");
  const [rating, setRating] = useState<number | "">("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [published, setPublished] = useState(false);

  function openCreate() {
    setAuthorName("");
    setAuthorRole("");
    setQuote("");
    setRating("");
    setPhotoUrl("");
    setPublished(false);
    setCreating(true);
    setEditing(null);
  }

  function openEdit(t: Testimonial) {
    setAuthorName(t.author_name);
    setAuthorRole(t.author_role);
    setQuote(t.quote);
    setRating(t.rating ?? "");
    setPhotoUrl(t.photo_url ?? "");
    setPublished(t.published);
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
      author_name: authorName,
      author_role: authorRole,
      quote,
      rating: rating === "" ? null : Number(rating),
      photo_url: photoUrl || null,
      published,
    };
    try {
      if (editing) {
        await updateTestimonial(editing.id, data);
      } else {
        await createTestimonial({
          ...data,
          order: items.length + 1,
        });
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
    await deleteTestimonial(id);
    router.refresh();
  }

  async function handleToggle(t: Testimonial) {
    await updateTestimonial(t.id, { published: !t.published });
    router.refresh();
  }

  async function handleMove(index: number, direction: "up" | "down") {
    const next = [...items];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= next.length) return;
    [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
    setItems(next);
    await reorderTestimonials(
      next.map((t, i) => ({ id: t.id, order: i + 1 }))
    );
    router.refresh();
  }

  const showForm = creating || editing;

  return (
    <div>
      {showForm ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          <h2 className="font-heading text-xl mb-4">
            {editing ? "Editează testimonial" : "Testimonial nou"}
          </h2>

          <div>
            <label className="block font-body text-base font-medium mb-2">
              Nume autor <span className="text-red-500">*</span>
            </label>
            <input type="text" value={authorName} onChange={(e) => setAuthorName(e.target.value)} required className="input" />
          </div>

          <div>
            <label className="block font-body text-base font-medium mb-2">Rol / Etichetă</label>
            <input type="text" value={authorRole} onChange={(e) => setAuthorRole(e.target.value)} className="input" placeholder="Membru din 2024" />
          </div>

          <div>
            <label className="block font-body text-base font-medium mb-2">
              Citat <span className="text-red-500">*</span>
            </label>
            <textarea value={quote} onChange={(e) => setQuote(e.target.value)} required rows={4} className="input resize-none" />
          </div>

          <div>
            <label className="block font-body text-base font-medium mb-2">Rating (1-5)</label>
            <input type="number" min={1} max={5} value={rating} onChange={(e) => setRating(e.target.value === "" ? "" : Number(e.target.value))} className="input max-w-[140px]" />
          </div>

          <ImageUploader
            value={photoUrl}
            onChange={setPhotoUrl}
            folder="testimonials"
            label="Foto autor (opțional)"
            helper="Pătrat, 200×200 sau mai mare."
          />

          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent" />
            <span className="font-body text-base">Publicat pe site</span>
          </label>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={loading} className="font-body text-base font-medium px-6 py-2.5 rounded-lg bg-foreground text-white hover:bg-foreground/90 disabled:opacity-50 transition-colors">
              {loading ? "Se salvează..." : "Salvează"}
            </button>
            <button type="button" onClick={cancel} className="font-body text-base px-6 py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              Anulează
            </button>
          </div>
        </form>
      ) : (
        <>
          <button onClick={openCreate} className="flex items-center gap-2 font-body text-base font-medium px-4 py-2.5 rounded-lg bg-foreground text-white hover:bg-foreground/90 transition-colors mb-6">
            <Plus size={16} /> Adaugă testimonial
          </button>

          <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
            {items.map((t, i) => (
              <div key={t.id} className="flex items-center gap-4 p-4">
                <div className="flex-1 min-w-0">
                  <p className="font-body text-base font-medium truncate">{t.author_name}</p>
                  <p className="font-body text-sm text-muted truncate">&ldquo;{t.quote.substring(0, 80)}...&rdquo;</p>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => handleMove(i, "up")} disabled={i === 0} className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30 transition-colors"><ChevronUp size={16} /></button>
                  <button onClick={() => handleMove(i, "down")} disabled={i === items.length - 1} className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30 transition-colors"><ChevronDown size={16} /></button>
                  <button onClick={() => handleToggle(t)} className="p-1.5 rounded hover:bg-gray-100 transition-colors">
                    {t.published ? <Eye size={16} className="text-sage" /> : <EyeOff size={16} className="text-muted" />}
                  </button>
                  <button onClick={() => openEdit(t)} className="p-1.5 rounded hover:bg-gray-100 transition-colors"><Pencil size={16} /></button>
                  <button onClick={() => handleDelete(t.id)} className="p-1.5 rounded hover:bg-red-50 text-red-500 transition-colors"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
            {items.length === 0 && (
              <p className="p-6 text-center font-body text-base text-muted">
                Nu există testimoniale. Adaugă primul.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
