import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircleQuestion } from "lucide-react";
import { SITE } from "@/lib/site";
import { JsonLd, faqLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Pertanyaan yang sering diajukan tentang Rizquna WhatsApp Gateway: harga, keamanan, integrasi, dan dukungan.",
};

const SECTIONS = [
  {
    title: "Umum",
    qa: [
      {
        q: "Apa itu Rizquna?",
        a: "Rizquna adalah platform SaaS yang menyediakan akses mudah ke WhatsApp Business API resmi dari Meta. Anda dapat mengirim dan menerima pesan WhatsApp, mengelola template, dan mengintegrasikan WhatsApp ke sistem bisnis Anda melalui REST API.",
      },
      {
        q: "Apakah Rizquna menggunakan API resmi?",
        a: "Ya, 100%. Rizquna HANYA menggunakan Meta Cloud API resmi (Official WhatsApp Business Platform). Kami TIDAK menggunakan API unofficial seperti Baileys atau WA-Web yang berisiko banned.",
      },
      {
        q: "Apakah saya perlu login Facebook untuk menggunakan Rizquna?",
        a: "Tidak. Rizquna menggunakan metode System User Access Token. Anda cukup membuat System User di Meta Business Manager dan paste token-nya ke Rizquna. Akun Facebook pribadi Anda tidak pernah terhubung ke Rizquna.",
      },
    ],
  },
  {
    title: "Harga & Pembayaran",
    qa: [
      {
        q: "Berapa harga langganan Rizquna?",
        a: "Rizquna gratis selamanya untuk akses fitur inti. Anda bisa mencoba semua fitur premium (tanpa batasan) secara gratis selama 30 hari tanpa kartu kredit. Paket berlangganan tersedia mulai Rp 25.000/bulan.",
      },
      {
        q: "Apa saja metode pembayaran yang didukung?",
        a: "Rizquna mendukung pembayaran via Transfer Bank, Virtual Account, Kartu Kredit/Debit, dan QRIS melalui payment gateway Midtrans.",
      },
      {
        q: "Apakah ada biaya setup atau biaya tersembunyi?",
        a: "Tidak ada biaya setup. Harga yang tertera di halaman pricing adalah harga akhir. Anda hanya perlu membayar biaya pesan template Meta sesuai tarif resmi WhatsApp Business Platform.",
      },
      {
        q: "Bisakah saya membatalkan langganan?",
        a: "Ya, bisa kapan saja. Tidak ada kontrak jangka panjang. Untuk langganan tahunan, refund penuh tersedia dalam 14 hari pertama.",
      },
    ],
  },
  {
    title: "Pesan & Pengiriman",
    qa: [
      {
        q: "Berapa batas pesan yang dapat dikirim?",
        a: "Tidak ada batasan! Semua paket (termasuk gratis) mendukung pengiriman pesan unlimited tanpa kuota per bulan, selama Anda mematuhi limit pengiriman tier API dari Meta.",
      },
      {
        q: "Apakah broadcast bisa kena banned?",
        a: "Selama Anda menggunakan template yang sudah di-approve Meta dan tidak melanggar kebijakan WhatsApp Business, risiko banned sangat minim. Rizquna juga punya fitur Anti WA Banned Filter untuk mendeteksi kata terlarang sebelum pesan dikirim.",
      },
      {
        q: "Apakah pesan personal & dinamis didukung?",
        a: "Ya. Anda bisa menggunakan variabel dinamis seperti nama, kode order, atau atribut custom contact. Rizquna juga mendukung Spintax untuk variasi kalimat otomatis.",
      },
    ],
  },
  {
    title: "Keamanan",
    qa: [
      {
        q: "Apakah data saya aman?",
        a: "Sangat aman. Token WABA dienkripsi AES-256-GCM, password di-hash bcrypt, dan API Key disimpan sebagai SHA-256 hash. Semua koneksi menggunakan TLS 1.3. Token plaintext tidak pernah disimpan atau di-log.",
      },
      {
        q: "Dimana data disimpan?",
        a: "Data disimpan di server Indonesia dengan standar keamanan enterprise. Kami patuh pada kebijakan privasi data dan tidak membagikan data Anda ke pihak ketiga tanpa izin.",
      },
      {
        q: "Apakah ada audit log?",
        a: "Ya. Setiap aktivitas user di workspace tercatat dalam audit log lengkap dengan timestamp, IP address, dan perubahan data.",
      },
    ],
  },
  {
    title: "Tim & Multi-User",
    qa: [
      {
        q: "Bisakah saya menggunakan Rizquna untuk tim?",
        a: "Ya. Rizquna mendukung multi-user per workspace dengan role Owner, Admin, Member, dan Viewer. Tim Anda dapat mengakses inbox bersama dan meng-assign percakapan.",
      },
      {
        q: "Apakah ada batas jumlah user?",
        a: "Tergantung paket. Free: 1 user. Business: 10 user. Professional: 30 user. Enterprise: unlimited.",
      },
    ],
  },
  {
    title: "Integrasi & Developer",
    qa: [
      {
        q: "Apa saja platform yang sudah terintegrasi?",
        a: "WooCommerce, Contact Form 7, Elementor Form, WPForms, Google Form, Zapier, Google Sheets, Gmail, OrderOnline.id, Sejoli, KIRIM.EMAIL, Berdu.id, Mayar.id, Jubelio, LandingPress, dan masih banyak lagi. Anda juga bisa pakai Webhook Kustom untuk integrasi apapun.",
      },
      {
        q: "Apakah ada SDK atau library?",
        a: "REST API kami bisa dipanggil dari bahasa apapun. SDK Node.js, PHP, dan Python sedang dalam pengembangan.",
      },
      {
        q: "Bagaimana cara menerima pesan masuk?",
        a: "Gunakan Webhook Real-time. Setiap pesan masuk akan di-POST ke endpoint Anda dengan retry otomatis jika gagal.",
      },
    ],
  },
];

export default function FaqPage() {
  const allQa = SECTIONS.flatMap((s) => s.qa);
  return (
    <>
      <JsonLd data={faqLd(allQa)} />
      <section className="pt-16 pb-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--rizquna-green)" }}>
            FAQ
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mt-3">
            Pertanyaan yang
            <br />
            <span className="gradient-text">Sering Diajukan</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg" style={{ color: "var(--text-secondary)" }}>
            Kalau jawaban Anda tidak ada di sini, hubungi tim kami di {SITE.email}.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MessageCircleQuestion className="w-5 h-5" style={{ color: "var(--rizquna-green)" }} />
                {s.title}
              </h2>
              <div className="space-y-3">
                {s.qa.map((f) => (
                  <details key={f.q} className="group rounded-2xl p-5 cursor-pointer transition-all hover:shadow-md" style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)" }}>
                    <summary className="flex items-center justify-between gap-4 font-bold text-base list-none">
                      {f.q}
                      <span className="transition group-open:rotate-180" style={{ color: "var(--text-tertiary)" }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                      </span>
                    </summary>
                    <p className="mt-3 leading-relaxed text-sm" style={{ color: "var(--text-secondary)" }}>
                      {f.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold">Masih ada pertanyaan?</h3>
          <p className="mt-3" style={{ color: "var(--text-secondary)" }}>
            Tim kami siap bantu lewat email atau form kontak.
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
