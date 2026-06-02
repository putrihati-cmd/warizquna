import type { Metadata } from "next";
import { Zap, Smartphone, Key, Radio, Users, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Fitur",
  description:
    "Fitur lengkap WhatsApp Gateway Rizquna: API gateway & webhook, manajemen API key, kontak, dan audit log aktivitas.",
};

type Feature = {
  icon: typeof Zap;
  emoji: string;
  title: string;
  desc: string;
  bullets: string[];
};

const FEATURES: Feature[] = [
  {
    icon: Zap,
    emoji: "🚀",
    title: "WhatsApp API Gateway",
    desc: "Integrasikan nomor WhatsApp Anda dengan REST API sederhana. Kirim pesan teks dan template secara otomatis menggunakan endpoint developer-friendly yang stabil.",
    bullets: ["REST API endpoint sederhana", "Dokumentasi API lengkap", "Pengiriman pesan instan", "Responsif & aman"],
  },
  {
    icon: Smartphone,
    emoji: "💻",
    title: "Koneksi QR Perangkat",
    desc: "Hubungkan nomor WhatsApp Anda secara instan dengan memindai (scan) QR Code di dashboard admin gateway.",
    bullets: ["Pairing instan via QR Code", "Tanpa perlu WABA resmi", "Status device terhubung real-time", "Gunakan nomor Anda sendiri"],
  },
  {
    icon: Key,
    emoji: "🔑",
    title: "Manajemen API Key",
    desc: "Generate dan kelola API key per akun untuk otentikasi aman sistem eksternal Anda.",
    bullets: ["Multiple API key support", "Otentikasi aman (SHA-256)", "Revoke akses kapan saja", "Otomatis catat log penggunaan"],
  },
  {
    icon: Radio,
    emoji: "📡",
    title: "Webhook Real-time",
    desc: "Terima notifikasi real-time untuk setiap event pesan masuk dan status pengiriman langsung ke server/aplikasi Anda.",
    bullets: ["Event pesan masuk", "Status laporan pengiriman", "Format JSON standar", "Log history pengiriman"],
  },
  {
    icon: Users,
    emoji: "👥",
    title: "Manajemen Kontak",
    desc: "Kelola database nomor telepon pelanggan Anda dengan segmentasi label/tag sederhana untuk pengelompokan yang rapi.",
    bullets: ["Simpan kontak teratur", "Custom tag per kontak", "Filter pencarian kontak", "Input manual dari dashboard"],
  },
  {
    icon: FileText,
    emoji: "📋",
    title: "Audit Log Aktivitas",
    desc: "Pantau riwayat aksi penting pada akun Anda secara transparan untuk pengawasan keamanan yang lebih baik.",
    bullets: ["Log pembuatan & revokasi API key", "Catatan aksi webhooks", "Riwayat update profil & sandi", "Transparan & tidak bisa dimodifikasi"],
  },
];

export default function FeaturesPage() {
  return (
    <>
      <section className="pt-16 pb-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Semua yang
            <br />
            <span className="gradient-text">Anda Butuhkan</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg" style={{ color: "var(--text-secondary)" }}>
            Rizquna menyediakan tools handal untuk mengelola integrasi WhatsApp bisnis Anda — dari
            REST API, Webhook, hingga manajemen kontak dan audit log.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: "rgba(37,211,102,0.1)" }}
                  >
                    <span>{f.emoji}</span>
                  </div>
                  <Icon className="w-5 h-5" style={{ color: "var(--rizquna-green)" }} />
                </div>
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                  {f.desc}
                </p>
                <ul className="space-y-2 text-xs">
                  {f.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2" style={{ color: "var(--text-tertiary)" }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
