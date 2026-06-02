"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function RegisterClient() {
  const router = useRouter();
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
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Tidak dapat terhubung ke server");
      setLoading(false);
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-2 gap-12 items-start">
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
          Akses fitur inti gratis selamanya, pesan unlimited tanpa kuota. Coba semua fitur premium
          gratis selama 30 hari.
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
      <label className="text-sm font-semibold block mb-1.5">{label}</label>
      <input
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
