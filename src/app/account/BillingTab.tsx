"use client";

import { useState } from "react";
import { CreditCard, CheckCircle2, AlertCircle, Calendar, ArrowUpRight, HelpCircle } from "lucide-react";
import { PLAN_LIMITS } from "@/data/plans";

type Transaction = {
  id: string;
  user_id: number;
  amount: number;
  plan: string;
  status: string;
  payment_type: string | null;
  created_at: string;
  updated_at: string;
};

export default function BillingTab({
  transactions: initialTransactions,
  currentPlan,
}: {
  transactions: Transaction[];
  currentPlan: string;
}) {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [txs, setTxs] = useState<Transaction[]>(initialTransactions);

  const plan = currentPlan.toLowerCase();
  const limits = (PLAN_LIMITS as any)[plan] || PLAN_LIMITS.free;

  async function handleUpgrade(targetPlan: "starter" | "growth") {
    setError(null);
    setLoadingPlan(targetPlan);
    try {
      const res = await fetch("/api/payment/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: targetPlan }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Gagal membuat checkout session");
      }
      if (data.redirect_url) {
        // Redirect to Midtrans snap payment screen
        window.location.href = data.redirect_url;
      } else {
        throw new Error("Midtrans redirect URL tidak ditemukan");
      }
    } catch (err: any) {
      setError(err.message || "Gagal memproses pembayaran");
      setLoadingPlan(null);
    }
  }

  const plansList = [
    {
      key: "free",
      name: "Free",
      price: "Rp0",
      desc: "Mulai kirim pesan WhatsApp tanpa biaya.",
      features: ["1 nomor WhatsApp", "100 pesan/bulan", "Watermark pada pesan", "Tanpa webhook masuk"],
    },
    {
      key: "starter",
      name: "Starter",
      price: "Rp99rb/bln",
      desc: "Cocok untuk UMKM dan toko online kecil.",
      features: ["1 nomor WhatsApp", "5.000 pesan/bulan", "Bebas watermark", "1 webhook aktif"],
    },
    {
      key: "growth",
      name: "Growth",
      price: "Rp249rb/bln",
      desc: "Pilihan terpopuler untuk bisnis berkembang.",
      features: ["3 nomor WhatsApp", "25.000 pesan/bulan", "Bebas watermark", "5 webhook aktif"],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Current plan card */}
      <div
        className="rounded-2xl p-6 border"
        style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "rgba(37,211,102,0.1)", color: "var(--rizquna-green)" }}
            >
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-tertiary)" }}>
                Paket Langganan Aktif
              </p>
              <h2 className="text-2xl font-black mt-0.5 capitalize">{plan} Plan</h2>
            </div>
          </div>
          <span
            className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full text-white"
            style={{ background: "var(--rizquna-green)" }}
          >
            Aktif
          </span>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mt-6 pt-6 border-t" style={{ borderColor: "var(--border-light)" }}>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-tertiary)" }}>
              Batas Webhook Masuk
            </p>
            <p className="text-xl font-bold mt-1">
              {limits.maxWebhooks === 0 ? "Disabled" : `${limits.maxWebhooks} Webhook`}
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-tertiary)" }}>
              Kuota Pesan Bulanan
            </p>
            <p className="text-xl font-bold mt-1">
              {limits.maxMessagesPerMonth === Infinity ? "Tak Terbatas" : `${limits.maxMessagesPerMonth.toLocaleString("id-ID")} Pesan`}
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div
          className="flex items-center gap-2 p-3 rounded-xl text-sm font-semibold border"
          style={{ background: "rgba(239, 68, 68, 0.1)", color: "#EF4444", borderColor: "rgba(239, 68, 68, 0.2)" }}
        >
          <AlertCircle className="w-4.5 h-4.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Upgrade options */}
      <div>
        <h3 className="text-lg font-bold mb-3">Tingkatkan Paket Anda</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {plansList.map((p) => {
            const isCurrent = p.key === plan;
            const isPaid = p.key !== "free";
            const canUpgrade = !isCurrent && (plan === "free" || (plan === "starter" && p.key === "growth"));

            return (
              <div
                key={p.key}
                className="rounded-2xl p-5 border flex flex-col justify-between"
                style={{
                  background: "var(--bg-card)",
                  borderColor: isCurrent ? "var(--rizquna-green)" : "var(--border)",
                  borderWidth: isCurrent ? "2px" : "1px",
                }}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-base">{p.name}</h4>
                    {isCurrent && (
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        Aktif
                      </span>
                    )}
                  </div>
                  <p className="text-sm mt-1 leading-relaxed" style={{ color: "var(--text-tertiary)" }}>
                    {p.desc}
                  </p>
                  <p className="text-2xl font-extrabold mt-3">{p.price}</p>
                  <ul className="mt-4 space-y-2 text-xs" style={{ color: "var(--text-secondary)" }}>
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {isPaid && canUpgrade && (
                  <button
                    onClick={() => handleUpgrade(p.key as any)}
                    disabled={loadingPlan !== null}
                    className="w-full mt-5 py-2.5 rounded-xl font-bold text-xs text-white shadow hover:-translate-y-0.5 transition-all flex items-center justify-center gap-1"
                    style={{ background: "var(--rizquna-green)" }}
                  >
                    {loadingPlan === p.key ? (
                      "Memproses..."
                    ) : (
                      <>
                        Upgrade Sekarang
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                )}

                {isCurrent && (
                  <div className="w-full mt-5 py-2 px-3 rounded-lg border text-center text-[11px] font-semibold" style={{ borderColor: "var(--border-light)", color: "var(--text-tertiary)" }}>
                    Paket aktif Anda saat ini
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Transaction History */}
      <div>
        <h3 className="text-lg font-bold mb-3">Riwayat Transaksi</h3>
        <div
          className="overflow-hidden rounded-2xl border"
          style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
        >
          {txs.length === 0 ? (
            <div className="p-8 text-center" style={{ color: "var(--text-tertiary)" }}>
              <Calendar className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm">Belum ada transaksi pembayaran yang tercatat.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border)" }}>
                    <th className="p-3 font-semibold text-xs uppercase tracking-widest text-[var(--text-tertiary)]">ID Pesanan</th>
                    <th className="p-3 font-semibold text-xs uppercase tracking-widest text-[var(--text-tertiary)]">Plan</th>
                    <th className="p-3 font-semibold text-xs uppercase tracking-widest text-[var(--text-tertiary)]">Jumlah</th>
                    <th className="p-3 font-semibold text-xs uppercase tracking-widest text-[var(--text-tertiary)]">Status</th>
                    <th className="p-3 font-semibold text-xs uppercase tracking-widest text-[var(--text-tertiary)]">Metode</th>
                    <th className="p-3 font-semibold text-xs uppercase tracking-widest text-[var(--text-tertiary)]">Tanggal</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: "var(--border-light)" }}>
                  {txs.map((tx) => {
                    let badgeColor = "#EAB308"; // pending
                    let badgeBg = "rgba(234, 179, 8, 0.1)";
                    let statusLabel = "Menunggu";

                    if (tx.status === "settlement") {
                      badgeColor = "var(--rizquna-green)";
                      badgeBg = "rgba(37, 211, 102, 0.1)";
                      statusLabel = "Sukses";
                    } else if (["cancel", "deny", "expire"].includes(tx.status)) {
                      badgeColor = "#EF4444";
                      badgeBg = "rgba(239, 68, 68, 0.1)";
                      statusLabel = "Gagal / Batal";
                    }

                    return (
                      <tr key={tx.id}>
                        <td className="p-3 font-mono text-xs">{tx.id}</td>
                        <td className="p-3 font-semibold capitalize">{tx.plan}</td>
                        <td className="p-3 font-semibold">Rp{(tx.amount).toLocaleString("id-ID")}</td>
                        <td className="p-3">
                          <span
                            className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider"
                            style={{ color: badgeColor, background: badgeBg }}
                          >
                            {statusLabel}
                          </span>
                        </td>
                        <td className="p-3 text-xs capitalize" style={{ color: "var(--text-secondary)" }}>
                          {tx.payment_type || "-"}
                        </td>
                        <td className="p-3 text-xs" style={{ color: "var(--text-secondary)" }}>
                          {new Date(tx.created_at).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
