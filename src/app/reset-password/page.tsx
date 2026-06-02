"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

function Inner() {
  const router = useRouter();
  const sp = useSearchParams();
  const initialToken = sp.get("token") ?? "";
  const [token, setToken] = useState(initialToken);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password !== confirm) {
      setError("Konfirmasi kata sandi tidak cocok");
      return;
    }
    if (password.length < 8) {
      setError("Kata sandi minimal 8 karakter");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error || "Reset gagal");
        setLoading(false);
        return;
      }
      router.push("/login?reset=success");
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
          Setel Ulang <span className="gradient-text">Kata Sandi</span>
        </h1>
        <p className="mt-3 text-sm" style={{ color: "var(--text-secondary)" }}>
          Masukkan kata sandi baru di bawah.
        </p>
      </div>

      <form
        onSubmit={submit}
        className="rounded-2xl p-7 shadow-xl space-y-4"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)" }}
      >
        <div>
          <label className="text-sm font-semibold block mb-1.5">Reset Token</label>
          <input
            type="text"
            required
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl text-sm font-mono outline-none focus:border-[var(--rizquna-green)]"
            style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-light)", color: "var(--text-primary)" }}
          />
        </div>
        <div>
          <label className="text-sm font-semibold block mb-1.5">Kata Sandi Baru (min. 8)</label>
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl text-sm outline-none focus:border-[var(--rizquna-green)]"
            style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-light)", color: "var(--text-primary)" }}
          />
        </div>
        <div>
          <label className="text-sm font-semibold block mb-1.5">Konfirmasi</label>
          <input
            type="password"
            required
            minLength={8}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl text-sm outline-none focus:border-[var(--rizquna-green)]"
            style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-light)", color: "var(--text-primary)" }}
          />
        </div>
        {error && <p className="text-sm font-semibold" style={{ color: "#EF4444" }}>{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-xl text-white font-bold text-sm shadow-lg disabled:opacity-60"
          style={{ background: "var(--rizquna-green)" }}
        >
          {loading ? "Memproses..." : "Setel Kata Sandi"}
        </button>
      </form>
    </section>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <Inner />
    </Suspense>
  );
}