"use client";

import { useState } from "react";
import { Lock } from "lucide-react";

export default function PasswordForm() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    if (next !== confirm) {
      setMsg({ ok: false, text: "Konfirmasi kata sandi tidak cocok" });
      return;
    }
    if (next.length < 8) {
      setMsg({ ok: false, text: "Kata sandi baru minimal 8 karakter" });
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/account/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ current, next }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setMsg({ ok: false, text: data.error || "Gagal mengubah kata sandi" });
      } else {
        setMsg({ ok: true, text: "Kata sandi berhasil diubah" });
        setCurrent("");
        setNext("");
        setConfirm("");
      }
    } catch {
      setMsg({ ok: false, text: "Tidak dapat terhubung ke server" });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl p-6"
      style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)" }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Lock className="w-5 h-5" style={{ color: "var(--rizquna-green)" }} />
        <h2 className="text-lg font-bold">Ubah Kata Sandi</h2>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <Field id="current-password" label="Saat ini" value={current} onChange={setCurrent} required />
        <Field id="new-password" label="Baru (min. 8)" value={next} onChange={setNext} required minLength={8} />
        <Field id="confirm-password" label="Konfirmasi baru" value={confirm} onChange={setConfirm} required minLength={8} />
      </div>

      {msg && (
        <p className="text-sm font-semibold mt-4" style={{ color: msg.ok ? "var(--rizquna-green)" : "#EF4444" }}>
          {msg.text}
        </p>
      )}

      <button
        type="submit"
        disabled={saving}
        className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold shadow-md disabled:opacity-50"
        style={{ background: "var(--rizquna-green)" }}
      >
        {saving ? "Memproses..." : "Ubah Kata Sandi"}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  required,
  minLength,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  minLength?: number;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold block mb-1.5">{label}</label>
      <input
        id={id}
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        minLength={minLength}
        className="w-full px-4 py-2.5 rounded-xl text-sm outline-none focus:border-[var(--rizquna-green)]"
        style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-light)", color: "var(--text-primary)" }}
      />
    </div>
  );
}