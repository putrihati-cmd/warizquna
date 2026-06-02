import type { Metadata } from "next";
import { Sparkles, Wrench, Zap, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Riwayat update fitur, perbaikan, dan peningkatan platform Rizquna WA Gateway.",
};

const RELEASES = [
  {
    version: "1.5.0",
    date: "2026-05-26",
    highlights: [
      { type: "feature", text: "Real /api/v1/messages dengan API key auth dan per-key rate limit" },
      { type: "feature", text: "Halaman /account untuk update profil dan ubah kata sandi" },
      { type: "feature", text: "Audit log per akun di /account/audit" },
      { type: "feature", text: "Email sender via SMTP/Nodemailer untuk reset password" },
      { type: "feature", text: "REST API /api/v1/contacts (CRUD) dengan API key auth" },
      { type: "improvement", text: "Last-used tracking & per-key rate limiting" },
    ],
  },
  {
    version: "1.4.0",
    date: "2026-05-26",
    highlights: [
      { type: "feature", text: "Halaman publik baru: blog, changelog, docs" },
      { type: "feature", text: "Schema.org JSON-LD untuk SEO yang lebih baik" },
      { type: "feature", text: "Real authentication dengan JWT & bcrypt" },
      { type: "improvement", text: "Upgrade ke Next.js 16.2.6 (security patch CVE-2025-66478)" },
    ],
  },
  {
    version: "1.3.0",
    date: "2026-05-13",
    highlights: [
      { type: "feature", text: "AI Smart Bot Action dengan custom training" },
      { type: "feature", text: "Spintax Replacement untuk variasi pesan otomatis" },
      { type: "feature", text: "Smart Perfect Timing — pengiriman pesan di jam optimal" },
      { type: "improvement", text: "Inbox multi-agent dengan handover protocol" },
    ],
  },
  {
    version: "1.2.0",
    date: "2026-04-20",
    highlights: [
      { type: "feature", text: "Customer Ticketing System" },
      { type: "feature", text: "Anti WA Banned Filter" },
      { type: "feature", text: "Export laporan ke PDF & Excel" },
      { type: "fix", text: "Webhook retry logic kini support exponential backoff" },
    ],
  },
  {
    version: "1.1.0",
    date: "2026-03-15",
    highlights: [
      { type: "feature", text: "Integrasi Zapier, Google Sheets, dan Gmail" },
      { type: "feature", text: "Custom field & segmentasi kontak presisi" },
      { type: "improvement", text: "Performa broadcast 3x lebih cepat" },
    ],
  },
  {
    version: "1.0.0",
    date: "2026-02-01",
    highlights: [
      { type: "feature", text: "Public launch — Rizquna WA Gateway" },
      { type: "feature", text: "WhatsApp Cloud API resmi Meta" },
      { type: "feature", text: "Inbox terpusat, broadcast, template, REST API" },
    ],
  },
];

const TYPE_META: Record<string, { color: string; icon: typeof Sparkles; label: string }> = {
  feature: { color: "#25D366", icon: Sparkles, label: "Fitur Baru" },
  improvement: { color: "#0EA5E9", icon: Zap, label: "Peningkatan" },
  fix: { color: "#F59E0B", icon: Wrench, label: "Perbaikan" },
  security: { color: "#EF4444", icon: ShieldCheck, label: "Keamanan" },
};

export default function ChangelogPage() {
  return (
    <>
      <section className="pt-16 pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--rizquna-green)" }}>
            Changelog
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mt-3">
            Riwayat <span className="gradient-text">Update Platform</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg" style={{ color: "var(--text-secondary)" }}>
            Kami terus memperbaiki dan menambahkan fitur baru. Berikut ringkasan rilis terbaru.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {RELEASES.map((r) => (
            <article
              key={r.version}
              className="rounded-2xl p-7"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)" }}
            >
              <div className="flex items-baseline justify-between mb-4">
                <h2 className="text-2xl font-extrabold">v{r.version}</h2>
                <span className="text-xs font-semibold" style={{ color: "var(--text-tertiary)" }}>
                  {new Date(r.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                </span>
              </div>
              <ul className="space-y-2.5">
                {r.highlights.map((h, i) => {
                  const meta = TYPE_META[h.type] ?? TYPE_META.feature;
                  const Icon = meta.icon;
                  return (
                    <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "var(--text-secondary)" }}>
                      <span
                        className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full shrink-0"
                        style={{ background: `${meta.color}20`, color: meta.color }}
                      >
                        <Icon className="w-3 h-3" />
                        {meta.label}
                      </span>
                      <span>{h.text}</span>
                    </li>
                  );
                })}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
