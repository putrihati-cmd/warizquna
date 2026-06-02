import Link from "next/link";
import { ArrowRight, Lock, ShieldCheck, Sparkles } from "lucide-react";
import { FEATURES } from "@/data/landing";
import { SectionHead } from "@/components/SectionHead";

export function FeaturesSection() {
  return (
    <>
      <section id="features" className="py-20 border-b animate-fade-in" style={{ borderColor: "var(--border-light)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead
            eyebrow="Fitur Unggulan"
            title="Semua yang Anda Butuhkan untuk WhatsApp Business"
            subtitle="Dari pengiriman pesan otomatis hingga inbox terpusat — Rizquna menyediakan semua tools untuk mengoptimalkan komunikasi bisnis Anda."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-l" style={{ borderColor: "var(--border)" }}>
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="p-8 border-r border-b transition-colors hover:bg-slate-50/50" style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-5 border" style={{ background: "var(--bg-secondary)", borderColor: "var(--border)", color: "var(--text-primary)" }}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-base mb-2">{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{f.desc}</p>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-10">
            <Link href="/features" className="inline-flex items-center gap-2 text-sm font-bold transition-colors hover:opacity-85" style={{ color: "var(--text-primary)" }}>
              Lihat semua fitur <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <HowItWorks />
      <WhyDifferent />
    </>
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
    <section id="how-it-works" className="py-20 border-b" style={{ background: "var(--bg-secondary)", borderColor: "var(--border-light)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead
          eyebrow="Cara Kerja"
          title="Mulai Dalam 4 Langkah Sederhana"
          subtitle="Tidak perlu pengalaman teknis. Ikuti langkah berikut dan mulai kirim pesan dalam hitungan menit."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 border-t border-l" style={{ borderColor: "var(--border)" }}>
          {steps.map((s) => (
            <div key={s.n} className="p-8 border-r border-b relative" style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}>
              <span className="absolute top-6 right-6 font-mono text-3xl font-extrabold opacity-20" style={{ color: "var(--text-tertiary)" }}>
                0{s.n}
              </span>
              <h3 className="font-bold text-base mb-3 mt-4">{s.t}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{s.d}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/how-it-works" className="inline-flex items-center gap-2 text-sm font-bold hover:opacity-85" style={{ color: "var(--text-primary)" }}>
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
    <section className="py-20 border-b" style={{ borderColor: "var(--border-light)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead eyebrow="Kenapa Rizquna?" title="Berbeda dari Platform Lain" />
        <div className="grid md:grid-cols-3 border-t border-l" style={{ borderColor: "var(--border)" }}>
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <div key={it.t} className="p-8 border-r border-b" style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-5 border" style={{ background: "var(--bg-secondary)", borderColor: "var(--border)", color: "var(--text-primary)" }}>
                  <Icon className="w-5 h-5" />
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
