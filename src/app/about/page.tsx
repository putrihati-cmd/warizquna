import type { Metadata } from "next";
import Link from "next/link";
import { Target, Heart, ShieldCheck, Globe, Zap, Users } from "lucide-react";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "Mengenal Rizquna — platform WhatsApp Business API resmi Meta untuk developer dan pebisnis Indonesia.",
};

const VALUES = [
  { icon: ShieldCheck, t: "Kepercayaan", d: "Kami menjaga keamanan & privasi data Anda dengan enkripsi standar enterprise." },
  { icon: Heart, t: "Customer-First", d: "Setiap fitur dirancang untuk menyelesaikan masalah nyata pelanggan kami." },
  { icon: Zap, t: "Kecepatan", d: "Iterasi cepat, deployment harian, dan response support yang sigap." },
  { icon: Globe, t: "Lokal", d: "Server di Indonesia, support bahasa Indonesia, billing Rupiah." },
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-16 pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--rizquna-green)" }}>
            Tentang Kami
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mt-3">
            Memberdayakan Bisnis
            <br />
            <span className="gradient-text">dengan WhatsApp API</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg" style={{ color: "var(--text-secondary)" }}>
            {SITE.brand} hadir untuk membuat akses ke WhatsApp Business API menjadi mudah, terjangkau,
            dan ramah developer — terutama untuk pasar Indonesia.
          </p>
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-6">
          <div className="p-7 rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)" }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(37,211,102,0.1)", color: "var(--rizquna-green)" }}>
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold mb-2">Misi</h2>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Menyediakan platform WhatsApp Business API yang stabil, aman, dan ramah developer dengan
              biaya yang terjangkau bagi UMKM hingga enterprise di Indonesia.
            </p>
          </div>
          <div className="p-7 rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)" }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(37,211,102,0.1)", color: "var(--rizquna-green)" }}>
              <Users className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold mb-2">Visi</h2>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Menjadi platform WhatsApp Business API #1 di Indonesia yang dipercaya oleh developer,
              UMKM, sekolah, instansi, dan korporasi untuk komunikasi pelanggan modern.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--rizquna-green)" }}>
              Nilai-nilai Kami
            </span>
            <h2 className="text-3xl font-extrabold mt-3">Yang Membentuk Rizquna</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.t} className="rounded-2xl p-6 text-center" style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)" }}>
                  <div className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-3" style={{ background: "rgba(37,211,102,0.1)", color: "var(--rizquna-green)" }}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base">{v.t}</h3>
                  <p className="text-sm mt-2 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {v.d}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold">Bergabung dengan komunitas Rizquna</h3>
          <p className="mt-3" style={{ color: "var(--text-secondary)" }}>
            Daftar gratis sekarang dan rasakan kemudahan WhatsApp Business API yang dirancang untuk Indonesia.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-white font-bold text-sm transition-all hover:-translate-y-1 shadow-lg mt-6"
            style={{ background: "var(--rizquna-green)" }}
          >
            Mulai Gratis
          </Link>
        </div>
      </section>
    </>
  );
}
