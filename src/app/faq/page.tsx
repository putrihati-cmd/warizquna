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

import { FAQ_SECTIONS } from "@/data/faqs";

export default function FaqPage() {
  const allQa = FAQ_SECTIONS.flatMap((s) => s.qa);
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
          {FAQ_SECTIONS.map((s) => (
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
