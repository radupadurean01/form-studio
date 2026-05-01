"use server";

import { revalidateTag } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

type TeamInsert = Database["public"]["Tables"]["team_members"]["Insert"];
type TeamUpdate = Database["public"]["Tables"]["team_members"]["Update"];
type MembershipUpdate = Database["public"]["Tables"]["memberships"]["Update"];
type TestimonialInsert = Database["public"]["Tables"]["testimonials"]["Insert"];
type TestimonialUpdate = Database["public"]["Tables"]["testimonials"]["Update"];
type TourTileInsert = Database["public"]["Tables"]["tour_tiles"]["Insert"];
type TourTileUpdate = Database["public"]["Tables"]["tour_tiles"]["Update"];
type ProgramInsert = Database["public"]["Tables"]["programs"]["Insert"];
type ProgramUpdate = Database["public"]["Tables"]["programs"]["Update"];
type SettingsUpdate = Database["public"]["Tables"]["site_settings"]["Update"];

// ============================================================
// Team
// ============================================================

export async function createTeamMember(data: TeamInsert) {
  const supabase = await createClient();
  const { error } = await supabase.from("team_members").insert(data);
  if (error) throw new Error(error.message);
  revalidateTag("team_members", { expire: 0 });
}

export async function updateTeamMember(id: string, data: TeamUpdate) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("team_members")
    .update(data)
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidateTag("team_members", { expire: 0 });
}

export async function deleteTeamMember(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("team_members").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateTag("team_members", { expire: 0 });
}

export async function reorderTeamMembers(
  items: { id: string; order: number }[]
) {
  const supabase = await createClient();
  for (const item of items) {
    await supabase
      .from("team_members")
      .update({ order: item.order })
      .eq("id", item.id);
  }
  revalidateTag("team_members", { expire: 0 });
}

// ============================================================
// Memberships
// ============================================================

export async function updateMembership(id: string, data: MembershipUpdate) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("memberships")
    .update(data)
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidateTag("memberships", { expire: 0 });
}

// ============================================================
// Testimonials
// ============================================================

export async function createTestimonial(data: TestimonialInsert) {
  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").insert(data);
  if (error) throw new Error(error.message);
  revalidateTag("testimonials", { expire: 0 });
}

export async function updateTestimonial(id: string, data: TestimonialUpdate) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("testimonials")
    .update(data)
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidateTag("testimonials", { expire: 0 });
}

export async function deleteTestimonial(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("testimonials")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidateTag("testimonials", { expire: 0 });
}

export async function reorderTestimonials(
  items: { id: string; order: number }[]
) {
  const supabase = await createClient();
  for (const item of items) {
    await supabase
      .from("testimonials")
      .update({ order: item.order })
      .eq("id", item.id);
  }
  revalidateTag("testimonials", { expire: 0 });
}

// ============================================================
// Tour tiles
// ============================================================

export async function createTourTile(data: TourTileInsert) {
  const supabase = await createClient();
  const { error } = await supabase.from("tour_tiles").insert(data);
  if (error) throw new Error(error.message);
  revalidateTag("tour_tiles", { expire: 0 });
}

export async function updateTourTile(id: string, data: TourTileUpdate) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("tour_tiles")
    .update(data)
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidateTag("tour_tiles", { expire: 0 });
}

export async function deleteTourTile(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("tour_tiles").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateTag("tour_tiles", { expire: 0 });
}

export async function reorderTourTiles(
  items: { id: string; order: number }[]
) {
  const supabase = await createClient();
  for (const item of items) {
    await supabase
      .from("tour_tiles")
      .update({ order: item.order })
      .eq("id", item.id);
  }
  revalidateTag("tour_tiles", { expire: 0 });
}

// ============================================================
// Programs
// ============================================================

export async function createProgram(data: ProgramInsert) {
  const supabase = await createClient();
  const { error } = await supabase.from("programs").insert(data);
  if (error) throw new Error(error.message);
  revalidateTag("programs", { expire: 0 });
}

export async function updateProgram(id: string, data: ProgramUpdate) {
  const supabase = await createClient();
  const { error } = await supabase.from("programs").update(data).eq("id", id);
  if (error) throw new Error(error.message);
  revalidateTag("programs", { expire: 0 });
}

export async function deleteProgram(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("programs").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateTag("programs", { expire: 0 });
}

export async function reorderPrograms(items: { id: string; order: number }[]) {
  const supabase = await createClient();
  for (const item of items) {
    await supabase.from("programs").update({ order: item.order }).eq("id", item.id);
  }
  revalidateTag("programs", { expire: 0 });
}

// ============================================================
// Settings
// ============================================================

export async function updateSettings(data: SettingsUpdate) {
  const supabase = await createClient();
  // Update the single row
  const { error } = await supabase
    .from("site_settings")
    .update(data)
    .not("id", "is", null);
  if (error) throw new Error(error.message);
  revalidateTag("site_settings", { expire: 0 });
}

// ============================================================
// Submissions
// ============================================================

export async function markSubmissionHandled(id: string, handled: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("contact_submissions")
    .update({ handled })
    .eq("id", id);
  if (error) throw new Error(error.message);
}
