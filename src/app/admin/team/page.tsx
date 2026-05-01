import { createClient } from "@/lib/supabase/server";
import { TeamManager } from "@/components/admin/team-manager";

export default async function AdminTeamPage() {
  const supabase = await createClient();
  const { data: members } = await supabase
    .from("team_members")
    .select("*")
    .order("order");

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="font-heading text-2xl mb-6">Echipă</h1>
      <TeamManager initialMembers={members ?? []} />
    </div>
  );
}
