"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateSettings } from "@/app/admin/actions";
import { RichTextEditor } from "./rich-text-editor";

export function LegalEditor({
  htmlField,
  approvedField,
  initialHtml,
  initialApproved,
}: {
  htmlField: string;
  approvedField: string;
  initialHtml: string;
  initialApproved: boolean;
}) {
  const router = useRouter();
  const [html, setHtml] = useState(initialHtml);
  const [approved, setApproved] = useState(initialApproved);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);

  async function handleSave() {
    setSaving(true);
    try {
      await updateSettings({
        [htmlField]: html,
        [approvedField]: approved,
      });
      setSavedAt(new Date());
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Eroare");
    }
    setSaving(false);
  }

  return (
    <div className="space-y-6">
      <RichTextEditor value={html} onChange={setHtml} />

      <label className="flex items-start gap-3 cursor-pointer bg-white border border-gray-200 rounded-xl p-4">
        <input
          type="checkbox"
          checked={approved}
          onChange={(e) => setApproved(e.target.checked)}
          className="w-4 h-4 mt-0.5 rounded border-gray-300 text-accent focus:ring-accent"
        />
        <div>
          <span className="font-body text-base font-medium">
            Conținut aprobat
          </span>
          <p className="font-body text-sm text-muted mt-1">
            Bifează când conținutul este final. Bannerul „Conținut provizoriu"
            de pe pagina publică va dispărea.
          </p>
        </div>
      </label>

      <div className="sticky bottom-4 bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between gap-4 shadow-sm">
        <p className="font-body text-sm text-muted">
          {savedAt
            ? `Salvat la ${savedAt.toLocaleTimeString("ro-RO")}`
            : "Modificările nu sunt salvate"}
        </p>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="font-body text-base font-medium px-8 py-3 rounded-lg bg-foreground text-white hover:bg-foreground/90 disabled:opacity-50 transition-colors"
        >
          {saving ? "Se salvează..." : "Salvează"}
        </button>
      </div>
    </div>
  );
}
