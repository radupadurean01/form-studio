import { createClient } from "@/lib/supabase/server";
import { TourTilesManager } from "@/components/admin/tour-tiles-manager";

export default async function AdminTourPage() {
  const supabase = await createClient();
  const { data: tiles } = await supabase
    .from("tour_tiles")
    .select("*")
    .order("order");

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="font-heading text-2xl mb-6">Studio (bento)</h1>
      <TourTilesManager initialTiles={tiles ?? []} />
    </div>
  );
}
