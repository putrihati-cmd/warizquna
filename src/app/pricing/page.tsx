import Link from "next/link";
import { CheckCircle2, X, CreditCard, FileText, ArrowUpCircle, RefreshCcw } from "lucide-react";
import { SITE } from "@/lib/site";
import { PricingTabsPlans } from "@/components/pricing/PricingTabsPlans";
import { PLANS, FEATURE_GROUPS, type Plan } from "@/data/plans";

export const metadata = {
  title: "Harga",
  description: "Harga layanan Rizquna WhatsApp Gateway. Pilih paket yang sesuai dengan kebutuhan bisnis Anda.",
};

export default function PricingPage() {
  return (
    <>
      <section className="pt-16 pb-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Harga Transparan,
            <br />
            <span className="gradient-text">Tanpa Biaya Tersembunyi</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg" style={{ color: "var(--text-secondary)" }}>
            Semua paket termasuk free trial 30 hari tanpa kartu kredit. Diskon 20% untuk langganan
            tahunan.
          </p>
        </div>
      </section>

      <section className="pb-12">
        <PricingTabsPlans />
      </section>

      {/* Comparison table */}
      <section className="py-12" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">Perbandingan Fitur Lengkap</h2>
          <div className="overflow-x-auto rounded-2xl" style={{ border: "1px solid var(--border-light)", background: "var(--bg-card)" }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "var(--bg-surface)" }}>
                  <th className="text-left p-4 font-bold w-1/3">Fitur</th>
                  {PLANS.map((p) => (
                    <th key={p.name} className="p-4 font-bold text-center">
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FEATURE_GROUPS.map((g) => (
                  <FeatureGroup key={g.title} group={g} plans={PLANS} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Payment info */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">Informasi Pembayaran</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: CreditCard, t: "Metode Pembayaran", d: "Transfer Bank, Virtual Account, Kartu Kredit/Debit, dan QRIS melalui Midtrans." },
              { icon: FileText, t: "Invoice Otomatis", d: "Invoice dikirim otomatis via email setiap tanggal jatuh tempo." },
              { icon: ArrowUpCircle, t: "Upgrade Instan", d: "Upgrade paket berlaku langsung dengan perhitungan prorata." },
              { icon: RefreshCcw, t: "Refund Policy", d: "Langganan tahunan dapat dibatalkan dalam 14 hari pertama (full refund)." },
            ].map((it) => {
              const Icon = it.icon;
              return (
                <div key={it.t} className="rounded-2xl p-6 text-center" style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)" }}>
                  <div className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-3" style={{ background: "rgba(37,211,102,0.1)", color: "var(--rizquna-green)" }}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base">{it.t}</h3>
                  <p className="text-sm mt-2 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {it.d}
                  </p>
                </div>
              );
            })}
          </div>
          <p className="text-center text-sm mt-10" style={{ color: "var(--text-tertiary)" }}>
            Butuh bantuan memilih paket? <Link href="/contact" className="font-semibold" style={{ color: "var(--rizquna-green)" }}>Hubungi tim kami</Link> di {SITE.email}.
          </p>
        </div>
      </section>
    </>
  );
}

function FeatureGroup({ group, plans }: { group: { title: string; items: string[] }; plans: Plan[] }) {
  return (
    <>
      <tr>
        <td colSpan={plans.length + 1} className="p-3 text-xs font-bold uppercase tracking-widest" style={{ background: "var(--bg-secondary)", color: "var(--text-tertiary)" }}>
          {group.title}
        </td>
      </tr>
      {group.items.map((item) => (
        <tr key={item} className="border-t" style={{ borderColor: "var(--border-light)" }}>
          <td className="p-4" style={{ color: "var(--text-secondary)" }}>{item}</td>
          {plans.map((p) => (
            <td key={p.name} className="p-4 text-center">
              {p.features[item] ? (
                <CheckCircle2 className="w-5 h-5 mx-auto" style={{ color: "var(--rizquna-green)" }} />
              ) : (
                <X className="w-4 h-4 mx-auto" style={{ color: "var(--text-tertiary)" }} />
              )}
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
