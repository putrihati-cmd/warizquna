import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
export const dynamic = "force-dynamic";
export const metadata = { title: "OTP Dashboard | Rizquna" };
export default async function OtpDashboard(){
 const s=await getSession(); if(!s) redirect("/login?redirect=/dashboard/otp");
 return <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-950"><section className="mx-auto max-w-5xl space-y-6"><div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200"><p className="text-sm font-bold text-emerald-700">Rizquna Messaging</p><h1 className="mt-2 text-4xl font-black">OTP Center</h1><p className="mt-3 max-w-2xl text-slate-600">OTP sudah tersedia di project WA sebagai unified API. API OTP sudah masuk domain WA. Console legacy dibungkus dalam unified shell sementara DB/auth dimigrasi penuh.</p><div className="mt-6 flex flex-wrap gap-3"><a href="/dashboard/otp/legacy" className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-black text-white">Buka Console OTP</a><Link href="/docs/otp" className="rounded-2xl bg-slate-100 px-5 py-3 text-sm font-black text-slate-700">Docs OTP API</Link><Link href="/dashboard" className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-700 ring-1 ring-slate-200">Dashboard WA</Link></div></div><div className="grid gap-4 md:grid-cols-3">{[["Send","POST /api/otp/send"],["Verify","POST /api/otp/verify"],["Status","GET /api/otp/status/:id"]].map(([a,b])=><div key={a} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200"><div className="font-black">{a}</div><code className="mt-3 block rounded-xl bg-slate-950 p-3 text-xs text-emerald-300">{b}</code></div>)}</div></section></main>;
}
