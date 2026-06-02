"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, MessageCircle, AlertCircle, CheckCircle } from "lucide-react";
import { SITE } from "@/lib/site";

export default function ContactPage() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [subjek, setSubjek] = useState("");
  const [pesan, setPesan] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const waLink = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Halo Rizquna, saya tertarik dengan WhatsApp Gateway.")}`;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama, email, subjek, pesan }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Gagal mengirim pesan");
      } else {
        setSuccess(true);
        setNama("");
        setEmail("");
        setSubjek("");
        setPesan("");
      }
    } catch {
      setError("Tidak dapat terhubung ke server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="pt-16 pb-12 animate-fade-in">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--rizquna-green)" }}>
            Kontak
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mt-3">
            Mari <span className="gradient-text">Bicara</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg" style={{ color: "var(--text-secondary)" }}>
            Tim kami siap menjawab pertanyaan terkait fitur, harga, integrasi, atau kebutuhan kustom
            untuk bisnis Anda.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <ContactItem icon={Mail} title="Email" value={SITE.email} href={`mailto:${SITE.email}`} />
            <ContactItem
              icon={MessageCircle}
              title="WhatsApp"
              value={`+${SITE.whatsapp}`}
              href={waLink}
            />
            <ContactItem icon={Phone} title="Telepon" value={`+${SITE.whatsapp}`} href={`tel:+${SITE.whatsapp}`} />
            <ContactItem icon={MapPin} title="Alamat" value="Indonesia" />
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl p-6 space-y-4"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)" }}
          >
            <h2 className="text-xl font-bold">Kirim Pesan</h2>
            
            <Field
              id="nama"
              label="Nama"
              name="nama"
              type="text"
              required
              value={nama}
              onChange={setNama}
            />
            <Field
              id="email"
              label="Email"
              name="email"
              type="email"
              required
              value={email}
              onChange={setEmail}
            />
            <Field
              id="subjek"
              label="Subjek"
              name="subjek"
              type="text"
              required
              value={subjek}
              onChange={setSubjek}
            />

            <div>
              <label htmlFor="pesan" className="text-sm font-semibold block mb-1.5">Pesan</label>
              <textarea
                id="pesan"
                name="pesan"
                rows={5}
                required
                value={pesan}
                onChange={(e) => setPesan(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-colors focus:border-[var(--rizquna-green)]"
                style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-light)", color: "var(--text-primary)" }}
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl text-sm font-semibold" style={{ background: "rgba(239, 68, 68, 0.1)", color: "#EF4444" }}>
                <AlertCircle className="w-4.5 h-4.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="flex items-center gap-2 p-3 rounded-xl text-sm font-semibold" style={{ background: "rgba(34, 197, 94, 0.15)", color: "var(--rizquna-green)" }}>
                <CheckCircle className="w-4.5 h-4.5 shrink-0" />
                <span>Pesan Anda berhasil dikirim! Kami akan menghubungi Anda segera.</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-white font-bold text-sm transition-all hover:-translate-y-0.5 shadow-md disabled:opacity-60"
              style={{ background: "var(--rizquna-green)" }}
            >
              {loading ? "Mengirim..." : "Kirim"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

function ContactItem({
  icon: Icon,
  title,
  value,
  href,
}: {
  icon: typeof Mail;
  title: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="rounded-2xl p-5 flex items-start gap-4 transition-all hover:-translate-y-0.5 hover:shadow-md" style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)" }}>
      <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(37,211,102,0.1)", color: "var(--rizquna-green)" }}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-tertiary)" }}>{title}</p>
        <p className="text-base font-semibold mt-0.5">{value}</p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    content
  );
}

function Field({
  id,
  label,
  name,
  type,
  required,
  value,
  onChange,
}: {
  id: string;
  label: string;
  name: string;
  type: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold block mb-1.5">{label}</label>
      <input
        id={id}
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-colors focus:border-[var(--rizquna-green)]"
        style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-light)", color: "var(--text-primary)" }}
      />
    </div>
  );
}
