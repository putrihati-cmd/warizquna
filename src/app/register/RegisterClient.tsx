"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function RegisterClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const body = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      company: String(fd.get("company") || ""),
      password: String(fd.get("password") || ""),
    };
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error || "Pendaftaran gagal");
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-2 gap-12 items-start animate-fade-in">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--rizquna-green)" }}>
          Daftar Akun
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mt-3">
          Mulai Gratis,
          <br />
          <span className="gradient-text">Tanpa Kartu Kredit</span>
        </h1>
        <p className="mt-5 text-base sm:text-lg" style={{ color: "var(--text-secondary)" }}>
          Akses fitur inti gratis selamanya. Coba semua fitur premium gratis selama 30 hari.
        </p>
        <ul className="mt-7 space-y-3 text-sm" style={{ color: "var(--text-secondary)" }}>
          {[
            "Koneksi WhatsApp instan via QR Code",
            "Tanpa biaya setup, tanpa biaya tersembunyi",
            "Server Indonesia, billing Rupiah",
            "Support langsung dari tim Indonesia",
          ].map((it) => (
            <li key={it} className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" style={{ color: "var(--rizquna-green)" }} />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl p-7 shadow-xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)" }}>
        <h2 className="text-2xl font-bold">Buat Akun Baru</h2>
        <p className="text-sm mt-1" style={{ color: "var(--text-tertiary)" }}>
          Sudah punya akun?{" "}
          <Link href="/login" className="font-semibold" style={{ color: "var(--rizquna-green)" }}>
            Masuk di sini
          </Link>
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Field label="Nama Lengkap" name="name" type="text" required />
          <Field label="Email Bisnis" name="email" type="email" required />
          <Field label="Nomor WhatsApp" name="phone" type="tel" placeholder="6281234567890" />
          <Field label="Nama Perusahaan" name="company" type="text" />
          <Field label="Kata Sandi (min. 8 karakter)" name="password" type="password" required minLength={8} />

          <label className="flex items-start gap-2 text-xs cursor-pointer" style={{ color: "var(--text-secondary)" }}>
            <input type="checkbox" required className="mt-0.5" />
            <span>
              Saya setuju dengan{" "}
              <Link href="/terms-of-service" className="font-semibold" style={{ color: "var(--rizquna-green)" }}>
                Syarat & Ketentuan
              </Link>{" "}
              dan{" "}
              <Link href="/privacy-policy" className="font-semibold" style={{ color: "var(--rizquna-green)" }}>
                Kebijakan Privasi
              </Link>
              .
            </span>
          </label>

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
            {loading ? "Mendaftarkan..." : "Daftar Gratis"}
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
            <span>Daftar dengan Google</span>
          </a>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type,
  required,
  placeholder,
  minLength,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  minLength?: number;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-semibold block mb-1.5">{label}</label>
      <input
        id={name}
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        minLength={minLength}
        className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-colors focus:border-[var(--rizquna-green)]"
        style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-light)", color: "var(--text-primary)" }}
      />
    </div>
  );
}
