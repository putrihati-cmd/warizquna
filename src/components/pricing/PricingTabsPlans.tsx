"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { PLANS } from "@/data/plans";

export function PricingTabsPlans() {
  const [yearly, setYearly] = useState(false);

  return (
    <>
      {/* Toggle Tab */}
      <div className="max-w-3xl mx-auto text-center mb-10">
        <div
          className="inline-flex items-center gap-1 p-1 rounded-full text-sm font-semibold"
          style={{ background: "var(--bg-surface)" }}
        >
          <button
            onClick={() => setYearly(false)}
            className={`px-4 py-1.5 rounded-full transition-all ${!yearly ? "text-white shadow" : ""}`}
            style={!yearly ? { background: "var(--rizquna-green)" } : { color: "var(--text-secondary)" }}
          >
            Bulanan
          </button>
          <button
            onClick={() => setYearly(true)}
            className={`px-4 py-1.5 rounded-full transition-all flex items-center gap-2 ${yearly ? "text-white shadow" : ""}`}
            style={yearly ? { background: "var(--rizquna-green)" } : { color: "var(--text-secondary)" }}
          >
            Tahunan
            <span
              className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
              style={
                yearly
                  ? { background: "rgba(255,255,255,0.25)" }
                  : { background: "rgba(37,211,102,0.15)", color: "var(--rizquna-green)" }
              }
            >
              Hemat 20%
            </span>
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {PLANS.map((p) => (
          <div
            key={p.name}
            className={`relative rounded-2xl p-6 flex flex-col ${p.highlight ? "shadow-2xl scale-[1.02]" : ""}`}
            style={{
              background: "var(--bg-card)",
              border: p.highlight ? "2px solid var(--rizquna-green)" : "1px solid var(--border-light)",
            }}
          >
            {p.highlight && (
              <span
                className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest text-white px-3 py-1 rounded-full"
                style={{ background: "var(--rizquna-green)" }}
              >
                Paling Populer
              </span>
            )}
            <h3 className="text-xl font-bold">{p.name}</h3>
            <p className="text-sm mt-1" style={{ color: "var(--text-tertiary)" }}>
              {p.desc}
            </p>
            <p className="text-3xl font-extrabold mt-4">{yearly ? p.yearly : p.monthly}</p>
            <ul className="space-y-2 mt-6 text-sm flex-1">
              {p.limits.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2 font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  <CheckCircle2
                    className="w-4 h-4 mt-0.5 shrink-0"
                    style={{ color: "var(--rizquna-green)" }}
                  />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <Link
              href={p.href}
              className={`mt-6 block w-full text-center py-3 rounded-xl text-sm font-bold transition-all hover:-translate-y-0.5 ${p.highlight ? "text-white shadow-lg" : ""}`}
              style={
                p.highlight
                  ? { background: "var(--rizquna-green)" }
                  : { border: "1px solid var(--border)", color: "var(--text-primary)" }
              }
            >
              {p.cta}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
