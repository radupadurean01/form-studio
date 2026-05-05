"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { submitContact, type ContactState } from "@/app/actions";

const initialState: ContactState = { success: false };

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initialState);
  // Only render the form HTML on the client. Password managers (LastPass, etc.)
  // and other extensions inject DOM into the form before React hydrates,
  // which causes hydration mismatches that suppressHydrationWarning can't fix
  // (it only handles attribute-level mismatches, not added child nodes).
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Reserve space so the layout doesn't shift when the form mounts.
    return <div aria-hidden className="min-h-[520px]" />;
  }

  if (state.success) {
    return (
      <div className="flex items-center justify-center bg-cream-warm rounded-xl p-12">
        <div className="text-center">
          <p className="font-display text-3xl mb-3">Mulțumim.</p>
          <p className="font-body text-sm text-ink-muted">
            Am primit mesajul tău. Te contactăm în curând.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block font-body text-sm font-medium mb-2 text-ink"
        >
          Nume
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full font-body text-base px-5 py-4 rounded-lg border border-ink/10 bg-cream-warm focus:outline-none focus:ring-2 focus:ring-mustard/40 focus:border-mustard transition-colors"
          placeholder="Numele tău"
        />
        {state.fieldErrors?.name && (
          <p className="font-body text-xs text-terracotta mt-1.5">
            {state.fieldErrors.name}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block font-body text-sm font-medium mb-2 text-ink"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full font-body text-base px-5 py-4 rounded-lg border border-ink/10 bg-cream-warm focus:outline-none focus:ring-2 focus:ring-mustard/40 focus:border-mustard transition-colors"
          placeholder="email@exemplu.ro"
        />
        {state.fieldErrors?.email && (
          <p className="font-body text-xs text-terracotta mt-1.5">
            {state.fieldErrors.email}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="block font-body text-sm font-medium mb-2 text-ink"
        >
          Mesaj
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full font-body text-base px-5 py-4 rounded-lg border border-ink/10 bg-cream-warm focus:outline-none focus:ring-2 focus:ring-mustard/40 focus:border-mustard transition-colors resize-none"
          placeholder="Scrie mesajul tău aici..."
        />
        {state.fieldErrors?.message && (
          <p className="font-body text-xs text-terracotta mt-1.5">
            {state.fieldErrors.message}
          </p>
        )}
      </div>

      {state.error && (
        <p className="font-body text-sm text-terracotta">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center gap-2.5 px-10 py-[18px] font-body text-[12px] tracking-[0.16em] uppercase font-medium rounded-full bg-ink text-cream-warm hover:bg-terracotta hover:-translate-y-0.5 disabled:opacity-50 transition-all duration-300"
      >
        {pending ? "Se trimite..." : "Trimite mesajul →"}
      </button>

      <p className="font-body text-xs text-ink-muted leading-relaxed">
        Prin trimiterea formularului, ești de acord cu prelucrarea datelor tale conform{" "}
        <Link href="/privacy" className="underline hover:text-terracotta transition-colors">
          politicii de confidențialitate
        </Link>
        .
      </p>
    </form>
  );
}
