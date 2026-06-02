import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FEATURES } from "@/data/landing";
import { SectionHead } from "@/components/SectionHead";
import { Lock, ShieldCheck, Sparkles } from "lucide-react";

export function FeaturesSection() {
  return (
    <>
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead
            eyebrow="Fitur Unggulan"
            title="Semua yang Anda Butuhkan untuk WhatsApp Business"
            subtitle="Dari pengiriman pesan otomatis hingga inbox terpusat — Rizquna menyediakan semua tools untuk mengoptimalkan komunikasi bisnis Anda."
          />
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
    <section id="how-it-works" className="py-20" style={{ background: "var(--bg-secondary)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead
          eyebrow="Cara Kerja"
          title="Mulai Dalam 4 Langkah Sederhana"
          subtitle="Tidak perlu pengalaman teknis. Ikuti langkah berikut dan mulai kirim pesan dalam hitungan menit."
        />
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
