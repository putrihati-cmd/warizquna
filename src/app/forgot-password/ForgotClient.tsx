"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail } from "lucide-react";

export default function ForgotClient() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [debugUrl, setDebugUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { ok?: boolean; resetUrl?: string; error?: string };
      if (!res.ok) {
        setError(data.error || "Permintaan gagal");
      } else {
        setDone(true);
        if (data.resetUrl) setDebugUrl(data.resetUrl);
      }
    } catch {
      setError("Tidak dapat terhubung ke server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-20 animate-fade-in">
      <div className="text-center mb-8">
        <Mail className="w-10 h-10 mx-auto" style={{ color: "var(--rizquna-green)" }} />
        <h1 className="text-3xl sm:text-4xl font-extrabold mt-3">
          Lupa <span className="gradient-text">Kata Sandi</span>
        </h1>
        <p className="mt-3 text-sm" style={{ color: "var(--text-secondary)" }}>
          Masukkan email Anda. Kami akan mengirim tautan reset jika email terdaftar.
        </p>
      </div>

      {done ? (
        <div
          className="rounded-2xl p-6 text-center"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)" }}
        >
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Jika email Anda terdaftar, tautan reset sudah dikirim. Cek inbox dan folder spam.
          </p>
          {debugUrl && (
            <p className="text-xs mt-3 break-all" style={{ color: "var(--text-tertiary)" }}>
              <strong>Dev:</strong>{" "}
              <a href={debugUrl} className="underline">{debugUrl}</a>
            </p>
          )}
          <Link
            href="/login"
            className="inline-block mt-5 text-sm font-semibold"
            style={{ color: "var(--rizquna-green)" }}
          >
            Kembali ke login
          </Link>
        </div>
      ) : (
        <form
          onSubmit={submit}
          className="rounded-2xl p-7 shadow-xl space-y-4"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)" }}
        >
          <div>
            <label htmlFor="email" className="text-sm font-semibold block mb-1.5">Email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none focus:border-[var(--rizquna-green)]"
              style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-light)", color: "var(--text-primary)" }}
            />
          </div>
          {error && (
            <p className="text-sm font-semibold" style={{ color: "#EF4444" }}>{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-white font-bold text-sm shadow-lg disabled:opacity-60"
            style={{ background: "var(--rizquna-green)" }}
          >
            {loading ? "Memproses..." : "Kirim Tautan Reset"}
          </button>
          <p className="text-center text-xs" style={{ color: "var(--text-tertiary)" }}>
            Ingat kata sandi?{" "}
            <Link href="/login" className="font-semibold" style={{ color: "var(--rizquna-green)" }}>
              Masuk di sini
            </Link>
          </p>
        </form>
      )}
    </section>
  );
}
