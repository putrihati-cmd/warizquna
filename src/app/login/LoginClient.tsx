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

        <div className="flex items-center my-4">
          <div className="flex-1 border-t" style={{ borderColor: "var(--border-light)" }} />
          <span className="px-3 text-xs uppercase font-semibold tracking-wider" style={{ color: "var(--text-tertiary)" }}>
            atau
          </span>
          <div className="flex-1 border-t" style={{ borderColor: "var(--border-light)" }} />
        </div>

        <a
          href="/api/auth/google"
          className="flex items-center justify-center gap-3 w-full py-3 rounded-xl text-sm font-bold border transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-md"
          style={{
            background: "var(--bg-secondary)",
            borderColor: "var(--border-light)",
            color: "var(--text-primary)"
          }}
        >
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.2-5.136 4.2a6.38 6.38 0 0 1-6.38-6.38 6.38 6.38 0 0 1 6.38-6.38c2.682 0 4.882 1.84 5.464 4.31l4.057-3.15C21.272 3.84 17.152 1.3 12.24 1.3 6.222 1.3 1.3 6.222 1.3 12.24s4.922 10.94 10.94 10.94c6.264 0 10.94-4.676 10.94-10.94 0-.648-.052-1.32-.162-1.955H12.24Z"
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
