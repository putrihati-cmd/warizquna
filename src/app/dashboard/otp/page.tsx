import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const metadata = { title: "OTP Dashboard | Rizquna" };

export default async function OtpDashboard() {
  const session = await getSession();
  if (!session) {
    redirect("/login?redirect=/dashboard/otp");
  }

  const routes = [
    { title: "Send", method: "POST /api/otp/send" },
    { title: "Verify", method: "POST /api/otp/verify" },
    { title: "Status", method: "GET /api/otp/status/:id" },
  ];

  return (
    <main
      className="min-h-screen px-4 py-10"
      style={{ background: "var(--bg-secondary)", color: "var(--text-primary)" }}
    >
      <section className="mx-auto max-w-5xl space-y-6 animate-fade-in">
        <div
          className="rounded-3xl p-8 shadow-sm"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)" }}
        >
          <p className="text-sm font-bold" style={{ color: "var(--rizquna-green)" }}>
            Rizquna Messaging
          </p>
          <h1 className="mt-2 text-4xl font-black">OTP Center</h1>
          <p className="mt-3 max-w-2xl text-sm" style={{ color: "var(--text-secondary)" }}>
            OTP sudah tersedia di project WA sebagai unified API. API OTP sudah masuk domain WA. Console
            legacy dibungkus dalam unified shell sementara DB/auth dimigrasi penuh.
          </p>
          
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/dashboard/otp/legacy"
              className="rounded-2xl px-5 py-3 text-sm font-black text-white hover:opacity-95 transition-opacity"
              style={{ background: "var(--rizquna-green)" }}
            >
              Buka Console OTP
            </a>
            <Link
              href="/docs/otp"
              className="rounded-2xl px-5 py-3 text-sm font-black transition-colors"
              style={{ background: "var(--bg-surface)", color: "var(--text-secondary)" }}
            >
              Docs OTP API
            </Link>
            <Link
              href="/dashboard"
              className="rounded-2xl px-5 py-3 text-sm font-black transition-colors"
              style={{
                background: "var(--bg-card)",
                color: "var(--text-secondary)",
                border: "1px solid var(--border-light)",
              }}
            >
              Dashboard WA
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {routes.map((r) => (
            <div
              key={r.title}
              className="rounded-3xl p-6 shadow-sm"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)" }}
            >
              <div className="font-black text-lg">{r.title}</div>
              <code
                className="mt-3 block rounded-xl p-3 text-xs overflow-x-auto font-mono"
                style={{ background: "var(--bg-secondary)", color: "var(--rizquna-green)" }}
              >
                {r.method}
              </code>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
