"use client";

import { useEffect, useState } from "react";
import { Copy, Key, Plus, Trash2, Eye, EyeOff } from "lucide-react";

type KeyItem = {
  id: number;
  label: string;
  prefix: string;
  last_used_at: string | null;
  created_at: string;
};

export default function ApiKeysPanel() {
  const [keys, setKeys] = useState<KeyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [label, setLabel] = useState("");
  const [revealed, setRevealed] = useState<string | null>(null);
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/keys");
      const data = (await res.json()) as { keys?: KeyItem[]; error?: string };
      if (!res.ok) throw new Error(data.error || "Gagal memuat API key");
      setKeys(data.keys || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gagal memuat API key");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    if (!label.trim()) return;
    setCreating(true);
    setError(null);
    try {
      const res = await fetch("/api/keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: label.trim() }),
      });
      const data = (await res.json()) as { ok?: boolean; key?: string; error?: string };
      if (!res.ok || !data.key) throw new Error(data.error || "Gagal membuat API key");
      setRevealed(data.key);
      setShow(true);
      setLabel("");
      refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gagal membuat");
    } finally {
      setCreating(false);
    }
  }

  async function revoke(id: number) {
    if (!confirm("Revoke API key ini? Aplikasi yang masih memakainya akan menerima 401.")) return;
    await fetch(`/api/keys?id=${id}`, { method: "DELETE" });
    refresh();
  }

  return (
    <div className="rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)" }}>
      <div className="flex items-center gap-2 mb-2">
        <Key className="w-5 h-5" style={{ color: "var(--rizquna-green)" }} />
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
          maxLength={40}
          className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none focus:border-[var(--rizquna-green)]"
          style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-light)", color: "var(--text-primary)" }}
        />
        <button
          type="submit"
          disabled={creating || !label.trim()}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-white text-sm font-bold shadow-md disabled:opacity-50"
          style={{ background: "var(--rizquna-green)" }}
        >
          <Plus className="w-4 h-4" />
          {creating ? "Membuat..." : "Buat Key"}
        </button>
      </form>

      {error && <p className="text-sm font-semibold mt-3" style={{ color: "#EF4444" }}>{error}</p>}

      {revealed && (
        <div className="mt-4 rounded-xl p-4" style={{ background: "rgba(37,211,102,0.08)", border: "1px solid rgba(37,211,102,0.3)" }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--rizquna-green)" }}>
            API key baru — copy sekarang
          </p>
          <div className="flex items-center gap-2">
            <input
              readOnly
              value={show ? revealed : "•".repeat(40)}
              className="flex-1 px-3 py-2 rounded-lg text-sm font-mono"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)", color: "var(--text-primary)" }}
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="px-3 py-2 rounded-lg"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)" }}
              aria-label={show ? "Sembunyikan" : "Tampilkan"}
            >
              {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(revealed)}
              className="px-3 py-2 rounded-lg"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)" }}
              aria-label="Copy"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => setRevealed(null)}
            className="text-xs font-semibold mt-3"
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
            className="flex items-center justify-between gap-3 p-3 rounded-xl"
            style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-light)" }}
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
              className="p-2 rounded-lg"
              style={{ color: "#EF4444", border: "1px solid var(--border-light)" }}
              aria-label="Revoke"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}