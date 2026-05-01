import { createClient } from "@/lib/supabase/server";
import { TestimonialsManager } from "@/components/admin/testimonials-manager";
import { TestimonialsVisibilityToggle } from "@/components/admin/testimonials-visibility-toggle";

export default async function AdminTestimonialsPage() {
  const supabase = await createClient();
  const [testimonialsResult, settingsResult] = await Promise.all([
    supabase.from("testimonials").select("*").order("order"),
    supabase.from("site_settings").select("show_testimonials").single(),
  ]);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="font-heading text-2xl mb-6">Testimoniale</h1>
      <TestimonialsVisibilityToggle
        initialValue={settingsResult.data?.show_testimonials ?? false}
      />
      <TestimonialsManager
        initialTestimonials={testimonialsResult.data ?? []}
      />
    </div>
  );
}
