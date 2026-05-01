import { createClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";
import type { Database } from "@/lib/supabase/types";

// Public-read client (no cookies needed for anon reads)
function createPublicClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export const getSettings = unstable_cache(
  async () => {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("site_settings")
      .select("*")
      .single();
    return data;
  },
  ["site_settings"],
  { tags: ["site_settings"] }
);

export const getTeamMembers = unstable_cache(
  async () => {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("team_members")
      .select("*")
      .eq("published", true)
      .order("order");
    return data ?? [];
  },
  ["team_members"],
  { tags: ["team_members"] }
);

export const getTestimonials = unstable_cache(
  async () => {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("testimonials")
      .select("*")
      .eq("published", true)
      .order("order");
    return data ?? [];
  },
  ["testimonials"],
  { tags: ["testimonials"] }
);

export const getTourTiles = unstable_cache(
  async () => {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("tour_tiles")
      .select("*")
      .order("order");
    return data ?? [];
  },
  ["tour_tiles"],
  { tags: ["tour_tiles"] }
);

export const getPrograms = unstable_cache(
  async () => {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("programs")
      .select("*")
      .order("order");
    return data ?? [];
  },
  ["programs"],
  { tags: ["programs"] }
);

export const getMemberships = unstable_cache(
  async () => {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("memberships")
      .select("*")
      .order("order");
    return data ?? [];
  },
  ["memberships"],
  { tags: ["memberships"] }
);
