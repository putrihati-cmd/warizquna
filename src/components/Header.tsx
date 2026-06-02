"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, LayoutDashboard } from "lucide-react";
import { NAV } from "@/lib/site";
import { Logo } from "./Logo";

export function Header({ user }: { user?: { name: string; email: string } | null }) {
  const [open, setOpen] = useState(false);
  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md"
      style={{ background: "rgba(255,255,255,0.85)", borderBottom: "1px solid var(--border-light)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-7">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-sm font-medium transition-colors hover:text-[var(--rizquna-green)]"
              style={{ color: "var(--text-secondary)" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-lg text-white transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-md"
              style={{ background: "var(--rizquna-green)" }}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-semibold px-4 py-2 rounded-lg transition-colors hover:bg-[var(--bg-surface)]"
                style={{ color: "var(--text-primary)" }}
              >
                Masuk
              </Link>
              <Link
                href="/register"
                className="text-sm font-bold px-5 py-2.5 rounded-lg text-white transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-md"
                style={{ background: "var(--rizquna-green)" }}
              >
                Coba Gratis
              </Link>
            </>
          )}
        </div>
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg hover:bg-[var(--bg-surface)]"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t" style={{ borderColor: "var(--border-light)" }}>
          <div className="px-4 py-3 flex flex-col gap-1">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-[var(--bg-surface)]"
              >
                {n.label}
              </Link>
            ))}
            <div className="h-px my-2" style={{ background: "var(--border-light)" }} />
            {user ? (
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-bold text-white text-center"
                style={{ background: "var(--rizquna-green)" }}
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm font-semibold hover:bg-[var(--bg-surface)]"
                >
                  Masuk
                </Link>
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm font-bold text-white text-center"
                  style={{ background: "var(--rizquna-green)" }}
                >
                  Coba Gratis
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
