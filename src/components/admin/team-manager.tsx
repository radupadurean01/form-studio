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
import type { TeamMember } from "@/lib/supabase/types";
import {
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  reorderTeamMembers,
} from "@/app/admin/actions";
import { TeamForm } from "./team-form";

export function TeamManager({
  initialMembers,
}: {
  initialMembers: TeamMember[];
}) {
  const router = useRouter();
  const [members, setMembers] = useState(initialMembers);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleCreate(data: Omit<TeamMember, "id" | "created_at" | "updated_at">) {
    setLoading(true);
    try {
      await createTeamMember(data);
      setCreating(false);
      router.refresh();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Eroare");
    }
    setLoading(false);
  }

  async function handleUpdate(data: Omit<TeamMember, "id" | "created_at" | "updated_at">) {
    if (!editing) return;
    setLoading(true);
    try {
      await updateTeamMember(editing.id, data);
      setEditing(null);
      router.refresh();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Eroare");
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Ești sigur că vrei să ștergi acest antrenor?")) return;
    await deleteTeamMember(id);
    router.refresh();
  }

  async function handleTogglePublished(member: TeamMember) {
    await updateTeamMember(member.id, { published: !member.published });
    router.refresh();
  }

  async function handleMove(index: number, direction: "up" | "down") {
    const newMembers = [...members];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= newMembers.length) return;
    [newMembers[index], newMembers[swapIndex]] = [
      newMembers[swapIndex],
      newMembers[index],
    ];
    const reordered = newMembers.map((m, i) => ({ id: m.id, order: i + 1 }));
    setMembers(newMembers);
    await reorderTeamMembers(reordered);
    router.refresh();
  }

  if (creating) {
    return (
      <TeamForm
        onSubmit={handleCreate}
        onCancel={() => setCreating(false)}
        loading={loading}
      />
    );
  }

  if (editing) {
    return (
      <TeamForm
        initial={editing}
        onSubmit={handleUpdate}
        onCancel={() => setEditing(null)}
        loading={loading}
      />
    );
  }

  return (
    <div>
      <button
        onClick={() => setCreating(true)}
        className="flex items-center gap-2 font-body text-base font-medium px-4 py-2.5 rounded-lg bg-foreground text-white hover:bg-foreground/90 transition-colors mb-6"
      >
        <Plus size={16} /> Adaugă antrenor
      </button>

      <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
        {members.map((member, i) => (
          <div key={member.id} className="flex items-center gap-4 p-4">
            {/* Photo */}
            <div className="w-10 h-10 rounded-lg bg-sage-light flex items-center justify-center flex-shrink-0 overflow-hidden">
              {member.photo_url ? (
                <img
                  src={member.photo_url}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="font-heading text-base text-sage/60">
                  {member.name.charAt(0)}
                </span>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="font-body text-base font-medium truncate">
                {member.name}
              </p>
              <p className="font-body text-sm text-muted">
                {member.years_experience} ani experiență
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleMove(i, "up")}
                disabled={i === 0}
                className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30 transition-colors"
                title="Mută sus"
              >
                <ChevronUp size={16} />
              </button>
              <button
                onClick={() => handleMove(i, "down")}
                disabled={i === members.length - 1}
                className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30 transition-colors"
                title="Mută jos"
              >
                <ChevronDown size={16} />
              </button>
              <button
                onClick={() => handleTogglePublished(member)}
                className="p-1.5 rounded hover:bg-gray-100 transition-colors"
                title={member.published ? "Ascunde" : "Publică"}
              >
                {member.published ? (
                  <Eye size={16} className="text-sage" />
                ) : (
                  <EyeOff size={16} className="text-muted" />
                )}
              </button>
              <button
                onClick={() => setEditing(member)}
                className="p-1.5 rounded hover:bg-gray-100 transition-colors"
                title="Editează"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={() => handleDelete(member.id)}
                className="p-1.5 rounded hover:bg-red-50 text-red-500 transition-colors"
                title="Șterge"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        {members.length === 0 && (
          <p className="p-6 text-center font-body text-base text-muted">
            Nu există antrenori. Adaugă primul.
          </p>
        )}
      </div>
    </div>
  );
}
