"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";
import type { Membership } from "@/lib/supabase/types";
import { updateMembership } from "@/app/admin/actions";

export function MembershipEditor({ membership }: { membership: Membership }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(membership.name);
  const [priceRon, setPriceRon] = useState(membership.price_ron);
  const [period, setPeriod] = useState(membership.period);
  const [features, setFeatures] = useState(membership.features);
  const [newFeature, setNewFeature] = useState("");
  const [addonName, setAddonName] = useState(membership.addon_name ?? "");
  const [addonFeatures, setAddonFeatures] = useState(membership.addon_features);
  const [newAddonFeature, setNewAddonFeature] = useState("");
  const [addonPriceMode, setAddonPriceMode] = useState<
    "none" | "percent" | "fixed"
  >(
    membership.addon_discount_percent && membership.addon_discount_percent > 0
      ? "percent"
      : membership.addon_price_ron && membership.addon_price_ron > 0
        ? "fixed"
        : "none"
  );
  const [addonDiscount, setAddonDiscount] = useState(
    membership.addon_discount_percent ?? 0
  );
  const [addonPrice, setAddonPrice] = useState(membership.addon_price_ron ?? 0);

  function addFeature() {
    if (!newFeature.trim()) return;
    setFeatures([...features, newFeature.trim()]);
    setNewFeature("");
  }

  function addAddonFeature() {
    if (!newAddonFeature.trim()) return;
    setAddonFeatures([...addonFeatures, newAddonFeature.trim()]);
    setNewAddonFeature("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await updateMembership(membership.id, {
        name,
        price_ron: priceRon,
        period,
        features,
        addon_name: addonName || null,
        addon_features: addonFeatures,
        addon_discount_percent:
          addonPriceMode === "percent" && addonDiscount > 0
            ? addonDiscount
            : null,
        addon_price_ron:
          addonPriceMode === "fixed" && addonPrice > 0 ? addonPrice : null,
      });
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Eroare");
    }
    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl border border-gray-200 p-6 space-y-5 mb-6"
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-body text-base font-medium mb-2">
            Nume plan
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input"
          />
        </div>
        <div>
          <label className="block font-body text-base font-medium mb-2">
            Perioadă
          </label>
          <input
            type="text"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="input"
          />
        </div>
      </div>

      <div>
        <label className="block font-body text-base font-medium mb-2">
          Preț (RON)
        </label>
        <input
          type="number"
          step="0.01"
          value={priceRon}
          onChange={(e) => setPriceRon(Number(e.target.value))}
          required
          className="input"
        />
      </div>

      {/* Features */}
      <div>
        <label className="block font-body text-base font-medium mb-2">
          Beneficii incluse
        </label>
        <ListEditor
          items={features}
          onRemove={(i) => setFeatures(features.filter((_, idx) => idx !== i))}
          newValue={newFeature}
          onNewChange={setNewFeature}
          onAdd={addFeature}
        />
      </div>

      <hr className="border-gray-200" />

      <h3 className="font-heading text-lg">Add-on</h3>

      <div>
        <label className="block font-body text-base font-medium mb-2">
          Nume add-on
        </label>
        <input
          type="text"
          value={addonName}
          onChange={(e) => setAddonName(e.target.value)}
          className="input"
          placeholder="Personal Trainer"
        />
      </div>

      <div>
        <label className="block font-body text-base font-medium mb-2">
          Tip preț add-on
        </label>
        <div className="flex flex-wrap gap-2 mb-3">
          {(
            [
              ["none", "Fără preț afișat"],
              ["percent", "Discount procentual"],
              ["fixed", "Preț fix"],
            ] as const
          ).map(([value, label]) => (
            <label
              key={value}
              className={`cursor-pointer px-3 py-2 rounded-lg text-base border transition-colors ${
                addonPriceMode === value
                  ? "bg-foreground text-white border-foreground"
                  : "bg-white border-gray-200 hover:border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="addonPriceMode"
                value={value}
                checked={addonPriceMode === value}
                onChange={() => setAddonPriceMode(value)}
                className="sr-only"
              />
              {label}
            </label>
          ))}
        </div>

        {addonPriceMode === "percent" && (
          <div>
            <label className="block font-body text-sm text-gray-600 mb-1.5">
              Discount aplicat la prețul principal (%)
            </label>
            <input
              type="number"
              min={0}
              max={100}
              value={addonDiscount}
              onChange={(e) => setAddonDiscount(Number(e.target.value))}
              className="input"
            />
            {priceRon > 0 && addonDiscount > 0 && (
              <p className="font-body text-sm text-gray-500 mt-1.5">
                Preț afișat: {(priceRon * (1 - addonDiscount / 100)).toFixed(2)}{" "}
                RON / {period}
              </p>
            )}
          </div>
        )}

        {addonPriceMode === "fixed" && (
          <div>
            <label className="block font-body text-sm text-gray-600 mb-1.5">
              Preț fix add-on (RON)
            </label>
            <input
              type="number"
              step="0.01"
              min={0}
              value={addonPrice}
              onChange={(e) => setAddonPrice(Number(e.target.value))}
              className="input"
            />
          </div>
        )}
      </div>

      <div>
        <label className="block font-body text-base font-medium mb-2">
          Beneficii add-on
        </label>
        <ListEditor
          items={addonFeatures}
          onRemove={(i) =>
            setAddonFeatures(addonFeatures.filter((_, idx) => idx !== i))
          }
          newValue={newAddonFeature}
          onNewChange={setNewAddonFeature}
          onAdd={addAddonFeature}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="font-body text-base font-medium px-6 py-2.5 rounded-lg bg-foreground text-white hover:bg-foreground/90 disabled:opacity-50 transition-colors"
      >
        {loading ? "Se salvează..." : "Salvează"}
      </button>
    </form>
  );
}

function ListEditor({
  items,
  onRemove,
  newValue,
  onNewChange,
  onAdd,
}: {
  items: string[];
  onRemove: (i: number) => void;
  newValue: string;
  onNewChange: (v: string) => void;
  onAdd: () => void;
}) {
  return (
    <>
      {items.length > 0 && (
        <ul className="space-y-2 mb-3">
          {items.map((item, i) => (
            <li
              key={i}
              className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2"
            >
              <span className="font-body text-base flex-1">{item}</span>
              <button
                type="button"
                onClick={() => onRemove(i)}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
              >
                <X size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="flex gap-2">
        <input
          type="text"
          value={newValue}
          onChange={(e) => onNewChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onAdd();
            }
          }}
          placeholder="Adaugă..."
          className="input flex-1"
        />
        <button
          type="button"
          onClick={onAdd}
          className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>
    </>
  );
}
