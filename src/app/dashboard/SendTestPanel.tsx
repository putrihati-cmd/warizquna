"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function SendTestPanel({ isFreeUser = false }: { isFreeUser?: boolean }) {
  const [to, setTo] = useState("");
  const [text, setText] = useState("Halo dari Rizquna WA Gateway!");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setResult(null);
    setSending(true);
    try {
      const res = await fetch("/api/wa/send-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: to.trim(), text }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string; status?: number };
      if (!res.ok || !data.ok) {
        setResult({ ok: false, message: data.error || `Gagal (${res.status})` });
      } else {
        setResult({ ok: true, message: "Pesan terkirim ke gateway." });
      }
    } catch (e) {
      setResult({ ok: false, message: e instanceof Error ? e.message : "Gagal kirim" });
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="rounded-xl p-6 border shadow-sm" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
      <div className="flex items-center gap-2 mb-2">
        <Send className="w-5 h-5" style={{ color: "var(--text-primary)" }} />
        <h2 className="text-lg font-bold">Kirim Pesan Tes</h2>
      </div>
      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
        Kirim pesan langsung melalui wa-gateway internal. Pastikan device sudah terhubung di panel admin.
      </p>

      <form onSubmit={submit} className="mt-4 space-y-3">
        <input
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="Nomor tujuan, mis. 6281234567890"
          aria-label="Nomor telepon penerima"
          required
          pattern="[0-9]{8,18}"
          className="w-full px-4 py-2 border rounded-lg text-sm bg-transparent outline-none focus:border-slate-800 transition-colors"
          style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          required
          aria-label="Isi pesan tes"
          maxLength={1000}
          className="w-full px-4 py-2 border rounded-lg text-sm bg-transparent outline-none focus:border-slate-800 transition-colors"
          style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
        />
        {isFreeUser && (
          <p className="text-xs italic" style={{ color: "var(--text-tertiary)" }}>
            * Pesan Anda akan secara otomatis disertai watermark promosi &quot;wa.rizquna.id&quot; karena akun Anda berada pada paket Free.
          </p>
        )}
        <button
          type="submit"
          disabled={sending}
          className="inline-flex items-center gap-2 px-5 py-2 border rounded-lg text-sm font-semibold transition-colors hover:opacity-90 disabled:opacity-50"
          style={{ background: "var(--text-primary)", color: "var(--bg-primary)", borderColor: "var(--text-primary)" }}
        >
          <Send className="w-4 h-4" />
          {sending ? "Mengirim..." : "Kirim"}
        </button>
      </form>

      {result && (
        <p
          className="text-sm font-semibold mt-3"
          style={{ color: result.ok ? "var(--rizquna-green)" : "#EF4444" }}
        >
          {result.message}
        </p>
      )}
    </div>
  );
}