import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, Key, Send, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "OTP API Docs | Rizquna",
  description: "Dokumentasi API verifikasi OTP berbasis WhatsApp dari Rizquna.",
};

export default function OtpDocsPage() {
  return (
    <>
      <section className="pt-16 pb-12 animate-fade-in">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/dashboard/otp"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest mb-3 hover:underline"
            style={{ color: "var(--rizquna-green)" }}
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke OTP Dashboard
          </Link>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            OTP <span className="gradient-text">API Docs</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg" style={{ color: "var(--text-secondary)" }}>
            Unified OTP verification endpoint via <code>wa.rizquna.id</code>.
          </p>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-14">
        <DocSection id="authentication" title="Authentication">
          <p>
            Semua request ke API OTP harus menyertakan token API Key OTP Anda di header Authorization.
          </p>
          <pre
            className="rounded-xl p-4 text-xs overflow-x-auto font-mono"
            style={{ background: "var(--bg-secondary)", color: "var(--rizquna-green)" }}
          >
            {"Authorization: Bearer <OTP_API_KEY>"}
          </pre>
        </DocSection>

        <DocSection id="send" title="Send OTP">
          <p>Kirim kode OTP ke nomor WhatsApp tujuan.</p>
          <pre
            className="rounded-xl p-4 text-xs overflow-x-auto font-mono"
            style={{ background: "var(--bg-secondary)", color: "var(--rizquna-green)" }}
          >
            {`POST /api/otp/send
Content-Type: application/json

{
  "phone": "62812xxxx",
  "channel": "whatsapp"
}`}
          </pre>
        </DocSection>

        <DocSection id="verify" title="Verify OTP">
          <p>Verifikasi kode OTP yang dimasukkan oleh pengguna.</p>
          <pre
            className="rounded-xl p-4 text-xs overflow-x-auto font-mono"
            style={{ background: "var(--bg-secondary)", color: "var(--rizquna-green)" }}
          >
            {`POST /api/otp/verify
Content-Type: application/json

{
  "request_id": "...",
  "code": "123456"
}`}
          </pre>
        </DocSection>

        <DocSection id="status" title="Check Status">
          <p>Cek status pengiriman atau verifikasi request OTP.</p>
          <pre
            className="rounded-xl p-4 text-xs overflow-x-auto font-mono"
            style={{ background: "var(--bg-secondary)", color: "var(--rizquna-green)" }}
          >
            {`GET /api/otp/status/:requestId`}
          </pre>
        </DocSection>
      </article>
    </>
  );
}

function DocSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">{title}</h2>
      <div
        className="text-sm leading-relaxed space-y-4 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:bg-[var(--bg-surface)] [&_code]:font-mono [&_code]:text-[13px]"
        style={{ color: "var(--text-secondary)" }}
      >
        {children}
      </div>
    </section>
  );
}
