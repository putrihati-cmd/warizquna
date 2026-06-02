import { LANDING_FAQS } from "@/data/faqs";
import { SectionHead } from "@/components/SectionHead";

export function FAQSection() {
  return (
    <section id="faq" className="py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead eyebrow="FAQ" title="Pertanyaan yang Sering Diajukan" />
        <div className="space-y-3">
          {LANDING_FAQS.map((f) => (
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
