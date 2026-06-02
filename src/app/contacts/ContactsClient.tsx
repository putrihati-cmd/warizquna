"use client";

import { useState } from "react";
import { Plus, Trash2, Pencil, Check, X } from "lucide-react";

export type ContactItem = {
  id: number;
  phone: string;
  name: string;
  tags: string[];
  created_at: string;
};

export default function ContactsClient({ initial }: { initial: ContactItem[] }) {
  const [items, setItems] = useState<ContactItem[]>(initial);
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [tags, setTags] = useState("");
  const [filter, setFilter] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<{ name: string; phone: string; tags: string }>({
    name: "",
    phone: "",
    tags: "",
  });

  async function reload() {
    const res = await fetch("/api/account/contacts?limit=200");
    const data = (await res.json()) as { contacts: ContactItem[] };
    setItems(data.contacts || []);
  }

  async function add(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setAdding(true);
    try {
      const tagsArr = tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      const res = await fetch("/api/account/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, tags: tagsArr }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string; contact?: ContactItem };
      if (!res.ok || !data.ok) {
        setError(data.error || "Gagal menambah");
      } else if (data.contact) {
        setItems((s) => [data.contact!, ...s]);
        setName("");
        setPhone("");
        setTags("");
      }
    } catch {
      setError("Tidak dapat terhubung");
    } finally {
      setAdding(false);
    }
  }

  async function del(id: number) {
    if (!confirm("Hapus kontak ini?")) return;
    const res = await fetch(`/api/account/contacts/${id}`, { method: "DELETE" });
    if (res.ok) setItems((s) => s.filter((c) => c.id !== id));
  }

  function startEdit(c: ContactItem) {
    setEditingId(c.id);
    setEditValues({ name: c.name, phone: c.phone, tags: c.tags.join(", ") });
  }

  async function saveEdit(id: number) {
    const tagsArr = editValues.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const res = await fetch(`/api/account/contacts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editValues.name, phone: editValues.phone, tags: tagsArr }),
    });
    if (res.ok) {
      setEditingId(null);
      reload();
    }
  }

  const visible = items.filter((c) => {
    if (!filter) return true;
    const f = filter.toLowerCase();
    return (
      c.name.toLowerCase().includes(f) ||
      c.phone.includes(f) ||
      c.tags.some((t) => t.toLowerCase().includes(f))
    );
  });

  return (
    <div className="mt-8 space-y-6">
      <form
        onSubmit={add}
        className="rounded-xl p-5 grid sm:grid-cols-4 gap-3 border shadow-sm"
        style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
      >
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama"
          aria-label="Nama kontak"
          className="px-4 py-2 border rounded-lg text-sm bg-transparent outline-none focus:border-slate-800 transition-colors"
          style={{ borderColor: "var(--border)" }}
        />
        <input
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Nomor (8-18 digit)"
          aria-label="Nomor telepon kontak"
          pattern="[0-9]{8,18}"
          className="px-4 py-2 border rounded-lg text-sm bg-transparent outline-none focus:border-slate-800 transition-colors"
          style={{ borderColor: "var(--border)" }}
        />
        <input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tag (pisah koma)"
          aria-label="Tag kontak"
          className="px-4 py-2 border rounded-lg text-sm bg-transparent outline-none focus:border-slate-800 transition-colors"
          style={{ borderColor: "var(--border)" }}
        />
        <button
          type="submit"
          disabled={adding}
          className="inline-flex items-center justify-center gap-1.5 px-5 py-2 border rounded-lg text-sm font-semibold transition-colors hover:opacity-90 disabled:opacity-50"
          style={{ background: "var(--text-primary)", color: "var(--bg-primary)", borderColor: "var(--text-primary)" }}
        >
          <Plus className="w-4 h-4" />
          {adding ? "..." : "Tambah"}
        </button>
        {error && <p className="sm:col-span-4 text-sm font-semibold" style={{ color: "#EF4444" }}>{error}</p>}
      </form>

      <div className="flex items-center gap-3">
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter nama / nomor / tag..."
          aria-label="Filter kontak"
          className="flex-1 px-4 py-2.5 border rounded-lg text-sm bg-transparent outline-none focus:border-slate-800 transition-colors"
          style={{ borderColor: "var(--border)" }}
        />
        <span className="text-sm font-semibold" style={{ color: "var(--text-tertiary)" }}>
          {visible.length} / {items.length}
        </span>
      </div>

      <div
        className="rounded-xl border overflow-x-auto shadow-sm"
        style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
      >
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: "var(--bg-secondary)" }}>
              <th className="text-left p-4 font-bold border-b" style={{ borderColor: "var(--border)" }}>Nama</th>
              <th className="text-left p-4 font-bold border-b" style={{ borderColor: "var(--border)" }}>Nomor</th>
              <th className="text-left p-4 font-bold border-b" style={{ borderColor: "var(--border)" }}>Tag</th>
              <th className="text-left p-4 font-bold border-b" style={{ borderColor: "var(--border)" }}>Dibuat</th>
              <th className="text-right p-4 font-bold border-b" style={{ borderColor: "var(--border)" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center" style={{ color: "var(--text-tertiary)" }}>
                  Belum ada kontak
                </td>
              </tr>
            )}
            {visible.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50/50" style={{ borderTop: "1px solid var(--border-light)" }}>
                <td className="p-4 font-semibold">
                  {editingId === c.id ? (
                    <input
                      value={editValues.name}
                      onChange={(e) => setEditValues((s) => ({ ...s, name: e.target.value }))}
                      aria-label="Edit nama kontak"
                      className="w-full px-2 py-1 border rounded text-sm bg-transparent outline-none"
                      style={{ borderColor: "var(--border)" }}
                    />
                  ) : (
                    c.name
                  )}
                </td>
                <td className="p-4 font-mono text-xs">
                  {editingId === c.id ? (
                    <input
                      value={editValues.phone}
                      onChange={(e) => setEditValues((s) => ({ ...s, phone: e.target.value }))}
                      aria-label="Edit nomor telepon kontak"
                      className="w-full px-2 py-1 border rounded text-sm font-mono bg-transparent outline-none"
                      style={{ borderColor: "var(--border)" }}
                    />
                  ) : (
                    c.phone
                  )}
                </td>
                <td className="p-4">
                  {editingId === c.id ? (
                    <input
                      value={editValues.tags}
                      onChange={(e) => setEditValues((s) => ({ ...s, tags: e.target.value }))}
                      aria-label="Edit tag kontak"
                      className="w-full px-2 py-1 border rounded text-sm bg-transparent outline-none"
                      style={{ borderColor: "var(--border)" }}
                    />
                  ) : (
                    <div className="flex flex-wrap gap-1">
                      {c.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border"
                          style={{ background: "var(--bg-secondary)", color: "var(--text-secondary)", borderColor: "var(--border)" }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </td>
                <td className="p-4 text-xs font-medium" style={{ color: "var(--text-tertiary)" }}>
                  {new Date(c.created_at + "Z").toLocaleDateString("id-ID")}
                </td>
                <td className="p-4 text-right">
                  {editingId === c.id ? (
                    <>
                      <button onClick={() => saveEdit(c.id)} className="p-1.5 rounded border hover:bg-slate-100 transition-colors" style={{ color: "var(--text-primary)", borderColor: "var(--border)" }} aria-label="Simpan">
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => setEditingId(null)} className="p-1.5 rounded border hover:bg-slate-100 transition-colors ml-1" style={{ color: "var(--text-tertiary)", borderColor: "var(--border)" }} aria-label="Batal">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEdit(c)} className="p-1.5 rounded border hover:bg-slate-100 transition-colors" style={{ color: "var(--text-secondary)", borderColor: "var(--border)" }} aria-label="Edit">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => del(c.id)} className="p-1.5 rounded border hover:bg-red-50 transition-colors ml-1" style={{ color: "#EF4444", borderColor: "var(--border)" }} aria-label="Hapus">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}