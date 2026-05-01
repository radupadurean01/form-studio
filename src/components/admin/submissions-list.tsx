"use client";

import { useRouter } from "next/navigation";
import { Check, RotateCcw } from "lucide-react";
import type { ContactSubmission } from "@/lib/supabase/types";
import { markSubmissionHandled } from "@/app/admin/actions";

export function SubmissionsList({
  initialSubmissions,
}: {
  initialSubmissions: ContactSubmission[];
}) {
  const router = useRouter();

  async function toggleHandled(id: string, current: boolean) {
    await markSubmissionHandled(id, !current);
    router.refresh();
  }

  if (initialSubmissions.length === 0) {
    return (
      <p className="font-body text-base text-muted">
        Nu există mesaje încă.
      </p>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
      {initialSubmissions.map((sub) => (
        <div
          key={sub.id}
          className={`p-4 flex items-start gap-4 ${
            sub.handled ? "opacity-60" : ""
          }`}
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <p className="font-body text-base font-medium">{sub.name}</p>
              {!sub.handled && (
                <span className="inline-block w-2 h-2 rounded-full bg-accent flex-shrink-0" />
              )}
            </div>
            <p className="font-body text-sm text-muted">{sub.email}</p>
            <p className="font-body text-base text-muted mt-2 whitespace-pre-wrap">
              {sub.message}
            </p>
            <p className="font-body text-sm text-muted/50 mt-2">
              {new Date(sub.created_at).toLocaleString("ro-RO")}
            </p>
          </div>
          <button
            onClick={() => toggleHandled(sub.id, sub.handled)}
            className={`p-2 rounded-lg transition-colors ${
              sub.handled
                ? "hover:bg-gray-100 text-muted"
                : "hover:bg-sage-light text-sage"
            }`}
            title={sub.handled ? "Marchează ca necitit" : "Marchează ca rezolvat"}
          >
            {sub.handled ? <RotateCcw size={16} /> : <Check size={16} />}
          </button>
        </div>
      ))}
    </div>
  );
}
