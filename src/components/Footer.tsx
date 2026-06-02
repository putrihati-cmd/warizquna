"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";
import { FOOTER_NAV, SITE } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  const [operational, setOperational] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/health")
      .then((res) => {
        if (res.ok || res.status === 200 || res.status === 503) {
          return res.json();
        }
        throw new Error("unhealthy");
      })
      .then((data) => {
        setOperational(data.status === "ok");
      })
      .catch(() => {
        setOperational(false);
      });
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="mt-24 pt-16 pb-8"
      style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border-light)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <Logo />
            <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Platform WhatsApp API Gateway & Developer Tooling. Kelola pesan otomatis, inbox terpusat, dan
              integrasi API tanpa pusing.
            </p>
            <div className="flex items-center gap-2 mt-5">
              {SITE.social.linkedin && SITE.social.linkedin !== "#" && (
                <a
                  href={SITE.social.linkedin}
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-[var(--bg-surface)] transition-colors"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {SITE.social.twitter && SITE.social.twitter !== "#" && (
                <a
                  href={SITE.social.twitter}
                  aria-label="Twitter"
                  className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-[var(--bg-surface)] transition-colors"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {SITE.social.github && SITE.social.github !== "#" && (
                <a
                  href={SITE.social.github}
                  aria-label="GitHub"
                  className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-[var(--bg-surface)] transition-colors"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {Object.entries(FOOTER_NAV).map(([heading, items]) => (
            <div key={heading}>
              <h4 className="font-bold text-sm mb-4">{heading}</h4>
              <ul className="space-y-2.5">
                {items.map((it) => (
                  <li key={it.href}>
                    <Link
                      href={it.href}
                      className="text-sm hover:text-[var(--rizquna-green)] transition-colors"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs"
          style={{ borderTop: "1px solid var(--border-light)", color: "var(--text-tertiary)" }}
        >
          <p>
            © {currentYear} {SITE.company}. All rights reserved.
          </p>
          <p className="flex items-center gap-2">
            <span className={`inline-flex w-2 h-2 rounded-full animate-pulse ${operational === null ? "bg-amber-500" : operational ? "bg-green-500" : "bg-red-500"}`} />
            {operational === null ? "Checking system status..." : operational ? "All systems operational" : "Some systems degraded"} | Made in {SITE.city}
          </p>
        </div>
      </div>
    </footer>
  );
}
