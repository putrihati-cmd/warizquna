import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import ScanQrClient from "./ScanQrClient";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin WhatsApp | Rizquna" };

export default async function AdminPage() {
  const session = await getSession();
  if (!session) redirect("/login?redirect=/admin");
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#dcfce7_0,transparent_34%),linear-gradient(180deg,#f8fafc,#eefdf4)] text-slate-950">
      <header className="border-b border-emerald-100/80 bg-white/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/dashboard" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-emerald-600 font-black text-white shadow-lg shadow-emerald-200">R</span>
            <span>
              <span className="block text-sm font-black tracking-tight">Rizquna WA</span>
              <span className="block text-xs text-slate-500">Admin Device</span>
            </span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/dashboard" className="rounded-full px-4 py-2 text-slate-600 hover:bg-white hover:text-slate-950">Dashboard</Link>
            <Link href="/docs" className="hidden rounded-full px-4 py-2 text-slate-600 hover:bg-white hover:text-slate-950 sm:inline-flex">Docs API</Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1.1fr_.9fr] lg:px-8 lg:py-12">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-3 py-1 text-xs font-bold text-emerald-700 shadow-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" /> QR Pairing Center
          </div>
          <div>
            <h1 className="max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">Hubungkan WhatsApp dalam 3 langkah.</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">Buat device, tunggu QR muncul, lalu scan dari WhatsApp. Sistem otomatis polling QR dan mendeteksi status koneksi.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["1", "Buat device", "Klik tombol hijau."],
              ["2", "Scan QR", "WA → Perangkat tertaut."],
              ["3", "Connected", "Siap kirim pesan/API."],
            ].map(([n,t,d]) => (
              <div key={n} className="rounded-3xl border border-white/80 bg-white/70 p-5 shadow-sm backdrop-blur">
                <div className="mb-3 grid h-9 w-9 place-items-center rounded-2xl bg-emerald-600 text-sm font-black text-white">{n}</div>
                <div className="font-bold">{t}</div>
                <div className="mt-1 text-sm text-slate-500">{d}</div>
              </div>
            ))}
          </div>
          <div className="rounded-3xl border border-amber-200 bg-amber-50/80 p-5 text-sm text-amber-900">
            <b>Catatan produksi:</b> QR aktif terbatas. Jika expired, klik ulang tombol. Jangan bagikan QR/API key ke pihak lain.
          </div>
        </div>

        <ScanQrClient userName={session.name || session.email} />
      </section>
    </main>
  );
}
