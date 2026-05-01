"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  MessageSquare,
  Settings,
  Star,
  LogOut,
  Menu,
  X,
  LayoutGrid,
  Dumbbell,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Echipă", href: "/admin/team", icon: Users },
  { label: "Studio", href: "/admin/tour", icon: LayoutGrid },
  { label: "Programe", href: "/admin/programs", icon: Dumbbell },
  { label: "Memberships", href: "/admin/memberships", icon: CreditCard },
  { label: "Testimoniale", href: "/admin/testimonials", icon: Star },
  { label: "Setări", href: "/admin/settings", icon: Settings },
  { label: "Mesaje", href: "/admin/submissions", icon: MessageSquare },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Don't wrap login page in the admin shell
  if (pathname === "/admin/login" || pathname.startsWith("/admin/auth")) {
    return <>{children}</>;
  }

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — fixed on viewport, doesn't scroll with content */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-foreground text-white flex flex-col transition-transform lg:translate-x-0 overflow-y-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center px-6 h-16 border-b border-white/10">
          <Image
            src="/logos/logo-horizontal-white.svg"
            alt="Form Studio"
            width={120}
            height={41}
          />
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto lg:hidden p-1"
            aria-label="Închide meniu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-body text-base transition-colors ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg font-body text-base text-white/60 hover:text-white hover:bg-white/5 transition-colors"
          >
            <LogOut size={18} />
            Deconectare
          </button>
        </div>
      </aside>

      {/* Main content column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar — sticky at top of column */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4 lg:px-8 flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 -ml-2"
            aria-label="Deschide meniu"
          >
            <Menu size={20} />
          </button>
          <div className="ml-auto">
            <Link
              href="/"
              className="font-body text-base text-muted hover:text-foreground transition-colors"
            >
              Vezi site-ul →
            </Link>
          </div>
        </header>

        {/* Page content — only scrollable area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
