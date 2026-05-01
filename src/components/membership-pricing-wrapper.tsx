import { getMemberships, getSettings } from "@/lib/queries";
import { MembershipPricing } from "./membership-pricing";

export async function MembershipPricingWrapper() {
  const [memberships, settings] = await Promise.all([
    getMemberships(),
    getSettings(),
  ]);
  if (memberships.length === 0 || !settings) return null;

  return (
    <MembershipPricing membership={memberships[0]} settings={settings} />
  );
}
