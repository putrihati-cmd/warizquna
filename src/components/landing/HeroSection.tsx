import Link from "next/link";
import { ArrowRight, ShieldCheck, Lock, Server, Globe, Sparkles } from "lucide-react";
import { SITE } from "@/lib/site";

export function HeroSection() {
  return (
    <>
      <section className="relative overflow-hidden pt-24 pb-20 border-b" style={{ background: "var(--bg-primary)", borderColor: "var(--border-light)" }}>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <span
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border"
            style={{ background: "var(--bg-secondary)", borderColor: "var(--border)", color: "var(--text-secondary)" }}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            WhatsApp API Gateway & Tooling
          </span>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]" style={{ color: "var(--text-primary)" }}>
            WhatsApp API Gateway &
            <br />
            <span className="text-gray-400">Wrapper Mandiri.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-base sm:text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Platform WhatsApp Business API yang dirancang khusus untuk Developer & Pebisnis Indonesia. Akses
            fitur inti <strong>gratis selamanya</strong>, hubungkan nomor Anda dengan mudah, dan tingkatkan konversi penjualan Anda.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-colors hover:opacity-90 shadow-sm"
              style={{ background: "var(--text-primary)", color: "var(--bg-primary)" }}
            >
              Daftar WhatsApp API Gratis
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm border hover:bg-slate-50 transition-colors"
              style={{ color: "var(--text-secondary)", borderColor: "var(--border)" }}
            >
              Hubungi Sales
            </a>
          </div>

          <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
            Gratis Selamanya + Trial Premium 30 Hari · Tanpa kartu kredit
          </p>


        </div>
      </section>

      <TrustBar />
    </>
  );
}

function TrustBar() {
  const items = [
    { icon: Lock, text: "Enkripsi AES-256" },
    { icon: Server, text: "Koneksi Cepat & Stabil" },
    { icon: Globe, text: "Server Indonesia" },
    { icon: Sparkles, text: "Gratis Selamanya (Fitur Inti)" },
    { icon: ShieldCheck, text: "Integrasi Mudah & Cepat" },
  ];
  return (
    <section className="py-10 border-y" style={{ borderColor: "var(--border-light)", background: "var(--bg-secondary)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <span key={it.text} className="inline-flex items-center gap-2">
                <Icon className="w-4 h-4" style={{ color: "var(--text-primary)" }} />
                {it.text}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
