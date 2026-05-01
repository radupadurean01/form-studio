"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { SiteSettings } from "@/lib/supabase/types";
import { updateSettings } from "@/app/admin/actions";
import { ImageUploader } from "./image-uploader";

type FormState = Omit<SiteSettings, "id" | "created_at" | "updated_at">;

export function SettingsForm({ settings }: { settings: SiteSettings }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormState>({
    hero_eyebrow: settings.hero_eyebrow,
    hero_title_html: settings.hero_title_html,
    hero_subtitle: settings.hero_subtitle,
    hero_cta_label: settings.hero_cta_label,
    hero_cta_href: settings.hero_cta_href,
    hero_slider_image_1: settings.hero_slider_image_1,
    hero_slider_image_2: settings.hero_slider_image_2,
    hero_slider_image_3: settings.hero_slider_image_3,
    logo_white_url: settings.logo_white_url,
    logo_dark_url: settings.logo_dark_url,
    about_title: settings.about_title,
    about_body_html: settings.about_body_html,
    about_image_url: settings.about_image_url,
    about_signature: settings.about_signature,
    tour_eyebrow: settings.tour_eyebrow,
    tour_title_html: settings.tour_title_html,
    trainers_eyebrow: settings.trainers_eyebrow,
    trainers_title_html: settings.trainers_title_html,
    trainers_subtitle: settings.trainers_subtitle,
    trainers_footnote: settings.trainers_footnote,
    programs_eyebrow: settings.programs_eyebrow,
    programs_title_html: settings.programs_title_html,
    membership_preview_eyebrow: settings.membership_preview_eyebrow,
    membership_preview_number: settings.membership_preview_number,
    membership_preview_max_label: settings.membership_preview_max_label,
    membership_preview_title_html: settings.membership_preview_title_html,
    membership_preview_body: settings.membership_preview_body,
    membership_preview_bg_image_url: settings.membership_preview_bg_image_url,
    membership_preview_cta_label: settings.membership_preview_cta_label,
    membership_preview_cta_href: settings.membership_preview_cta_href,
    pricing_title_html: settings.pricing_title_html,
    pricing_tagline: settings.pricing_tagline,
    pricing_cta_label: settings.pricing_cta_label,
    pricing_addon_footnote: settings.pricing_addon_footnote,
    contact_eyebrow: settings.contact_eyebrow,
    contact_title_html: settings.contact_title_html,
    contact_body: settings.contact_body,
    contact_email: settings.contact_email,
    contact_phone: settings.contact_phone,
    address: settings.address,
    closing_eyebrow: settings.closing_eyebrow,
    closing_title_html: settings.closing_title_html,
    closing_button_label: settings.closing_button_label,
    closing_button_href: settings.closing_button_href,
    footer_tagline: settings.footer_tagline,
    instagram_url: settings.instagram_url,
    facebook_url: settings.facebook_url,
    linkedin_url: settings.linkedin_url,
    app_ios_url: settings.app_ios_url,
    app_android_url: settings.app_android_url,
    show_testimonials: settings.show_testimonials,
  });

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await updateSettings({
        ...form,
        app_ios_url: form.app_ios_url || null,
        app_android_url: form.app_android_url || null,
      });
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Eroare");
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Logo — header + footer */}
      <Card title="Logo">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ImageUploader
            value={form.logo_white_url}
            onChange={(v) => update("logo_white_url", v)}
            folder="logos"
            label="Logo alb (pentru fundaluri închise)"
            helper="Folosit în header (peste hero) și în footer."
          />
          <ImageUploader
            value={form.logo_dark_url}
            onChange={(v) => update("logo_dark_url", v)}
            folder="logos"
            label="Logo închis (pentru fundaluri deschise)"
            helper="Folosit în header după ce scrollezi peste hero."
          />
        </div>
        <p className="font-body text-sm text-muted">
          SVG-urile sunt cele mai bune (vector, fără pixelare). PNG cu fundal transparent funcționează și el.
        </p>
      </Card>

      {/* Hero */}
      <Card title="Hero">
        <Text label="Eyebrow" value={form.hero_eyebrow} onChange={(v) => update("hero_eyebrow", v)} />
        <Html label="Titlu" value={form.hero_title_html} onChange={(v) => update("hero_title_html", v)} rows={3} />
        <Textarea label="Subtitlu" value={form.hero_subtitle} onChange={(v) => update("hero_subtitle", v)} rows={2} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Text label="Etichetă buton CTA" value={form.hero_cta_label} onChange={(v) => update("hero_cta_label", v)} />
          <Text label="Link buton CTA" value={form.hero_cta_href} onChange={(v) => update("hero_cta_href", v)} placeholder="#membri sau https://..." />
        </div>

        <div>
          <p className="block font-body text-base font-medium mb-3">
            Imagini slider (3 sloturi)
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ImageUploader value={form.hero_slider_image_1} onChange={(v) => update("hero_slider_image_1", v)} folder="hero" label="Slide 1" />
            <ImageUploader value={form.hero_slider_image_2} onChange={(v) => update("hero_slider_image_2", v)} folder="hero" label="Slide 2" />
            <ImageUploader value={form.hero_slider_image_3} onChange={(v) => update("hero_slider_image_3", v)} folder="hero" label="Slide 3" />
          </div>
          <p className="font-body text-sm text-muted mt-2">
            Cele trei imagini se rotesc automat la 3 secunde. Dacă lași un slot gol, se afișează doar restul.
          </p>
        </div>
      </Card>

      {/* About */}
      <Card title="Despre">
        <Html label="Titlu secțiune" value={form.about_title} onChange={(v) => update("about_title", v)} />
        <div>
          <label className="block font-body text-base font-medium mb-2">Conținut (HTML)</label>
          <textarea
            value={form.about_body_html}
            onChange={(e) => update("about_body_html", e.target.value)}
            rows={6}
            className="input resize-none font-mono text-sm"
          />
          <p className="font-body text-sm text-muted mt-1.5">
            Folosește <code>&lt;p&gt;</code> pentru paragrafe.
          </p>
        </div>
        <ImageUploader value={form.about_image_url} onChange={(v) => update("about_image_url", v)} folder="about" label="Imagine secțiune" helper="Recomandat: portret vertical 4:5." />
        <Text label="Semnătură (sub textul despre)" value={form.about_signature} onChange={(v) => update("about_signature", v)} placeholder="— echipa form studio" />
      </Card>

      {/* Tour / Studio */}
      <Card title="Studio (bento)">
        <Text label="Eyebrow" value={form.tour_eyebrow} onChange={(v) => update("tour_eyebrow", v)} />
        <Html label="Titlu secțiune" value={form.tour_title_html} onChange={(v) => update("tour_title_html", v)} />
        <p className="font-body text-sm text-muted">
          Tile-urile bento se editează separat în pagina <strong>Studio</strong> din meniu.
        </p>
      </Card>

      {/* Trainers */}
      <Card title="Antrenori">
        <Text label="Eyebrow" value={form.trainers_eyebrow} onChange={(v) => update("trainers_eyebrow", v)} />
        <Html label="Titlu secțiune" value={form.trainers_title_html} onChange={(v) => update("trainers_title_html", v)} />
        <Textarea label="Subtitlu" value={form.trainers_subtitle} onChange={(v) => update("trainers_subtitle", v)} rows={2} />
        <Textarea label="Notă (sub grilă)" value={form.trainers_footnote} onChange={(v) => update("trainers_footnote", v)} rows={2} />
      </Card>

      {/* Programs */}
      <Card title="Programe">
        <Text label="Eyebrow" value={form.programs_eyebrow} onChange={(v) => update("programs_eyebrow", v)} />
        <Html label="Titlu secțiune" value={form.programs_title_html} onChange={(v) => update("programs_title_html", v)} />
        <p className="font-body text-sm text-muted">
          Programele individuale se editează în pagina <strong>Programe</strong> din meniu.
        </p>
      </Card>

      {/* Membership preview */}
      <Card title="Membership preview (banner cu numărul de membri)">
        <Text label="Eyebrow" value={form.membership_preview_eyebrow} onChange={(v) => update("membership_preview_eyebrow", v)} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Text label="Număr mare" value={form.membership_preview_number} onChange={(v) => update("membership_preview_number", v)} placeholder="60" />
          <Text label="Etichetă sub număr" value={form.membership_preview_max_label} onChange={(v) => update("membership_preview_max_label", v)} />
        </div>
        <Html label="Titlu" value={form.membership_preview_title_html} onChange={(v) => update("membership_preview_title_html", v)} />
        <Textarea label="Descriere" value={form.membership_preview_body} onChange={(v) => update("membership_preview_body", v)} rows={3} />
        <ImageUploader value={form.membership_preview_bg_image_url} onChange={(v) => update("membership_preview_bg_image_url", v)} folder="membership-preview" label="Imagine de fundal" helper="Folosește o imagine cu mult contrast — peste ea e un overlay închis." />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Text label="Etichetă buton CTA" value={form.membership_preview_cta_label} onChange={(v) => update("membership_preview_cta_label", v)} />
          <Text label="Link buton CTA" value={form.membership_preview_cta_href} onChange={(v) => update("membership_preview_cta_href", v)} />
        </div>
      </Card>

      {/* Pricing */}
      <Card title="Pricing (tarife)">
        <Html label="Titlu secțiune" value={form.pricing_title_html} onChange={(v) => update("pricing_title_html", v)} />
        <Text label="Tagline (sub preț)" value={form.pricing_tagline} onChange={(v) => update("pricing_tagline", v)} />
        <Text label="Etichetă deasupra butoanelor App Store" value={form.pricing_cta_label} onChange={(v) => update("pricing_cta_label", v)} />
        <Text label="Notă cu asterisc (sub addon)" value={form.pricing_addon_footnote} onChange={(v) => update("pricing_addon_footnote", v)} />
        <p className="font-body text-sm text-muted">
          Prețurile, beneficiile și addon-ul se editează în pagina <strong>Memberships</strong>.
        </p>
      </Card>

      {/* Contact */}
      <Card title="Contact">
        <Text label="Eyebrow" value={form.contact_eyebrow} onChange={(v) => update("contact_eyebrow", v)} />
        <Html label="Titlu secțiune" value={form.contact_title_html} onChange={(v) => update("contact_title_html", v)} />
        <Textarea label="Text scurt deasupra formularului" value={form.contact_body} onChange={(v) => update("contact_body", v)} rows={2} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Text type="email" label="Email" value={form.contact_email} onChange={(v) => update("contact_email", v)} />
          <Text label="Telefon" value={form.contact_phone} onChange={(v) => update("contact_phone", v)} />
        </div>
        <Text label="Adresă" value={form.address} onChange={(v) => update("address", v)} />
      </Card>

      {/* Closing CTA */}
      <Card title="Banner final (closing CTA)">
        <Text label="Eyebrow" value={form.closing_eyebrow} onChange={(v) => update("closing_eyebrow", v)} />
        <Html label="Titlu" value={form.closing_title_html} onChange={(v) => update("closing_title_html", v)} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Text label="Etichetă buton" value={form.closing_button_label} onChange={(v) => update("closing_button_label", v)} />
          <Text label="Link buton" value={form.closing_button_href} onChange={(v) => update("closing_button_href", v)} />
        </div>
      </Card>

      {/* Footer */}
      <Card title="Footer">
        <Text label="Tagline" value={form.footer_tagline} onChange={(v) => update("footer_tagline", v)} placeholder="Alba Iulia · Boutique Fitness" />
        <p className="font-body text-sm text-muted">
          Anul curent este adăugat automat la final.
        </p>
      </Card>

      {/* Social & app links */}
      <Card title="Social & aplicație mobilă">
        <Text type="url" label="Instagram URL" value={form.instagram_url} onChange={(v) => update("instagram_url", v)} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Text type="url" label="Facebook URL" value={form.facebook_url} onChange={(v) => update("facebook_url", v)} />
          <Text type="url" label="LinkedIn URL" value={form.linkedin_url} onChange={(v) => update("linkedin_url", v)} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Text type="url" label="App Store URL" value={form.app_ios_url ?? ""} onChange={(v) => update("app_ios_url", v)} placeholder="Opțional" />
          <Text type="url" label="Google Play URL" value={form.app_android_url ?? ""} onChange={(v) => update("app_android_url", v)} placeholder="Opțional" />
        </div>
      </Card>

      <div className="sticky bottom-4 bg-white rounded-xl border border-gray-200 p-4 flex justify-end shadow-sm">
        <button
          type="submit"
          disabled={loading}
          className="font-body text-base font-medium px-8 py-3 rounded-lg bg-foreground text-white hover:bg-foreground/90 disabled:opacity-50 transition-colors"
        >
          {loading ? "Se salvează..." : "Salvează setările"}
        </button>
      </div>
    </form>
  );
}

// ----------------------------- helpers -----------------------------

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
      <h2 className="font-heading text-2xl font-medium tracking-tight pb-3 border-b border-gray-100 mb-2">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Text({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block font-body text-base font-medium mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input"
        placeholder={placeholder}
      />
    </div>
  );
}

function Textarea({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <div>
      <label className="block font-body text-base font-medium mb-2">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="input resize-none"
      />
    </div>
  );
}

function Html({
  label,
  value,
  onChange,
  rows = 2,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <div>
      <label className="block font-body text-base font-medium mb-2">
        {label}{" "}
        <span className="font-normal text-muted text-sm">
          (HTML — folosește <code>&lt;em&gt;...&lt;/em&gt;</code> pentru italic)
        </span>
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="input resize-none font-mono text-sm"
      />
    </div>
  );
}
