import type { Metadata } from "next";
import Link from "next/link";
import {
  ShoppingCart,
  Code,
  Store,
  GraduationCap,
  Building2,
  Stethoscope,
  Banknote,
  Plane,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Use Cases",
  description:
    "Use case Rizquna WhatsApp Gateway untuk berbagai industri: e-commerce, developer, UMKM, sekolah, instansi, hingga rumah sakit.",
};

const CASES = [
  {
    icon: ShoppingCart,
    eyebrow: "Pebisnis & E-Commerce",
    title: "Notifikasi Pesanan Otomatis",
    desc: "Tingkatkan pengalaman pelanggan dengan update real-time di setiap fase order — dari pembayaran hingga pengiriman.",
    items: [
      "Kirim konfirmasi order, update pengiriman, dan invoice via WhatsApp",
      "Broadcast promosi ke pelanggan dengan template kustom",
      "Tingkatkan repeat order dengan pesan follow-up otomatis",
      "Integrasi WooCommerce, OrderOnline.id, Mayar, Berdu.id",
    ],
  },
  {
    icon: Code,
    eyebrow: "Developer & Startup",
    title: "Integrasi API dalam Hitungan Menit",
    desc: "REST API & Webhook siap pakai. Cocok untuk SaaS, marketplace, dan platform internal.",
    items: [
      "REST API sederhana dengan dokumentasi lengkap",
      "Webhook real-time untuk event pesan masuk dan status delivery",
      "Sandbox testing gratis selama masa trial 30 hari",
      "SDK Node.js, PHP, Python (opsional)",
    ],
  },
  {
    icon: Store,
    eyebrow: "UMKM & Toko Online",
    title: "CS Profesional Tanpa Ribet",
    desc: "Inbox terpusat dan auto-responder untuk pelayanan 24/7 dari satu dashboard.",
    items: [
      "Inbox terpusat untuk melayani pelanggan dari satu dashboard",
      "Auto-responder menjawab FAQ pelanggan 24/7",
      "Gratis selamanya untuk fitur inti",
      "Cocok untuk toko Shopee, Tokopedia, Instagram Shop",
    ],
  },
  {
    icon: GraduationCap,
    eyebrow: "Sekolah & Institusi",
    title: "Komunikasi dengan Orang Tua Siswa",
    desc: "Kirim notifikasi penting, jadwal ujian, dan tagihan SPP secara terjadwal dan terdokumentasi.",
    items: [
      "Broadcast info pembayaran SPP, jadwal, dan pengumuman penting",
      "Template pesan undangan rapat dan progress report siswa",
      "Multi-agent: guru dan admin sekolah membalas dari dashboard yang sama",
      "Catatan internal per kontak orang tua",
    ],
  },
  {
    icon: Building2,
    eyebrow: "Instansi & Pemerintahan",
    title: "Layanan Publik Digital",
    desc: "Sediakan kanal komunikasi yang aman, terlacak, dan responsif.",
    items: [
      "Notifikasi status pelayanan publik",
      "Survey kepuasan otomatis pasca-layanan",
      "Tiket pengaduan terorganisir",
      "Audit log aktivitas operator",
    ],
  },
  {
    icon: Stethoscope,
    eyebrow: "Klinik & Rumah Sakit",
    title: "Reminder Janji Temu Pasien",
    desc: "Kurangi no-show dengan pengingat otomatis dan layani pertanyaan administrasi via WhatsApp.",
    items: [
      "Reminder janji temu H-1 dan H-jam",
      "Konfirmasi & reschedule otomatis",
      "Distribusi hasil lab dengan template aman",
      "Tiket administrasi terlacak",
    ],
  },
  {
    icon: Banknote,
    eyebrow: "Keuangan & Koperasi",
    title: "Notifikasi Transaksi & Tagihan",
    desc: "Kirim notifikasi transaksi otomatis dengan cepat. Cocok untuk koperasi, fintech, dan multifinance.",
    items: [
      "Notifikasi transaksi & jatuh tempo cicilan",
      "Reminder bayar tagihan otomatis",
      "Verifikasi OTP instan via WhatsApp",
      "Enkripsi end-to-end & audit log",
    ],
  },
  {
    icon: Plane,
    eyebrow: "Travel & Hospitality",
    title: "Konfirmasi Booking & Reminder",
    desc: "Sediakan konfirmasi booking, e-ticket, dan layanan check-in via WhatsApp.",
    items: [
      "Kirim e-ticket & itinerary via WhatsApp",
      "Reminder check-in dan reschedule",
      "Survey post-trip otomatis",
      "Re-engagement promosi musiman",
    ],
  },
];

export default function UseCasesPage() {
  return (
    <>
      <section className="pt-16 pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--rizquna-green)" }}>
            Use Cases
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mt-3">
            Cocok untuk <span className="gradient-text">Semua Jenis Bisnis</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg" style={{ color: "var(--text-secondary)" }}>
            Dari toko online kecil sampai institusi pemerintahan — Rizquna fleksibel mengikuti
            kebutuhan komunikasi bisnis Anda.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-5">
          {CASES.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                className="rounded-2xl p-7 transition-all hover:-translate-y-1 hover:shadow-lg"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(37,211,102,0.1)", color: "var(--rizquna-green)" }}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: "var(--rizquna-green)" }}
                >
                  {c.eyebrow}
                </span>
                <h2 className="text-xl font-bold mt-2 mb-2">{c.title}</h2>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                  {c.desc}
                </p>
                <ul className="space-y-2 text-sm">
                  {c.items.map((it) => (
                    <li
                      key={it}
                      className="flex items-start gap-2"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <CheckCircle2
                        className="w-4 h-4 mt-0.5 shrink-0"
                        style={{ color: "var(--rizquna-green)" }}
                      />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold">Industri Anda tidak ada di sini?</h3>
          <p className="mt-3" style={{ color: "var(--text-secondary)" }}>
            Diskusikan kebutuhan custom — tim kami senang membantu menemukan solusi terbaik.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-white font-bold text-sm transition-all hover:-translate-y-1 shadow-lg mt-6"
            style={{ background: "var(--rizquna-green)" }}
          >
            Hubungi Tim Kami <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
