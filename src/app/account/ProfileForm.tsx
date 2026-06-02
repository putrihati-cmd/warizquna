"use client";

import { useState } from "react";
import { Save, User } from "lucide-react";

type Defaults = { name: string; email: string; phone: string; company: string };

export default function ProfileForm({ defaultValues }: { defaultValues: Defaults }) {
  const [v, setV] = useState(defaultValues);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  function set<K extends keyof Defaults>(k: K, val: string) {
    setV((s) => ({ ...s, [k]: val }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setSaving(true);
    try {
      const res = await fetch("/api/account", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: v.name, phone: v.phone, company: v.company }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) {
        setMsg({ ok: false, text: data.error || "Gagal menyimpan" });
      } else {
        setMsg({ ok: true, text: "Profil tersimpan" });
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
      className="rounded-2xl p-6 mb-5"
      style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)" }}
    >
      <div className="flex items-center gap-2 mb-4">
        <User className="w-5 h-5" style={{ color: "var(--rizquna-green)" }} />
        <h2 className="text-lg font-bold">Profil</h2>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field id="name" label="Nama Lengkap" value={v.name} onChange={(x) => set("name", x)} required />
        <Field id="email" label="Email" value={v.email} onChange={() => undefined} disabled />
        <Field id="phone" label="Nomor WhatsApp" value={v.phone} onChange={(x) => set("phone", x)} />
        <Field id="company" label="Perusahaan" value={v.company} onChange={(x) => set("company", x)} />
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
        <Save className="w-4 h-4" />
        {saving ? "Menyimpan..." : "Simpan"}
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
  disabled,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  disabled?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold block mb-1.5">{label}</label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
        className="w-full px-4 py-2.5 rounded-xl text-sm outline-none focus:border-[var(--rizquna-green)] disabled:opacity-60"
        style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-light)", color: "var(--text-primary)" }}
      />
    </div>
  );
}