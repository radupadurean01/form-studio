"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import type { TeamMember } from "@/lib/supabase/types";
import { ImageUploader } from "./image-uploader";

type TeamFormData = Omit<TeamMember, "id" | "created_at" | "updated_at">;

export function TeamForm({
  initial,
  onSubmit,
  onCancel,
  loading,
}: {
  initial?: TeamMember;
  onSubmit: (data: TeamFormData) => void;
  onCancel: () => void;
  loading: boolean;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [yearsExperience, setYearsExperience] = useState(
    initial?.years_experience ?? 0
  );
  const [shortBio, setShortBio] = useState(initial?.short_bio ?? "");
  const [longBio, setLongBio] = useState(initial?.long_bio ?? "");
  const [photoUrl, setPhotoUrl] = useState(initial?.photo_url ?? "");
  const [experienceItems, setExperienceItems] = useState<string[]>(
    initial?.experience_items ?? []
  );
  const [published, setPublished] = useState(initial?.published ?? true);
  const [newItem, setNewItem] = useState("");

  function addItem() {
    if (!newItem.trim()) return;
    setExperienceItems([...experienceItems, newItem.trim()]);
    setNewItem("");
  }

  function removeItem(index: number) {
    setExperienceItems(experienceItems.filter((_, i) => i !== index));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      name,
      years_experience: yearsExperience,
      short_bio: shortBio,
      long_bio: longBio,
      photo_url: photoUrl || null,
      experience_items: experienceItems,
      published,
      order: initial?.order ?? 0,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="font-heading text-xl mb-4">
        {initial ? "Editează antrenor" : "Antrenor nou"}
      </h2>

      <Field label="Nume" required>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="input"
        />
      </Field>

      <Field label="Ani experiență">
        <input
          type="number"
          min={0}
          value={yearsExperience}
          onChange={(e) => setYearsExperience(Number(e.target.value))}
          className="input"
        />
      </Field>

      <ImageUploader
        value={photoUrl}
        onChange={setPhotoUrl}
        folder="team"
        label="Foto"
        helper="JPG, PNG, WebP — max 5 MB. Recomandat: portret vertical."
      />

      <Field label="Bio scurt">
        <input
          type="text"
          value={shortBio}
          onChange={(e) => setShortBio(e.target.value)}
          className="input"
        />
      </Field>

      <Field label="Bio detaliat">
        <textarea
          value={longBio}
          onChange={(e) => setLongBio(e.target.value)}
          rows={4}
          className="input resize-none"
        />
      </Field>

      {/* Experience items */}
      <div>
        <label className="block font-body text-base font-medium mb-2">
          Experiență (puncte)
        </label>
        {experienceItems.length > 0 && (
          <ul className="space-y-2 mb-3">
            {experienceItems.map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2"
              >
                <span className="font-body text-base flex-1">{item}</span>
                <button
                  type="button"
                  onClick={() => removeItem(i)}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                >
                  <X size={14} />
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="flex gap-2">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addItem();
              }
            }}
            placeholder="Adaugă un punct..."
            className="input flex-1"
          />
          <button
            type="button"
            onClick={addItem}
            className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Published toggle */}
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
          className="w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent"
        />
        <span className="font-body text-base">Publicat pe site</span>
      </label>

      {/* Actions */}
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
          onClick={onCancel}
          className="font-body text-base px-6 py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          Anulează
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block font-body text-base font-medium mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}
