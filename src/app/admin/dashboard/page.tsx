import { createClient } from "@/lib/supabase/server";
import {
  Users,
  CreditCard,
  MessageSquare,
  LayoutGrid,
  Dumbbell,
} from "lucide-react";

async function getCounts() {
  const supabase = await createClient();

  const [team, memberships, tour, programs, submissions] = await Promise.all([
    supabase.from("team_members").select("id", { count: "exact", head: true }),
    supabase.from("memberships").select("id", { count: "exact", head: true }),
    supabase.from("tour_tiles").select("id", { count: "exact", head: true }),
    supabase.from("programs").select("id", { count: "exact", head: true }),
    supabase
      .from("contact_submissions")
      .select("id", { count: "exact", head: true })
      .eq("handled", false),
  ]);

  return {
    team: team.count ?? 0,
    memberships: memberships.count ?? 0,
    tour: tour.count ?? 0,
    programs: programs.count ?? 0,
    unreadSubmissions: submissions.count ?? 0,
  };
}

async function getRecentSubmissions() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);
  return data ?? [];
}

const statCards = [
  { key: "team" as const, label: "Antrenori", icon: Users },
  { key: "tour" as const, label: "Studio (bento)", icon: LayoutGrid },
  { key: "programs" as const, label: "Programe", icon: Dumbbell },
  { key: "memberships" as const, label: "Memberships", icon: CreditCard },
  {
    key: "unreadSubmissions" as const,
    label: "Mesaje necitite",
    icon: MessageSquare,
  },
];

export default async function AdminDashboard() {
  const [counts, recent] = await Promise.all([
    getCounts(),
    getRecentSubmissions(),
  ]);

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="font-heading text-2xl mb-6">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.key}
              className="bg-white rounded-xl p-5 border border-gray-200"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-sage-light flex items-center justify-center">
                  <Icon size={18} className="text-sage" />
                </div>
              </div>
              <p className="font-heading text-2xl">{counts[card.key]}</p>
              <p className="font-body text-sm text-muted mt-1">{card.label}</p>
            </div>
          );
        })}
      </div>

      {/* Recent submissions */}
      <h2 className="font-heading text-lg mb-4">Mesaje recente</h2>
      {recent.length === 0 ? (
        <p className="font-body text-base text-muted">
          Nu există mesaje încă.
        </p>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
          {recent.map((sub) => (
            <div key={sub.id} className="p-4 flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-body text-base font-medium truncate">
                    {sub.name}
                  </p>
                  {!sub.handled && (
                    <span className="inline-block w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                  )}
                </div>
                <p className="font-body text-sm text-muted truncate">
                  {sub.email}
                </p>
                <p className="font-body text-base text-muted mt-1 line-clamp-2">
                  {sub.message}
                </p>
              </div>
              <p className="font-body text-sm text-muted whitespace-nowrap">
                {new Date(sub.created_at).toLocaleDateString("ro-RO")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
