"use client";

import { useState, useEffect } from "react";
import { Key, Plus, Trash2, Copy, Eye, EyeOff } from "lucide-react";

type ApiKeyItem = {
  id: number;
  label: string;
  prefix: string;
  created_at: string;
  last_used_at: string | null;
};

export default function ApiKeysPanel() {
  const [keys, setKeys] = useState<ApiKeyItem[]>([]);
  const [label, setLabel] = useState("");
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [revealed, setRevealed] = useState<string | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetch("/api/keys")
      .then((r) => r.json())
      .then((d) => {
        setKeys(d.keys || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    if (!label.trim()) return;
    setError(null);
    setCreating(true);
    setRevealed(null);
    setShow(false);

    try {
      const res = await fetch("/api/keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: label.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Gagal membuat key");
      } else {
        setKeys((s) => [data.key, ...s]);
        setRevealed(data.token);
        setLabel("");
      }
    } catch {
      setError("Gagal menghubungi server");
    } finally {
      setCreating(false);
    }
  }

  async function revoke(id: number) {
    if (!confirm("Cabut (revoke) API key ini? Aplikasi yang menggunakannya tidak akan bisa mengakses API lagi.")) return;
    setError(null);
    try {
      const res = await fetch(`/api/keys?id=${id}`, { method: "DELETE" });
      if (!res.ok) {
        setError("Gagal mencabut key");
      } else {
        setKeys((s) => s.filter((k) => k.id !== id));
      }
    } catch {
      setError("Gagal menghubungi server");
    }
  }

  return (
    <div className="rounded-xl p-6 border shadow-sm" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
      <div className="flex items-center gap-2 mb-2">
        <Key className="w-5 h-5" style={{ color: "var(--text-primary)" }} />
        <h2 className="text-lg font-bold">API Keys</h2>
      </div>
      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
        Generate API key untuk autentikasi REST API. Key hanya ditampilkan satu kali — simpan baik-baik.
      </p>

      <form onSubmit={create} className="mt-4 flex gap-2">
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Label, mis. 'Production WordPress'"
          aria-label="Label API key baru"
          maxLength={40}
          className="flex-1 px-4 py-2 border rounded-lg text-sm bg-transparent outline-none focus:border-slate-800 transition-colors"
          style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
        />
        <button
          type="submit"
          disabled={creating || !label.trim()}
          className="inline-flex items-center gap-1.5 px-4 py-2 border rounded-lg text-sm font-semibold transition-colors hover:opacity-90 disabled:opacity-50"
          style={{ background: "var(--text-primary)", color: "var(--bg-primary)", borderColor: "var(--text-primary)" }}
        >
          <Plus className="w-4 h-4" />
          {creating ? "Membuat..." : "Buat Key"}
        </button>
      </form>

      {error && <p className="text-sm font-semibold mt-3" style={{ color: "#EF4444" }}>{error}</p>}

      {revealed && (
        <div className="mt-4 rounded-xl p-4 border" style={{ background: "var(--bg-secondary)", borderColor: "var(--border)" }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--text-primary)" }}>
            API key baru — copy sekarang
          </p>
          <div className="flex items-center gap-2">
            <input
              readOnly
              value={show ? revealed : "•".repeat(40)}
              aria-label="Nilai API key baru"
              className="flex-1 px-3 py-2 border rounded-lg text-sm font-mono bg-transparent outline-none"
              style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="px-3 py-2 border rounded-lg hover:bg-slate-50 transition-colors"
              style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
              aria-label={show ? "Sembunyikan" : "Tampilkan"}
            >
              {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(revealed)}
              className="px-3 py-2 border rounded-lg hover:bg-slate-50 transition-colors"
              style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
              aria-label="Copy"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => setRevealed(null)}
            className="text-xs font-semibold mt-3 hover:underline"
            style={{ color: "var(--text-tertiary)" }}
          >
            Saya sudah menyimpan. Tutup.
          </button>
        </div>
      )}

      <div className="mt-5 space-y-2">
        {loading && <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>Memuat...</p>}
        {!loading && keys.length === 0 && (
          <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>Belum ada API key.</p>
        )}
        {keys.map((k) => (
          <div
            key={k.id}
            className="flex items-center justify-between gap-3 p-3 rounded-lg border hover:bg-slate-50/30 transition-colors"
            style={{ background: "var(--bg-secondary)", borderColor: "var(--border)" }}
          >
            <div className="min-w-0">
              <p className="font-semibold text-sm truncate">{k.label}</p>
              <p className="text-xs font-mono" style={{ color: "var(--text-tertiary)" }}>
                {k.prefix}…
              </p>
              <p className="text-[11px]" style={{ color: "var(--text-tertiary)" }}>
                Dibuat {new Date(k.created_at).toLocaleDateString("id-ID")}
                {k.last_used_at ? ` · terakhir dipakai ${new Date(k.last_used_at).toLocaleString("id-ID")}` : " · belum pernah dipakai"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => revoke(k.id)}
              className="p-2 border rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors bg-white"
              style={{ color: "#EF4444", borderColor: "var(--border)" }}
              aria-label="Cabut key"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}