"use client";

import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/admin/auth/callback`,
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setSent(true);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <Image
            src="/logos/logo-horizontal-black-gold.svg"
            alt="Form Studio"
            width={180}
            height={62}
            priority
          />
        </div>

        <h1 className="font-heading text-2xl text-center mb-2">Admin</h1>
        <p className="font-body text-base text-muted text-center mb-8">
          Introdu adresa de email pentru a primi un link de autentificare.
        </p>

        {sent ? (
          <div className="bg-sage-light rounded-xl p-6 text-center">
            <p className="font-heading text-lg mb-2">Verifică email-ul</p>
            <p className="font-body text-base text-muted">
              Am trimis un link de autentificare la{" "}
              <strong className="text-foreground">{email}</strong>. Apasă
              link-ul pentru a te conecta.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block font-body text-base font-medium mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full font-body text-base px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
                placeholder="admin@formstudio.ro"
              />
            </div>

            {error && (
              <p className="font-body text-base text-red-500">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full font-body text-base font-medium px-8 py-4 rounded-full bg-foreground text-white hover:bg-foreground/90 disabled:opacity-50 transition-colors"
            >
              {loading ? "Se trimite..." : "Trimite link-ul"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
