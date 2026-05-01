"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateSettings } from "@/app/admin/actions";

export function TestimonialsVisibilityToggle({
  initialValue,
}: {
  initialValue: boolean;
}) {
  const router = useRouter();
  const [value, setValue] = useState(initialValue);
  const [isPending, startTransition] = useTransition();

  function handleChange(next: boolean) {
    setValue(next);
    startTransition(async () => {
      try {
        await updateSettings({ show_testimonials: next });
        router.refresh();
      } catch (err) {
        setValue(!next);
        alert(err instanceof Error ? err.message : "Eroare");
      }
    });
  }

  return (
    <section className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={value}
          disabled={isPending}
          onChange={(e) => handleChange(e.target.checked)}
          className="w-4 h-4 mt-0.5 rounded border-gray-300 text-accent focus:ring-accent"
        />
        <div>
          <span className="font-body text-base font-medium">
            Afișează secțiunea testimoniale pe site
          </span>
          <p className="font-body text-sm text-muted mt-1">
            Secțiunea apare pe site doar când este activată ȘI cel puțin un
            testimonial este publicat.
          </p>
        </div>
      </label>
    </section>
  );
}
