"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: String(fd.get("email") || ""), password: String(fd.get("password") || "") }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error || "Login gagal");
        setLoading(false);
        return;
      }
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Tidak dapat terhubung ke server");
      setLoading(false);
    }
  }

  return (
    <section className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold">
          Masuk ke <span className="gradient-text">Rizquna</span>
        </h1>
        <p className="mt-3 text-sm" style={{ color: "var(--text-secondary)" }}>
          Belum punya akun?{" "}
          <Link href="/register" className="font-semibold" style={{ color: "var(--rizquna-green)" }}>
            Daftar gratis
          </Link>
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl p-7 shadow-xl space-y-4"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)" }}
      >
        <div>
          <label className="text-sm font-semibold block mb-1.5">Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full px-4 py-2.5 rounded-xl text-sm outline-none focus:border-[var(--rizquna-green)]"
            style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-light)", color: "var(--text-primary)" }}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-semibold">Kata Sandi</label>
            <Link href="/forgot-password" className="text-xs font-semibold" style={{ color: "var(--rizquna-green)" }}>
              Lupa kata sandi?
            </Link>
          </div>
          <input
            type="password"
            name="password"
            required
            className="w-full px-4 py-2.5 rounded-xl text-sm outline-none focus:border-[var(--rizquna-green)]"
            style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-light)", color: "var(--text-primary)" }}
          />
        </div>

        {error && (
          <p className="text-sm font-semibold" style={{ color: "#EF4444" }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-xl text-white font-bold text-sm transition-all hover:-translate-y-0.5 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ background: "var(--rizquna-green)" }}
        >
          {loading ? "Memproses..." : "Masuk"}
        </button>

        <p className="text-center text-xs" style={{ color: "var(--text-tertiary)" }}>
          Untuk admin gateway, gunakan{" "}
          <a href="/admin" className="font-semibold" style={{ color: "var(--rizquna-green)" }}>
            /admin
          </a>
          .
        </p>
      </form>
    </section>
  );
}
