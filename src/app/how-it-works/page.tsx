import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, UserPlus, Link2, Send, BarChart3, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Cara Kerja",
  description:
    "Pelajari cara kerja Rizquna WhatsApp Gateway: daftar akun, hubungkan WhatsApp via QR Code, kirim pesan, dan monitor performa.",
};

const STEPS = [
  {
    n: 1,
    icon: UserPlus,
    title: "Daftar Akun Rizquna",
    body: "Buat akun gratis tanpa kartu kredit. Anda otomatis mendapatkan trial 30 hari untuk semua fitur premium.",
    items: ["Pendaftaran < 1 menit", "Verifikasi email otomatis", "Workspace pribadi siap pakai"],
  },
  {
    n: 2,
    icon: Link2,
    title: "Hubungkan Nomor WhatsApp",
    body: "Buka menu Device di dashboard Anda, buat sesi baru, dan scan QR Code menggunakan WhatsApp di HP Anda (Perangkat Tertaut).",
    items: ["Tutorial panduan step-by-step", "Koneksi instan kurang dari 10 detik", "Hubungkan beberapa nomor sekaligus"],
  },
  {
    n: 3,
    icon: Send,
    title: "Mulai Kirim Pesan",
    body: "Gunakan dashboard untuk mengirim pesan, mengelola template, atau integrasikan REST API ke sistem internal Anda.",
    items: ["Inbox terpusat siap pakai", "Broadcast & schedule", "REST API + Webhook real-time"],
  },
  {
    n: 4,
    icon: BarChart3,
    title: "Monitor & Kelola",
    body: "Pantau statistik pengiriman, kelola inbox percakapan, dan optimalkan strategi komunikasi bisnis Anda.",
    items: ["Analytics delivery & open rate", "Status broadcast real-time", "Export laporan CSV/Excel/PDF"],
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="pt-16 pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--rizquna-green)" }}>
            Cara Kerja
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mt-3">
            Mulai Dalam <span className="gradient-text">4 Langkah Sederhana</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg" style={{ color: "var(--text-secondary)" }}>
            Tidak perlu pengalaman teknis. Ikuti langkah berikut dan mulai kirim pesan dalam hitungan menit.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {STEPS.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.n}
                className="rounded-2xl p-7 grid md:grid-cols-[120px_1fr] gap-6 items-start"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)" }}
              >
                <div className="flex flex-col items-center md:items-start gap-3">
                  <div
                    className="w-16 h-16 rounded-2xl text-white font-extrabold text-2xl flex items-center justify-center shadow-lg"
                    style={{ background: "var(--rizquna-green)" }}
                  >
                    {s.n}
                  </div>
                  <Icon className="w-6 h-6" style={{ color: "var(--rizquna-green)" }} />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-2">{s.title}</h2>
                  <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {s.body}
                  </p>
                  <ul className="mt-4 grid sm:grid-cols-2 gap-2 text-sm">
                    {s.items.map((it) => (
                      <li key={it} className="flex items-start gap-2" style={{ color: "var(--text-secondary)" }}>
                        <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "var(--rizquna-green)" }} />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold">Siap untuk memulai?</h3>
          <p className="mt-3" style={{ color: "var(--text-secondary)" }}>
            Daftar gratis sekarang, tanpa kartu kredit. Trial premium 30 hari otomatis aktif.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-white font-bold text-sm transition-all hover:-translate-y-1 shadow-lg mt-6"
            style={{ background: "var(--rizquna-green)" }}
          >
            Mulai Gratis <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
