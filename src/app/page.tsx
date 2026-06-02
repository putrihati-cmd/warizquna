import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  MessageSquare,
  Inbox,
  Users,
  Smartphone,
  FileText,
  Sparkles,
  Repeat,
  Lock,
  Globe,
  Server,
  CheckCircle2,
  TrendingUp,
  Send,
} from "lucide-react";
import { SITE } from "@/lib/site";
import { JsonLd, faqLd } from "@/lib/schema";

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqLd(FAQS)} />
      <Hero />
      <TrustBar />
      <CustomerLogos />
      <Features />
      <HowItWorks />
      <WhyDifferent />
      <Integrations />
      <UseCases />
      <Pricing />
      <Faq />
      <CtaFinal />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 20% 10%, #25D36622, transparent 50%), radial-gradient(circle at 80% 30%, #128C7E22, transparent 50%)",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full"
            style={{ background: "rgba(37,211,102,0.1)", color: "var(--rizquna-green)" }}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Official Meta Cloud API Partner
          </span>
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            WhatsApp API Free
            <br />
            <span className="gradient-text">& Gateway Resmi Meta.</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Platform WhatsApp Business API yang dirancang khusus untuk Developer & Pebisnis. Akses
            fitur inti <strong>gratis selamanya</strong>, nikmati pengiriman pesan{" "}
            <strong>unlimited tanpa kuota</strong>, dan tingkatkan omset penjualan Anda.
          </p>

          <ul className="mt-6 space-y-2.5 text-sm" style={{ color: "var(--text-secondary)" }}>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: "var(--rizquna-green)" }} />
              <span><strong style={{ color: "var(--text-primary)" }}>Developer:</strong> REST API & Webhook siap pakai, dokumentasi super lengkap.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: "var(--rizquna-green)" }} />
              <span><strong style={{ color: "var(--text-primary)" }}>Pebisnis:</strong> Broadcast cerdas & auto-follow up untuk konversi maksimal.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: "var(--rizquna-green)" }} />
              <span><strong style={{ color: "var(--text-primary)" }}>AI Bot:</strong> Asisten AI pintar 24/7 otomatis merespon dan dilatih khusus.</span>
            </li>
          </ul>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-white font-bold text-sm transition-all hover:-translate-y-1 shadow-lg"
              style={{ background: "var(--rizquna-green)" }}
            >
              Daftar WhatsApp API Gratis
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all hover:-translate-y-1"
              style={{ color: "var(--text-primary)", border: "1px solid var(--border)" }}
            >
              Hubungi Sales
            </a>
          </div>
          <p className="mt-3 text-xs" style={{ color: "var(--text-tertiary)" }}>
            Gratis Selamanya + Trial Premium 30 Hari · Tanpa kartu kredit
          </p>
        </div>

        {/* Mock chat card */}
        <div className="relative">
          <div
            className="rounded-3xl shadow-2xl overflow-hidden"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)" }}
          >
            <div
              className="px-5 py-4 flex items-center gap-3"
              style={{ background: "var(--rizquna-green)", color: "#fff" }}
            >
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
                RA
              </div>
              <div>
                <p className="font-bold text-sm">Rizquna AI Assistant</p>
                <p className="text-[11px] opacity-80">Standby 24/7</p>
              </div>
            </div>
            <div className="p-5 space-y-3" style={{ background: "var(--bg-secondary)" }}>
              <ChatBubble side="left">Ada promo produk sepatu seri X hari ini?</ChatBubble>
              <ChatBubble side="right">
                Ada Kak! Sepatu seri X sedang diskon 20% khusus hari ini. Totalnya jadi Rp 400.000.
                Mau saya buatkan link pembayarannya? 👟
              </ChatBubble>
              <ChatBubble side="left">Boleh, bayar pakai QRIS ya.</ChatBubble>
              <ChatBubble side="right">
                Siap! Ini link QRIS-nya Kak. Pesanan akan otomatis diproses setelah pembayaran
                berhasil. 🚀
                <span className="block mt-2 px-3 py-2 rounded-lg bg-white/15 text-xs font-semibold">
                  Bayar Rp 400.000
                </span>
              </ChatBubble>
            </div>
            <div
              className="px-5 py-3 flex items-center gap-3"
              style={{ background: "var(--bg-card)" }}
            >
              <div
                className="flex-1 rounded-full h-9 px-4 flex items-center text-xs"
                style={{ background: "var(--bg-secondary)", color: "var(--text-tertiary)" }}
              >
                Ketik pesan balasan...
              </div>
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white shadow-sm" style={{ background: "var(--rizquna-green)" }}>
                <Send className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Floating code card */}
          <div
            className="hidden lg:block absolute z-30 -top-6 -right-8 w-[260px] rounded-xl p-4 shadow-2xl border animate-float"
            style={{ background: "#1E1E1E", borderColor: "#333", animationDelay: "0.5s" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              </div>
              <span className="text-[10px] text-gray-400 font-mono ml-2">api/send.ts</span>
            </div>
            <pre className="text-[10px] text-green-400 font-mono leading-relaxed overflow-hidden">
              <code>
                <span className="text-blue-400">POST</span> /api/v1/messages
                {`\n{\n  "to": "6281234567",\n  "type": "template",\n  "templateName": "promo",\n  "botActive": true\n}`}
              </code>
            </pre>
          </div>

          {/* Floating stat card */}
          <div
            className="hidden lg:block absolute z-30 bottom-6 -left-8 rounded-xl p-5 shadow-2xl border animate-float"
            style={{ background: "var(--bg-card)", borderColor: "var(--border-light)", animationDelay: "1.5s" }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "rgba(37,211,102,0.1)", color: "var(--rizquna-green)" }}
              >
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--text-tertiary)" }}>
                  Penjualan Hari Ini
                </p>
                <p className="font-extrabold text-2xl leading-none flex items-center gap-2 mt-1">
                  +150%
                  <span className="text-xs font-bold px-1.5 py-0.5 rounded" style={{ background: "rgba(37,211,102,0.1)", color: "var(--rizquna-green)" }}>
                    Naik
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChatBubble({ side, children }: { side: "left" | "right"; children: React.ReactNode }) {
  const isRight = side === "right";
  return (
    <div className={`flex ${isRight ? "justify-end" : "justify-start"}`}>
      <div
        className="max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm"
        style={
          isRight
            ? { background: "var(--rizquna-green)", color: "#fff", borderTopRightRadius: 4 }
            : { background: "var(--bg-card)", color: "var(--text-primary)", borderTopLeftRadius: 4 }
        }
      >
        {children}
      </div>
    </div>
  );
}

function TrustBar() {
  const items = [
    { icon: Lock, text: "Enkripsi AES-256" },
    { icon: Server, text: "99.9% SLA Uptime" },
    { icon: Globe, text: "Server Indonesia" },
    { icon: Sparkles, text: "Gratis Selamanya (Fitur Inti)" },
    { icon: ShieldCheck, text: "Meta Verified Partner" },
  ];
  return (
    <section className="py-10 border-y" style={{ borderColor: "var(--border-light)", background: "var(--bg-secondary)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <span key={it.text} className="inline-flex items-center gap-2">
                <Icon className="w-4 h-4" style={{ color: "var(--rizquna-green)" }} />
                {it.text}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const CUSTOMERS = [
  { name: "Sibermas UIN Saizu", color: "#1B5E20" },
  { name: "Keuangan Rizquna", color: "#0D47A1" },
  { name: "Invoice Rizquna", color: "#E65100" },
  { name: "RouterID", color: "#6A1B9A" },
  { name: "Otpgo", color: "#00838F" },
  { name: "Clipper Studio", color: "#C62828" },
  { name: "Audit Report", color: "#2E7D32" },
  { name: "9Router Cloud", color: "#283593" },
  { name: "Rumah Bahasa ID", color: "#AD1457" },
  { name: "Studi Ngaji", color: "#4527A0" },
  { name: "Zakat Lestari", color: "#1565C0" },
  { name: "Kopdar Dev", color: "#EF6C00" },
];

function CustomerLogos() {
  // duplicate for seamless marquee
  const items = [...CUSTOMERS, ...CUSTOMERS];
  return (
    <section className="py-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p
          className="text-center text-xs font-bold uppercase tracking-widest mb-7"
          style={{ color: "var(--text-tertiary)" }}
        >
          Dipercaya oleh berbagai organisasi di Indonesia
        </p>
        <div className="relative">
          <div
            className="absolute inset-y-0 left-0 w-16 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, var(--bg-primary), transparent)" }}
          />
          <div
            className="absolute inset-y-0 right-0 w-16 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, var(--bg-primary), transparent)" }}
          />
          <div className="marquee-track">
            {items.map((c, i) => (
              <div key={`${c.name}-${i}`} className="marquee-item-hover">
                <span
                  className="w-7 h-7 rounded-md flex items-center justify-center text-white text-[11px] font-extrabold shrink-0"
                  style={{ background: c.color }}
                >
                  {c.name
                    .split(" ")
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join("")}
                </span>
                <span className="text-sm font-semibold whitespace-nowrap">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const FEATURES = [
  { icon: Zap, title: "WhatsApp API Resmi Meta", desc: "Terhubung langsung ke Meta Cloud API resmi. Kirim dan terima pesan melalui API yang stabil dan aman." },
  { icon: Inbox, title: "Inbox Percakapan", desc: "Dashboard inbox untuk mengelola percakapan WhatsApp bisnis Anda." },
  { icon: Users, title: "Inbox Multi-Agent", desc: "Inbox terpusat multi-agent. Assign ke anggota tim, beri label, dan catatan internal." },
  { icon: Smartphone, title: "Multi User WhatsApp Web", desc: "Satu dashboard WhatsApp yang bisa digunakan bersamaan oleh banyak CS dari berbagai perangkat." },
  { icon: FileText, title: "Template Pesan Meta", desc: "Buat, edit, dan submit template pesan untuk review Meta langsung dari dashboard." },
  { icon: Sparkles, title: "Pesan Dinamis & Personal", desc: "Buat pesan dinamis dengan nama customer dan emoji agar terasa lebih personal." },
  { icon: Repeat, title: "Spintax Replacement", desc: "Manipulasi kata pada isi kalimat (word-by-word) untuk variasi otomatis." },
  { icon: MessageSquare, title: "Manajemen Kontak & CRM", desc: "Kelola database pelanggan dengan grup kontak dan atribut custom untuk segmentasi presisi." },
];

function Features() {
  return (
    <section id="features" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead eyebrow="Fitur Unggulan" title="Semua yang Anda Butuhkan untuk WhatsApp Business" subtitle="Dari pengiriman pesan otomatis hingga inbox terpusat — Rizquna menyediakan semua tools untuk mengoptimalkan komunikasi bisnis Anda." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-lg" style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)" }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(37,211,102,0.1)", color: "var(--rizquna-green)" }}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base mb-1.5">{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{f.desc}</p>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-10">
          <Link href="/features" className="inline-flex items-center gap-2 text-sm font-bold transition-colors" style={{ color: "var(--rizquna-green)" }}>
            Lihat semua fitur <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: 1, t: "Daftar Akun Rizquna", d: "Buat akun gratis di Rizquna. Tidak perlu kartu kredit — langsung dapat trial 30 hari." },
    { n: 2, t: "Hubungkan Nomor WhatsApp", d: "Buat System User di Meta Business Manager, lalu paste Access Token, Phone Number ID, dan WABA ID ke dashboard Rizquna." },
    { n: 3, t: "Mulai Kirim Pesan", d: "Gunakan dashboard untuk mengirim pesan, mengelola template, atau integrasikan REST API Rizquna ke sistem Anda." },
    { n: 4, t: "Monitor & Kelola", d: "Pantau statistik pengiriman, kelola inbox percakapan, dan optimalkan strategi komunikasi bisnis Anda." },
  ];
  return (
    <section id="how-it-works" className="py-20" style={{ background: "var(--bg-secondary)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead eyebrow="Cara Kerja" title="Mulai Dalam 4 Langkah Sederhana" subtitle="Tidak perlu pengalaman teknis. Ikuti langkah berikut dan mulai kirim pesan dalam hitungan menit." />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)" }}>
              <div className="w-10 h-10 rounded-full font-extrabold flex items-center justify-center text-white mb-4" style={{ background: "var(--rizquna-green)" }}>
                {s.n}
              </div>
              <h3 className="font-bold text-base mb-1.5">{s.t}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{s.d}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/how-it-works" className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: "var(--rizquna-green)" }}>
            Pelajari lebih detail <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function WhyDifferent() {
  const items = [
    { icon: Lock, t: "Privasi Terjaga", d: "Koneksi via System User Token — akun Facebook/Meta pribadi Anda TIDAK pernah terhubung ke Rizquna." },
    { icon: ShieldCheck, t: "API Resmi & Stabil", d: "Menggunakan Meta Cloud API resmi. Tidak ada risiko banned seperti API unofficial (Baileys/WA-Web)." },
    { icon: Sparkles, t: "Gratis Selamanya", d: "Akses fitur inti secara gratis selamanya. Pesan unlimited tanpa kuota. Free trial 30 hari untuk fitur premium." },
  ];
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead eyebrow="Kenapa Rizquna?" title="Berbeda dari Platform Lain" />
        <div className="grid md:grid-cols-3 gap-5">
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <div key={it.t} className="rounded-2xl p-7" style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(37,211,102,0.1)", color: "var(--rizquna-green)" }}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">{it.t}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{it.d}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const INTEGRATIONS = [
  { code: "Woo", name: "WooCommerce", tag: "E-Commerce", color: "#7F54B3" },
  { code: "CF7", name: "Contact Form 7", tag: "Form", color: "#21759B" },
  { code: "EF", name: "Elementor Form", tag: "Form", color: "#92003B" },
  { code: "WPF", name: "WPForms", tag: "Form", color: "#E27730" },
  { code: "GF", name: "Google Form", tag: "Form", color: "#673AB7" },
  { code: "Zap", name: "Zapier", tag: "Automasi", color: "#FF4A00" },
  { code: "GS", name: "Google Sheets", tag: "Spreadsheet", color: "#0F9D58" },
  { code: "GM", name: "Gmail", tag: "Email", color: "#EA4335" },
  { code: "API", name: "Webhook Kustom", tag: "Custom", color: "#0EA5E9" },
  { code: "OO", name: "OrderOnline.id", tag: "Lokal", color: "#FF6B00" },
  { code: "SJ", name: "Sejoli", tag: "Lokal", color: "#4A90D9" },
  { code: "KE", name: "KIRIM.EMAIL", tag: "Lokal", color: "#0066CC" },
  { code: "BD", name: "Berdu.id", tag: "Lokal", color: "#6C63FF" },
  { code: "MY", name: "Mayar.id", tag: "Lokal", color: "#00B4D8" },
  { code: "JB", name: "Jubelio", tag: "Lokal", color: "#FF3366" },
  { code: "LP", name: "LandingPress", tag: "Lokal", color: "#22C55E" },
];

function Integrations() {
  return (
    <section className="py-20" style={{ background: "var(--bg-secondary)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead eyebrow="15+ Integrasi Siap Pakai" title="Hubungkan Rizquna ke Platform Favorit Anda" subtitle="Dari toko online, form builder, email marketing, hingga spreadsheet — Rizquna siap terhubung otomatis. Kirim notifikasi WhatsApp tanpa coding, cukup beberapa klik saja." />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {INTEGRATIONS.map((it) => (
            <div key={it.name} className="group relative rounded-2xl p-5 transition-all hover:-translate-y-1 hover:shadow-xl overflow-hidden" style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)" }}>
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-3 font-extrabold text-sm shadow-sm transition-transform group-hover:scale-110" style={{ background: it.color, color: "#fff" }}>
                  {it.code}
                </div>
                <h4 className="font-bold text-sm mb-0.5">{it.name}</h4>
                <span className="mt-2 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ background: `${it.color}20`, color: it.color }}>
                  {it.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <p className="text-sm mb-5" style={{ color: "var(--text-secondary)" }}>
            Tidak menemukan platform Anda? Gunakan <strong>Webhook Kustom</strong> atau hubungi kami untuk integrasi khusus.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/register" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-sm transition-all hover:-translate-y-1 shadow-lg" style={{ background: "var(--rizquna-green)" }}>
              Coba Integrasi Gratis <ArrowRight className="w-4 h-4" />
            </Link>
            <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all hover:-translate-y-1" style={{ color: "var(--text-primary)", border: "1px solid var(--border)" }}>
              Lihat Dokumentasi API <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const USE_CASES = [
  {
    eyebrow: "Pebisnis & E-Commerce",
    title: "Notifikasi Pesanan Otomatis",
    items: [
      "Kirim konfirmasi order, update pengiriman, dan invoice via WhatsApp",
      "Broadcast promosi ke pelanggan dengan template yang disetujui Meta",
      "Tingkatkan repeat order dengan pesan follow-up otomatis",
    ],
  },
  {
    eyebrow: "Developer & Startup",
    title: "Integrasi API dalam Hitungan Menit",
    items: [
      "REST API sederhana dengan dokumentasi lengkap",
      "Webhook real-time untuk event pesan masuk dan status delivery",
      "Sandbox testing gratis selama masa trial 30 hari",
    ],
  },
  {
    eyebrow: "UMKM & Toko Online",
    title: "CS Profesional Tanpa Ribet",
    items: [
      "Inbox terpusat untuk melayani pelanggan dari satu dashboard",
      "Auto-responder menjawab FAQ pelanggan 24/7",
      "Gratis selamanya untuk fitur inti — sangat cocok untuk memulai usaha kecil",
    ],
  },
  {
    eyebrow: "Sekolah & Institusi",
    title: "Komunikasi Efektif dengan Orang Tua Siswa",
    items: [
      "Broadcast info pembayaran SPP, jadwal, dan pengumuman penting",
      "Template pesan untuk undangan rapat dan progress report siswa",
      "Multi-agent: guru dan admin sekolah bisa membalas dari dashboard yang sama",
    ],
  },
];

function UseCases() {
  return (
    <section id="use-cases" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead eyebrow="Use Cases" title="Cocok untuk Semua Jenis Bisnis" />
        <div className="grid md:grid-cols-2 gap-5">
          {USE_CASES.map((u) => (
            <div key={u.title} className="p-7 rounded-2xl h-full" style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)" }}>
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--rizquna-green)" }}>
                {u.eyebrow}
              </span>
              <h3 className="text-lg font-bold mt-2 mb-3">{u.title}</h3>
              <ul className="space-y-2 mt-4">
                {u.items.map((it) => (
                  <li key={it} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "var(--rizquna-green)" }} />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/use-cases" className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: "var(--rizquna-green)" }}>
            Lihat semua use cases <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    {
      name: "Free",
      desc: "Untuk personal & developer",
      price: "Gratis",
      cta: "Pilih Paket",
      href: "/register?planId=free",
      highlight: false,
      bullets: ["Unlimited pesan/bulan", "1 nomor WABA", "1 anggota tim", "1 API Key", "WhatsApp API Resmi Meta", "Inbox Percakapan", "Template Pesan Meta", "Webhook Real-time"],
    },
    {
      name: "Business",
      desc: "Untuk bisnis berkembang",
      price: "Rp 25K/bln",
      cta: "Pilih Paket",
      href: "/register?planId=business",
      highlight: true,
      bullets: ["Unlimited pesan/bulan", "3 nomor WABA", "10 anggota tim", "5 API Key", "Inbox Multi-Agent", "Broadcast Massal & Schedule", "Smart Auto Reply", "Analytics Lengkap"],
    },
    {
      name: "Professional",
      desc: "Untuk perusahaan menengah",
      price: "Rp 45K/bln",
      cta: "Pilih Paket",
      href: "/register?planId=professional",
      highlight: false,
      bullets: ["Unlimited pesan/bulan", "10 nomor WABA", "30 anggota tim", "15 API Key", "AI Smart Bot Action", "Anti WA Banned Filter", "Customer Ticketing System", "Export Laporan PDF/Excel"],
    },
  ];
  return (
    <section id="pricing" className="py-20" style={{ background: "var(--bg-secondary)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead eyebrow="Harga" title="Paket yang Sesuai Kebutuhan Anda" subtitle="Nikmati akses gratis selamanya untuk fitur inti dengan pesan unlimited tanpa kuota. Coba semua fitur premium gratis selama 30 hari!" />
        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-2xl p-7 transition-all ${p.highlight ? "shadow-2xl scale-[1.02]" : ""}`}
              style={{
                background: "var(--bg-card)",
                border: p.highlight ? "2px solid var(--rizquna-green)" : "1px solid var(--border-light)",
              }}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest text-white px-3 py-1 rounded-full" style={{ background: "var(--rizquna-green)" }}>
                  Paling Populer
                </span>
              )}
              <h3 className="text-xl font-bold">{p.name}</h3>
              <p className="text-sm mt-1" style={{ color: "var(--text-tertiary)" }}>{p.desc}</p>
              <p className="text-3xl font-extrabold mt-4">{p.price}</p>
              <ul className="space-y-2 mt-6 text-sm">
                {p.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2" style={{ color: "var(--text-secondary)" }}>
                    <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "var(--rizquna-green)" }} />
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
        <div className="text-center mt-10">
          <Link href="/pricing" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all hover:scale-105" style={{ background: "rgba(37,211,102,0.1)", color: "var(--rizquna-green)", border: "1px solid rgba(37,211,102,0.2)" }}>
            Bandingkan fitur lengkap <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  { q: "Apa itu Rizquna?", a: "Rizquna adalah platform SaaS yang menyediakan akses mudah ke WhatsApp Business API resmi dari Meta. Anda dapat mengirim dan menerima pesan WhatsApp, mengelola template, dan mengintegrasikan WhatsApp ke sistem bisnis Anda melalui REST API." },
  { q: "Apakah Rizquna menggunakan API resmi?", a: "Ya, 100%. Rizquna HANYA menggunakan Meta Cloud API resmi (Official WhatsApp Business Platform). Kami TIDAK menggunakan API unofficial seperti Baileys atau WA-Web yang berisiko banned." },
  { q: "Apakah saya perlu login Facebook untuk menggunakan Rizquna?", a: "Tidak. Rizquna menggunakan metode System User Access Token. Anda cukup membuat System User di Meta Business Manager dan paste token-nya ke Rizquna. Akun Facebook pribadi Anda tidak pernah terhubung ke Rizquna." },
  { q: "Berapa harga langganan Rizquna?", a: "Rizquna gratis selamanya untuk akses fitur inti. Anda bisa mencoba semua fitur premium (tanpa batasan) secara gratis selama 30 hari tanpa kartu kredit. Paket berlangganan tersedia mulai Rp 25.000/bulan." },
  { q: "Apa saja metode pembayaran yang didukung?", a: "Rizquna mendukung pembayaran via Transfer Bank, Virtual Account, Kartu Kredit/Debit, dan QRIS melalui payment gateway Midtrans." },
  { q: "Berapa batas pesan yang dapat dikirim?", a: "Tidak ada batasan! Semua paket (termasuk gratis) mendukung pengiriman pesan unlimited tanpa kuota per bulan, selama Anda mematuhi limit pengiriman tier API dari Meta." },
  { q: "Apakah data saya aman?", a: "Sangat aman. Token WABA dienkripsi AES-256-GCM, password di-hash bcrypt, dan API Key disimpan sebagai SHA-256 hash. Semua koneksi menggunakan TLS 1.3. Token plaintext tidak pernah disimpan atau di-log." },
  { q: "Bisakah saya menggunakan Rizquna untuk tim?", a: "Ya. Rizquna mendukung multi-user per workspace dengan role Owner, Admin, Member, dan Viewer. Tim Anda dapat mengakses inbox bersama dan meng-assign percakapan." },
];

function Faq() {
  return (
    <section id="faq" className="py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead eyebrow="FAQ" title="Pertanyaan yang Sering Diajukan" />
        <div className="space-y-3">
          {FAQS.map((f) => (
            <details key={f.q} className="group rounded-2xl p-5 cursor-pointer transition-all hover:shadow-md" style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)" }}>
              <summary className="flex items-center justify-between gap-4 font-bold text-base list-none">
                {f.q}
                <span className="transition group-open:rotate-180" style={{ color: "var(--text-tertiary)" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </span>
              </summary>
              <p className="mt-3 leading-relaxed text-sm" style={{ color: "var(--text-secondary)" }}>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaFinal() {
  return (
    <section className="py-20" style={{ background: "var(--bg-secondary)" }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--rizquna-green)" }}>
          Mulai Sekarang
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold mt-3 leading-tight">
          Siap Menggunakan
          <br />
          <span className="gradient-text">WhatsApp API Gratis?</span>
        </h2>
        <p className="mt-4 text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          Akses fitur inti gratis selamanya, pesan unlimited tanpa kuota. Coba free trial premium 30 hari tanpa kartu kredit hari ini juga!
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/register" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-white font-bold text-sm transition-all hover:-translate-y-1 shadow-lg" style={{ background: "var(--rizquna-green)" }}>
            Daftar WhatsApp API Gratis
          </Link>
          <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all hover:-translate-y-1" style={{ color: "var(--text-primary)", border: "1px solid var(--border)" }}>
            Hubungi Sales
          </a>
        </div>
        <p className="mt-3 text-xs" style={{ color: "var(--text-tertiary)" }}>
          Tidak perlu komitmen kartu kredit
        </p>
      </div>
    </section>
  );
}

function SectionHead({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-12">
      <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--rizquna-green)" }}>
        {eyebrow}
      </span>
      <h2 className="text-3xl sm:text-4xl font-extrabold mt-3 leading-tight">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
