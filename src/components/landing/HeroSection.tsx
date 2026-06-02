import Link from "next/link";
import { ArrowRight, ShieldCheck, Send, Lock, Server, Globe, Sparkles } from "lucide-react";
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

          {/* Redesigned Mock Chat Card */}
          <div className="max-w-2xl mx-auto pt-8">
            <div
              className="rounded-2xl border text-left overflow-hidden shadow-sm"
              style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
            >
              <div
                className="px-6 py-4 flex items-center justify-between border-b"
                style={{ borderColor: "var(--border-light)" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm border" style={{ background: "var(--bg-secondary)", borderColor: "var(--border)" }}>
                    TO
                  </div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>Bot Toko Online (via Webhook)</p>
                    <p className="text-[10px]" style={{ color: "var(--text-tertiary)" }}>Simulator Otomasi API</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border" style={{ background: "var(--bg-secondary)", borderColor: "var(--border)" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live API
                </div>
              </div>
              <div className="p-6 space-y-4" style={{ background: "var(--bg-secondary)" }}>
                <ChatBubble side="left">Ada promo produk sepatu seri X hari ini?</ChatBubble>
                <ChatBubble side="right">
                  Ada Kak! Sepatu seri X sedang diskon 20% khusus hari ini. Totalnya jadi Rp 400.000.
                  Mau saya buatkan link pembayarannya? 👟
                </ChatBubble>
                <ChatBubble side="left">Boleh, bayar pakai QRIS ya.</ChatBubble>
                <ChatBubble side="right">
                  Siap! Ini link QRIS-nya Kak. Pesanan akan otomatis diproses setelah pembayaran
                  berhasil. 🚀
                  <span className="block mt-2 px-3 py-2 rounded-lg text-xs font-semibold border text-center cursor-pointer hover:bg-slate-50 transition-colors" style={{ background: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-primary)" }}>
                    Bayar Rp 400.000 (QRIS)
                  </span>
                </ChatBubble>
              </div>
              <div
                className="px-6 py-4 flex items-center gap-3 border-t"
                style={{ background: "var(--bg-card)", borderColor: "var(--border-light)" }}
              >
                <div
                  className="flex-1 rounded-lg h-10 px-4 flex items-center text-xs border"
                  style={{ background: "var(--bg-secondary)", color: "var(--text-tertiary)", borderColor: "var(--border)" }}
                >
                  Ketik pesan balasan...
                </div>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer hover:opacity-90 shadow-sm" style={{ background: "var(--text-primary)", color: "var(--bg-primary)" }}>
                  <Send className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustBar />
    </>
  );
}

function ChatBubble({ side, children }: { side: "left" | "right"; children: React.ReactNode }) {
  const isRight = side === "right";
  return (
    <div className={`flex ${isRight ? "justify-end" : "justify-start"}`}>
      <div
        className="max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed border shadow-sm"
        style={
          isRight
            ? { background: "var(--bg-card)", color: "var(--text-primary)", borderColor: "var(--border)", borderTopRightRadius: 4 }
            : { background: "var(--bg-primary)", color: "var(--text-primary)", borderColor: "var(--border)", borderTopLeftRadius: 4 }
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
