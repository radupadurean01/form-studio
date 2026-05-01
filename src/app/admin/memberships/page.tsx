import { createClient } from "@/lib/supabase/server";
import { MembershipEditor } from "@/components/admin/membership-editor";

export default async function AdminMembershipsPage() {
  const supabase = await createClient();
  const { data: memberships } = await supabase
    .from("memberships")
    .select("*")
    .order("order");

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="font-heading text-2xl mb-6">Memberships</h1>
      {(memberships ?? []).map((m) => (
        <MembershipEditor key={m.id} membership={m} />
      ))}
      {(memberships ?? []).length === 0 && (
        <p className="font-body text-base text-muted">
          Nu există memberships.
        </p>
      )}
    </div>
  );
}
