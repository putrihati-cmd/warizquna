import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { INTEGRATIONS, USE_CASES } from "@/data/landing";
import { SectionHead } from "@/components/SectionHead";
import { SITE } from "@/lib/site";

export function IntegrationsSection() {
  return (
    <>
      <section className="py-20" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead
            eyebrow="15+ Integrasi Siap Pakai"
            title="Hubungkan Rizquna ke Platform Favorit Anda"
            subtitle="Dari toko online, form builder, email marketing, hingga spreadsheet — Rizquna siap terhubung otomatis. Kirim notifikasi WhatsApp tanpa coding, cukup beberapa klik saja."
          />
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

      <UseCases />
    </>
  );
}

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
