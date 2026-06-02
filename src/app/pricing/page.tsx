"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, X, CreditCard, FileText, ArrowUpCircle, RefreshCcw } from "lucide-react";
import { SITE } from "@/lib/site";

type Plan = {
  name: string;
  desc: string;
  monthly: string;
  yearly: string;
  highlight?: boolean;
  cta: string;
  href: string;
  limits: string[];
  features: Record<string, boolean>;
};

const FEATURE_GROUPS: { title: string; items: string[] }[] = [
  {
    title: "Komunikasi & Pesan",
    items: [
      "WhatsApp API Resmi Meta",
      "Inbox Percakapan",
      "Inbox Multi-Agent",
      "Multi User WhatsApp Web",
      "Template Pesan Meta",
      "Pesan Dinamis & Personal",
      "Spintax Replacement",
    ],
  },
  {
    title: "Otomatisasi",
    items: [
      "Broadcast Massal",
      "Jadwal Kirim Pesan",
      "Smart Perfect Timing",
      "Lampiran Media Broadcast",
      "Auto Responder",
      "Smart Auto Reply",
      "AI Smart Bot Action",
      "Anti WA Banned Filter",
    ],
  },
  {
    title: "Manajemen",
    items: [
      "Manajemen Kontak & CRM",
      "Import & Export Kontak",
      "Customer Ticketing System",
      "Tim & Role Management",
      "Human Handover Protocol",
    ],
  },
  {
    title: "Analitik & Laporan",
    items: [
      "Analytics Dasar",
      "Analytics Lengkap",
      "Broadcast Status Monitor",
      "Export Laporan CSV",
      "Export Laporan Excel",
      "Export Laporan PDF",
    ],
  },
  {
    title: "Integrasi & Dukungan",
    items: ["Webhook Real-time", "API Key Management", "Live Chat Support"],
  },
  { title: "Keamanan", items: ["Keamanan Enterprise"] },
];

const ALL = FEATURE_GROUPS.flatMap((g) => g.items);
const set = (yes: string[]): Record<string, boolean> =>
  Object.fromEntries(ALL.map((k) => [k, yes.includes(k)]));

const PLANS: Plan[] = [
  {
    name: "Free",
    desc: "Untuk personal & developer",
    monthly: "Gratis",
    yearly: "Gratis",
    cta: "Pilih Paket",
    href: "/register?planId=free",
    limits: ["Unlimited pesan/bulan", "1 nomor WABA", "1 anggota tim", "1 API Key"],
    features: set([
      "WhatsApp API Resmi Meta",
      "Inbox Percakapan",
      "Template Pesan Meta",
      "Pesan Dinamis & Personal",
      "Webhook Real-time",
      "API Key Management",
      "Analytics Dasar",
      "Manajemen Kontak & CRM",
      "Import & Export Kontak",
      "Keamanan Enterprise",
    ]),
  },
  {
    name: "Business",
    desc: "Untuk bisnis berkembang",
    monthly: "Rp 25K/bln",
    yearly: "Rp 20K/bln",
    highlight: true,
    cta: "Pilih Paket",
    href: "/register?planId=business",
    limits: ["Unlimited pesan/bulan", "3 nomor WABA", "10 anggota tim", "5 API Key"],
    features: set([
      "WhatsApp API Resmi Meta",
      "Inbox Percakapan",
      "Inbox Multi-Agent",
      "Multi User WhatsApp Web",
      "Template Pesan Meta",
      "Pesan Dinamis & Personal",
      "Spintax Replacement",
      "Broadcast Massal",
      "Jadwal Kirim Pesan",
      "Lampiran Media Broadcast",
      "Auto Responder",
      "Smart Auto Reply",
      "Anti WA Banned Filter",
      "Manajemen Kontak & CRM",
      "Import & Export Kontak",
      "Customer Ticketing System",
      "Tim & Role Management",
      "Analytics Dasar",
      "Analytics Lengkap",
      "Broadcast Status Monitor",
      "Export Laporan CSV",
      "Webhook Real-time",
      "API Key Management",
      "Live Chat Support",
      "Keamanan Enterprise",
    ]),
  },
  {
    name: "Professional",
    desc: "Untuk perusahaan menengah",
    monthly: "Rp 45K/bln",
    yearly: "Rp 36K/bln",
    cta: "Pilih Paket",
    href: "/register?planId=professional",
    limits: ["Unlimited pesan/bulan", "10 nomor WABA", "30 anggota tim", "15 API Key"],
    features: set(ALL),
  },
  {
    name: "Enterprise",
    desc: "Untuk korporat & enterprise",
    monthly: "Custom",
    yearly: "Custom",
    cta: "Hubungi Sales",
    href: "/contact",
    limits: ["Unlimited pesan/bulan", "Unlimited nomor WABA", "Unlimited anggota tim", "Unlimited API Key"],
    features: set(ALL),
  },
];

export default function PricingPage() {
  const [yearly, setYearly] = useState(false);
  return (
    <>
      <section className="pt-16 pb-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Harga Transparan,
            <br />
            <span className="gradient-text">Tanpa Biaya Tersembunyi</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg" style={{ color: "var(--text-secondary)" }}>
            Semua paket termasuk free trial 30 hari tanpa kartu kredit. Diskon 20% untuk langganan
            tahunan.
          </p>

          <div
            className="inline-flex items-center gap-1 mt-7 p-1 rounded-full text-sm font-semibold"
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
      </section>

      <section className="pb-12">
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
      </section>

      {/* Comparison table */}
      <section className="py-12" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">Perbandingan Fitur Lengkap</h2>
          <div className="overflow-x-auto rounded-2xl" style={{ border: "1px solid var(--border-light)", background: "var(--bg-card)" }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "var(--bg-surface)" }}>
                  <th className="text-left p-4 font-bold w-1/3">Fitur</th>
                  {PLANS.map((p) => (
                    <th key={p.name} className="p-4 font-bold text-center">
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FEATURE_GROUPS.map((g) => (
                  <FeatureGroup key={g.title} group={g} plans={PLANS} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Payment info */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">Informasi Pembayaran</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: CreditCard, t: "Metode Pembayaran", d: "Transfer Bank, Virtual Account, Kartu Kredit/Debit, dan QRIS melalui Midtrans." },
              { icon: FileText, t: "Invoice Otomatis", d: "Invoice dikirim otomatis via email setiap tanggal jatuh tempo." },
              { icon: ArrowUpCircle, t: "Upgrade Instan", d: "Upgrade paket berlaku langsung dengan perhitungan prorata." },
              { icon: RefreshCcw, t: "Refund Policy", d: "Langganan tahunan dapat dibatalkan dalam 14 hari pertama (full refund)." },
            ].map((it) => {
              const Icon = it.icon;
              return (
                <div key={it.t} className="rounded-2xl p-6 text-center" style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)" }}>
                  <div className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-3" style={{ background: "rgba(37,211,102,0.1)", color: "var(--rizquna-green)" }}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base">{it.t}</h3>
                  <p className="text-sm mt-2 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {it.d}
                  </p>
                </div>
              );
            })}
          </div>
          <p className="text-center text-sm mt-10" style={{ color: "var(--text-tertiary)" }}>
            Butuh bantuan memilih paket? <Link href="/contact" className="font-semibold" style={{ color: "var(--rizquna-green)" }}>Hubungi tim kami</Link> di {SITE.email}.
          </p>
        </div>
      </section>
    </>
  );
}

function FeatureGroup({ group, plans }: { group: { title: string; items: string[] }; plans: Plan[] }) {
  return (
    <>
      <tr>
        <td colSpan={plans.length + 1} className="p-3 text-xs font-bold uppercase tracking-widest" style={{ background: "var(--bg-secondary)", color: "var(--text-tertiary)" }}>
          {group.title}
        </td>
      </tr>
      {group.items.map((item) => (
        <tr key={item} className="border-t" style={{ borderColor: "var(--border-light)" }}>
          <td className="p-4" style={{ color: "var(--text-secondary)" }}>{item}</td>
          {plans.map((p) => (
            <td key={p.name} className="p-4 text-center">
              {p.features[item] ? (
                <CheckCircle2 className="w-5 h-5 mx-auto" style={{ color: "var(--rizquna-green)" }} />
              ) : (
                <X className="w-4 h-4 mx-auto" style={{ color: "var(--text-tertiary)" }} />
              )}
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
