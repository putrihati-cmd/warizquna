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
      "Kirim info tagihan / QRIS pembayaran instan via API",
      "Kirim template pesan untuk respon cepat pelanggan",
      "Integrasikan dengan sistem toko online WooCommerce, Shopify, dll. via REST API",
    ],
  },
  {
    icon: Code,
    eyebrow: "Developer & Startup",
    title: "Integrasi API dalam Hitungan Menit",
    desc: "REST API & Webhook siap pakai. Cocok untuk SaaS, marketplace, dan platform internal.",
    items: [
      "REST API sederhana dengan otentikasi API Key",
      "Webhook real-time untuk event pesan masuk dan status delivery",
      "Mudah diuji di localhost / server development",
      "Gunakan request HTTP standar di bahasa pemrograman apa saja",
    ],
  },
  {
    icon: Store,
    eyebrow: "UMKM & Toko Online",
    title: "Komunikasi Pelanggan yang Teratur",
    desc: "Hubungkan WhatsApp Anda ke database kontak terpusat untuk kemudahan pendataan pelanggan.",
    items: [
      "Daftar kontak terorganisir di dashboard",
      "Beri label / tag per kontak pelanggan",
      "Akses fitur inti gratis selamanya",
      "Cocok untuk integrasi order & notification via sistem mandiri",
    ],
  },
  {
    icon: GraduationCap,
    eyebrow: "Sekolah & Institusi",
    title: "Komunikasi dengan Orang Tua Siswa",
    desc: "Kirim notifikasi penting, jadwal ujian, dan tagihan SPP secara cepat dan tercatat.",
    items: [
      "Kirim info pembayaran SPP dan pengumuman penting",
      "Gunakan template pesan untuk undangan rapat orang tua",
      "Kelola daftar kontak nomor telepon orang tua siswa",
      "Integrasi mudah dengan SIAKAD (Sistem Informasi Akademik) via API",
    ],
  },
  {
    icon: Building2,
    eyebrow: "Instansi & Pemerintahan",
    title: "Notifikasi Layanan Publik",
    desc: "Sediakan kanal komunikasi yang aman, cepat, dan terlacak.",
    items: [
      "Notifikasi status pelayanan publik otomatis",
      "Otomatisasi info layanan instan via Webhook",
      "Audit log aktivitas akun untuk transparansi keamanan",
      "Infrastruktur aman dengan enkripsi kredensial API",
    ],
  },
  {
    icon: Stethoscope,
    eyebrow: "Klinik & Rumah Sakit",
    title: "Reminder Janji Temu Pasien",
    desc: "Kurangi risiko pasien tidak hadir dengan pengingat otomatis jadwal janji temu.",
    items: [
      "Reminder janji temu pasien otomatis via API",
      "Kirim notifikasi jadwal pemeriksaan berkala",
      "Keamanan data pasien terjaga dengan audit logs",
      "Integrasi ke sistem rekam medis / HIS via REST API",
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
      "Verifikasi kode OTP instan via WhatsApp",
      "Enkripsi API keys & audit log aktivitas",
    ],
  },
  {
    icon: Plane,
    eyebrow: "Travel & Hospitality",
    title: "Konfirmasi Booking & Tiket",
    desc: "Sediakan konfirmasi booking, e-ticket, dan pengingat jadwal keberangkatan pelanggan.",
    items: [
      "Kirim detail booking & konfirmasi reservasi",
      "Reminder jadwal check-in dan detail akomodasi",
      "Kirim link tautan e-ticket via WhatsApp",
      "REST API cepat & stabil untuk volume pengiriman tinggi",
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
