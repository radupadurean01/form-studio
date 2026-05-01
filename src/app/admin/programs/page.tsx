import { createClient } from "@/lib/supabase/server";
import { ProgramsManager } from "@/components/admin/programs-manager";

export default async function AdminProgramsPage() {
  const supabase = await createClient();
  const { data: programs } = await supabase
    .from("programs")
    .select("*")
    .order("order");

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="font-heading text-2xl mb-6">Programe</h1>
      <ProgramsManager initialPrograms={programs ?? []} />
    </div>
  );
}
