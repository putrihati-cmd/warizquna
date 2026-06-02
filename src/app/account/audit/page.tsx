import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getSession } from "@/lib/auth";
import { listAuditLogs } from "@/lib/audit";

export const metadata: Metadata = {
  title: "Audit Log",
};

export const dynamic = "force-dynamic";

export default async function AuditPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  const logs = listAuditLogs(session.uid, 200);
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-sm font-semibold mb-4" style={{ color: "var(--rizquna-green)" }}>
        <ArrowLeft className="w-4 h-4" /> Kembali ke Dashboard
      </Link>
      <h1 className="text-3xl font-extrabold">Audit Log</h1>
      <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
        200 aktivitas terbaru di akun Anda.
      </p>

      <div
        className="mt-6 rounded-2xl overflow-x-auto"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)" }}
      >
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: "var(--bg-surface)" }}>
              <th className="text-left p-3 font-bold">Waktu</th>
              <th className="text-left p-3 font-bold">Action</th>
              <th className="text-left p-3 font-bold">Target</th>
              <th className="text-left p-3 font-bold">Status</th>
              <th className="text-left p-3 font-bold">Detail</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 && (
              <tr>
                <td className="p-4 text-center" colSpan={5} style={{ color: "var(--text-tertiary)" }}>
                  Belum ada aktivitas
                </td>
              </tr>
            )}
            {logs.map((l) => (
              <tr key={l.id} style={{ borderTop: "1px solid var(--border-light)" }}>
                <td className="p-3 whitespace-nowrap font-mono text-xs" style={{ color: "var(--text-tertiary)" }}>
                  {new Date(l.created_at + "Z").toLocaleString("id-ID")}
                </td>
                <td className="p-3 font-semibold">{l.action}</td>
                <td className="p-3 font-mono text-xs">{l.target ?? "—"}</td>
                <td className="p-3">
                  <span
                    className="inline-block text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                    style={
                      l.status === "ok"
                        ? { background: "rgba(37,211,102,0.15)", color: "var(--rizquna-green)" }
                        : { background: "rgba(239,68,68,0.15)", color: "#EF4444" }
                    }
                  >
                    {l.status}
                  </span>
                </td>
                <td className="p-3 text-xs" style={{ color: "var(--text-secondary)" }}>
                  {l.message ?? "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}