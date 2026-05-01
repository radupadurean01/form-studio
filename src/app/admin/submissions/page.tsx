import { createClient } from "@/lib/supabase/server";
import { SubmissionsList } from "@/components/admin/submissions-list";

export default async function AdminSubmissionsPage() {
  const supabase = await createClient();
  const { data: submissions } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="font-heading text-2xl mb-6">Mesaje</h1>
      <SubmissionsList initialSubmissions={submissions ?? []} />
    </div>
  );
}
