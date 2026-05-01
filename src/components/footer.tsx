import Image from "next/image";
import { getSettings } from "@/lib/queries";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export async function Footer() {
  const settings = await getSettings();
  const socials = [
    { url: settings?.instagram_url, Icon: InstagramIcon, label: "Instagram" },
    { url: settings?.facebook_url, Icon: FacebookIcon, label: "Facebook" },
    { url: settings?.linkedin_url, Icon: LinkedinIcon, label: "LinkedIn" },
  ].filter((s) => s.url);

  return (
    <footer className="bg-black-warm text-on-dark/60 py-16 px-6 sm:px-10 text-center">
      <Image
        src={settings?.logo_white_url || "/logos/logo-horizontal-white.svg"}
        alt="Form Studio"
        width={580}
        height={200}
        className="h-10 w-auto mx-auto mb-4"
      />
      {socials.length > 0 && (
        <div className="flex items-center justify-center gap-5 mb-5">
          {socials.map(({ url, Icon, label }) => (
            <a
              key={label}
              href={url!}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-on-dark/60 hover:text-on-dark transition-colors"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      )}
      <div className="font-body text-[13px]">
        {settings?.footer_tagline ?? "Form Studio"} ·{" "}
        {new Date().getFullYear()}
      </div>
    </footer>
  );
}
