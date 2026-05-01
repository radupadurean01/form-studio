import { createClient } from "@/lib/supabase/server";
import { SettingsForm } from "@/components/admin/settings-form";

export default async function AdminSettingsPage() {
  const supabase = await createClient();
  const { data: settings } = await supabase
    .from("site_settings")
    .select("*")
    .single();

  if (!settings) {
    return (
      <p className="font-body text-base text-muted">
        Nu s-au găsit setările. Verifică baza de date.
      </p>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="font-heading text-2xl mb-6">Setări</h1>
      <SettingsForm settings={settings} />
    </div>
  );
}
