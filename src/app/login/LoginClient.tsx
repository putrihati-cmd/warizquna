"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";
  const resetSuccess = searchParams.get("reset") === "success";
  const oauthError = searchParams.get("error");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    oauthError === "csrf_error"
      ? "Verifikasi keamanan gagal. Silakan coba masuk kembali."
      : oauthError === "no_code"
      ? "Kode otorisasi Google tidak ditemukan."
      : oauthError === "token_error"
      ? "Gagal menukar token dengan Google."
      : oauthError === "missing_email"
      ? "Email tidak ditemukan pada profil Google Anda."
      : oauthError === "server_error"
      ? "Terjadi kesalahan internal saat menghubungkan ke Google."
      : null
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: String(fd.get("email") || ""),
          password: String(fd.get("password") || ""),
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error || "Login gagal");
        setLoading(false);
        return;
      }
      router.push(redirect);
      router.refresh();
    } catch {
      setError("Tidak dapat terhubung ke server");
      setLoading(false);
    }
  }

  const googleAuthHref = `/api/auth/google${
    redirect !== "/dashboard" ? `?redirect=${encodeURIComponent(redirect)}` : ""
  }`;

  return (
    <section className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-20 animate-fade-in">
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
        {resetSuccess && (
          <div className="p-3 rounded-xl text-xs font-bold text-center" style={{ background: "rgba(34, 197, 94, 0.15)", color: "var(--rizquna-green)" }}>
            Kata sandi berhasil diubah. Silakan masuk menggunakan kata sandi baru Anda.
          </div>
        )}

        <div>
          <label htmlFor="email" className="text-sm font-semibold block mb-1.5">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            required
            className="w-full px-4 py-2.5 rounded-xl text-sm outline-none focus:border-[var(--rizquna-green)]"
            style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-light)", color: "var(--text-primary)" }}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="password" className="text-sm font-semibold">Kata Sandi</label>
            <Link href="/forgot-password" className="text-xs font-semibold" style={{ color: "var(--rizquna-green)" }}>
              Lupa kata sandi?
            </Link>
          </div>
          <input
            id="password"
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

        <div className="flex items-center my-4">
          <div className="flex-1 border-t" style={{ borderColor: "var(--border-light)" }} />
          <span className="px-3 text-xs uppercase font-semibold tracking-wider" style={{ color: "var(--text-tertiary)" }}>
            atau
          </span>
          <div className="flex-1 border-t" style={{ borderColor: "var(--border-light)" }} />
        </div>

        <a
          href={googleAuthHref}
          className="flex items-center justify-center gap-3 w-full py-3 rounded-xl text-sm font-bold border transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-md"
          style={{
            background: "var(--bg-secondary)",
            borderColor: "var(--border-light)",
            color: "var(--text-primary)"
          }}
        >
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span>Masuk dengan Google</span>
        </a>

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
