import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/container";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getSettings } from "@/lib/queries";

export default async function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();
  return (
    <>
      <Header
        logoWhiteUrl={settings?.logo_white_url}
        logoDarkUrl={settings?.logo_dark_url}
      />
      <main className="flex-1 pt-20">
        <Container className="py-12 sm:py-16 lg:py-20">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-body text-sm text-muted hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Înapoi la pagina principală
          </Link>

          {/* The "placeholder" banner is now rendered per-page based on each
              page's approved flag — see license/privacy/cookies page.tsx. */}
          <article className="max-w-3xl">{children}</article>
        </Container>
      </main>
      <Footer />
    </>
  );
}
