import Link from "next/link";
import { ArrowRight, ShieldCheck, CheckCircle2, Send, TrendingUp, Lock, Server, Globe, Sparkles } from "lucide-react";
import { SITE } from "@/lib/site";
import { CUSTOMERS } from "@/data/landing";

export function HeroSection() {
  return (
    <>
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

      <TrustBar />
      <CustomerLogos />
    </>
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

function CustomerLogos() {
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
