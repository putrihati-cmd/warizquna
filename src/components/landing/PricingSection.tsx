import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SectionHead } from "@/components/SectionHead";
import { SITE } from "@/lib/site";

export function PricingSection() {
  const plans = [
    {
      name: "Free",
      desc: "Untuk personal & developer",
      price: "Gratis",
      cta: "Pilih Paket",
      href: "/register?planId=free",
      highlight: false,
      bullets: ["Pesan unlimited", "1 nomor WhatsApp", "1 anggota tim", "1 API Key", "WhatsApp API Gateway", "Inbox Percakapan", "Template Pesan Custom", "Webhook Real-time"],
    },
    {
      name: "Business",
      desc: "Untuk bisnis berkembang",
      price: "Rp 25K/bln",
      cta: "Pilih Paket",
      href: "/register?planId=business",
      highlight: true,
      bullets: ["Pesan unlimited", "3 nomor WhatsApp", "10 anggota tim", "5 API Key", "Inbox Multi-Agent", "Broadcast Massal & Schedule", "Smart Auto Reply", "Analytics Lengkap"],
    },
    {
      name: "Professional",
      desc: "Untuk perusahaan menengah",
      price: "Rp 45K/bln",
      cta: "Pilih Paket",
      href: "/register?planId=professional",
      highlight: false,
      bullets: ["Pesan unlimited", "10 nomor WhatsApp", "30 anggota tim", "15 API Key", "AI Smart Bot Action", "Pengaturan Delay Kirim", "Customer Ticketing System", "Export Laporan PDF/Excel"],
    },
  ];

  return (
    <>
      <section id="pricing" className="py-20" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead
            eyebrow="Harga"
            title="Paket yang Sesuai Kebutuhan Anda"
            subtitle="Nikmati akses gratis selamanya untuk fitur inti dengan pesan unlimited tanpa kuota. Coba semua fitur premium gratis selama 30 hari!"
          />
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

      <CtaFinal />
    </>
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
