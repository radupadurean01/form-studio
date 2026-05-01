import { Check } from "lucide-react";
import { Container } from "./container";
import { Section } from "./section";
import type { Membership, SiteSettings } from "@/lib/supabase/types";

export function MembershipPricing({
  membership,
  settings,
}: {
  membership: Membership;
  settings: SiteSettings;
}) {
  const appIosUrl = settings.app_ios_url;
  const appAndroidUrl = settings.app_android_url;
  const hasStoreLinks = Boolean(appIosUrl) || Boolean(appAndroidUrl);
  const hasPercentDiscount =
    membership.addon_discount_percent != null &&
    membership.addon_discount_percent > 0;
  const hasFixedAddonPrice =
    !hasPercentDiscount &&
    membership.addon_price_ron != null &&
    membership.addon_price_ron > 0;

  const discountedPrice = hasPercentDiscount
    ? (
        membership.price_ron *
        (1 - (membership.addon_discount_percent ?? 0) / 100)
      ).toFixed(2)
    : null;

  const showAddon =
    membership.addon_name != null &&
    (membership.addon_features.length > 0 ||
      hasPercentDiscount ||
      hasFixedAddonPrice);

  return (
    <Section id="membri" className="bg-mustard overflow-hidden">
      <Container>
        <div className="text-center mb-16 sm:mb-20">
          {settings.pricing_title_html && (
            <h2
              className="font-display text-[clamp(48px,6vw,88px)] font-normal tracking-tight leading-none text-walnut max-w-[14ch] mx-auto"
              dangerouslySetInnerHTML={{ __html: settings.pricing_title_html }}
            />
          )}
        </div>

        {/* Card */}
        <div className="max-w-[720px] mx-auto bg-cream-warm rounded-xl p-8 sm:p-12 shadow-[0_30px_80px_-20px_rgba(31,26,20,0.2),0_4px_12px_rgba(31,26,20,0.06)]">
          {/* Tier label */}
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-walnut text-cream-warm text-[11px] tracking-[0.24em] uppercase font-medium mb-6">
            {membership.name}
          </span>

          {/* Price */}
          <div className="mb-9">
            <div className="font-display text-[clamp(56px,7vw,96px)] font-normal leading-none tracking-tight">
              {membership.price_ron}
              <em className="italic text-[0.5em] text-ink-muted font-normal ml-1">
                RON / {membership.period}
              </em>
            </div>
            {settings.pricing_tagline && (
              <div className="font-display italic text-[13px] text-ink-muted mt-2">
                {settings.pricing_tagline}
              </div>
            )}
          </div>

          {/* Benefits */}
          <ul className="border-t border-ink/10 mb-8">
            {membership.features.map((f, i) => (
              <li
                key={i}
                className="py-4 border-b border-ink/10 font-body text-[15px] text-ink relative pl-8"
              >
                <Check
                  className="absolute left-0 top-[18px] h-4 w-4 text-terracotta"
                  strokeWidth={2.5}
                />
                {f}
              </li>
            ))}
          </ul>

          {/* Addon — sub-box */}
          {showAddon && (
            <div className="bg-cream rounded-2xl border border-ink/10 p-6 sm:p-7 mb-8">
              <div className="flex items-center justify-between gap-4 mb-5">
                <h3 className="font-display text-[22px] sm:text-[24px] font-medium tracking-tight">
                  {membership.addon_name}
                </h3>
                {hasPercentDiscount && (
                  <span className="shrink-0 inline-flex items-center px-3 py-1 rounded-full bg-walnut text-cream-warm text-[11px] tracking-[0.16em] uppercase font-medium">
                    −{membership.addon_discount_percent}%
                  </span>
                )}
              </div>

              {membership.addon_features.length > 0 && (
                <ul className="mb-6">
                  {membership.addon_features.map((f, i) => (
                    <li
                      key={i}
                      className="py-2.5 font-body text-[14px] text-ink-muted relative pl-7"
                    >
                      <Check
                        className="absolute left-0 top-[12px] h-3.5 w-3.5 text-terracotta"
                        strokeWidth={2.5}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              )}

              {(hasPercentDiscount || hasFixedAddonPrice) && (
                <>
                  <div className="flex items-baseline flex-wrap gap-x-3 gap-y-1">
                    {hasPercentDiscount && (
                      <span className="font-display text-[18px] text-ink-muted line-through">
                        {membership.price_ron} RON
                      </span>
                    )}
                    <span className="font-display text-[28px] sm:text-[32px] font-medium tracking-tight">
                      {hasPercentDiscount
                        ? discountedPrice
                        : membership.addon_price_ron}{" "}
                      RON
                      <em className="italic text-[0.55em] text-ink-muted font-normal ml-1">
                        / {membership.period}
                      </em>
                      <sup className="text-[0.5em] text-terracotta ml-0.5">
                        *
                      </sup>
                    </span>
                  </div>
                  {settings.pricing_addon_footnote && (
                    <p className="font-display italic text-[12px] text-ink-muted mt-3">
                      {settings.pricing_addon_footnote}
                    </p>
                  )}
                </>
              )}
            </div>
          )}

          {/* CTA — abonamentul se cumpără din aplicație */}
          {hasStoreLinks && (
            <div className="pt-2 border-t border-ink/10">
              {settings.pricing_cta_label && (
                <p className="text-center font-body text-[12px] tracking-[0.16em] uppercase font-medium text-ink-muted mt-6 mb-5">
                  {settings.pricing_cta_label}
                </p>
              )}
              <div className="flex flex-wrap items-center justify-center gap-3">
                {appIosUrl && (
                  <a
                    href={appIosUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Descarcă din App Store"
                    className="transition-transform duration-300 hover:scale-[1.04]"
                  >
                    <img
                      src="/images/ios%20app.svg"
                      alt="Descarcă din App Store"
                      className="h-[50px] w-auto"
                    />
                  </a>
                )}
                {appAndroidUrl && (
                  <a
                    href={appAndroidUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Descarcă din Google Play"
                    className="transition-transform duration-300 hover:scale-[1.04]"
                  >
                    <img
                      src="/images/google%20store.svg"
                      alt="Descarcă din Google Play"
                      className="h-[50px] w-auto"
                    />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
