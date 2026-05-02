import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/button";
import { getSettings } from "@/lib/queries";

export const metadata = {
  title: "Pagină negăsită — Form Studio",
};

export default async function NotFound() {
  const settings = await getSettings();
  return (
    <>
      <Header
        logoWhiteUrl={settings?.logo_white_url}
        logoDarkUrl={settings?.logo_dark_url}
      />
      <main className="flex-1 flex items-center justify-center bg-cream py-32 px-6">
        <div className="text-center max-w-[520px]">
          <p className="font-body text-[12px] tracking-[0.32em] uppercase font-medium text-ink-muted mb-6">
            Eroare 404
          </p>
          <h1 className="font-display text-[clamp(64px,9vw,128px)] font-normal leading-[0.95] tracking-tight mb-6">
            Pagina <em className="italic">nu există.</em>
          </h1>
          <p className="font-display italic text-xl text-ink-muted mb-10">
            Poate că ai urmat un link vechi sau ai tastat ceva greșit.
            Te invităm înapoi acasă.
          </p>
          <Button href="/" variant="solid-ink">
            Înapoi la pagina principală →
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
