"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, AlertCircle } from "lucide-react";

export default function VerifyLinkPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/auth/link-google")
      .then((res) => res.json())
      .then((data) => {
        if (!data.email) {
          router.replace("/login");
        } else {
          setEmail(data.email);
        }
      })
      .catch(() => {
        router.replace("/login");
      })
      .finally(() => {
        setChecking(false);
      });
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/link-google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Gagal menghubungkan akun");
        setLoading(false);
      } else {
        router.push(data.redirect || "/dashboard");
        router.refresh();
      }
    } catch {
      setError("Tidak dapat terhubung ke server");
      setLoading(false);
    }
  }

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>
          Memuat verifikasi...
        </p>
      </div>
    );
  }

  return (
    <section className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-20 animate-fade-in">
      <div className="text-center mb-8">
        <Lock className="w-10 h-10 mx-auto" style={{ color: "var(--rizquna-green)" }} />
        <h1 className="text-3xl font-extrabold mt-3">
          Verifikasi <span className="gradient-text">Akun</span>
        </h1>
        <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          Email <strong>{email}</strong> sudah memiliki akun di Rizquna.
          Masukkan kata sandi Anda untuk menghubungkan dengan akun Google Anda.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl p-7 shadow-xl space-y-4"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)" }}
      >
        <div>
          <label htmlFor="password" className="text-sm font-semibold block mb-1.5">Kata Sandi</label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl text-sm outline-none focus:border-[var(--rizquna-green)]"
            style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-light)", color: "var(--text-primary)" }}
          />
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-xl text-sm font-semibold" style={{ background: "rgba(239, 68, 68, 0.1)", color: "#EF4444" }}>
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-xl text-white font-bold text-sm shadow-lg disabled:opacity-60"
          style={{ background: "var(--rizquna-green)" }}
        >
          {loading ? "Menghubungkan..." : "Hubungkan Akun Google"}
        </button>

        <p className="text-center text-xs" style={{ color: "var(--text-tertiary)" }}>
          <Link href="/login" className="font-semibold" style={{ color: "var(--rizquna-green)" }}>
            Batal dan kembali
          </Link>
        </p>
      </form>
    </section>
  );
}
