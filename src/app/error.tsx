"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCw, Home } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Route error:", error);
  }, [error]);

  return (
    <section className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <div
        className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-5"
        style={{ background: "rgba(239,68,68,0.1)", color: "#EF4444" }}
      >
        <AlertTriangle className="w-7 h-7" />
      </div>
      <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#EF4444" }}>
        Error
      </p>
      <h1 className="text-3xl sm:text-4xl font-extrabold mt-2">Terjadi kesalahan</h1>
      <p className="mt-3 text-sm" style={{ color: "var(--text-secondary)" }}>
        Tim kami sudah dapat notifikasi. Coba muat ulang halaman atau kembali ke beranda.
      </p>
      {error.digest && (
        <p className="mt-2 text-[11px] font-mono" style={{ color: "var(--text-tertiary)" }}>
          digest: {error.digest}
        </p>
      )}
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-white font-bold text-sm shadow-md hover:-translate-y-0.5 transition-all"
          style={{ background: "var(--rizquna-green)" }}
        >
          <RotateCw className="w-4 h-4" /> Coba lagi
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all hover:-translate-y-0.5"
          style={{ color: "var(--text-primary)", border: "1px solid var(--border)" }}
        >
          <Home className="w-4 h-4" /> Beranda
        </Link>
      </div>
    </section>
  );
}