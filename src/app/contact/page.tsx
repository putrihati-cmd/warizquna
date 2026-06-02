import type { Metadata } from "next";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontak",
  description: "Hubungi tim Rizquna untuk pertanyaan, demo, atau dukungan teknis.",
};

export default function ContactPage() {
  const waLink = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Halo Rizquna, saya tertarik dengan WhatsApp Gateway.")}`;
  return (
    <>
      <section className="pt-16 pb-12">
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
            action={`mailto:${SITE.email}`}
            method="post"
            encType="text/plain"
            className="rounded-2xl p-6 space-y-4"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)" }}
          >
            <h2 className="text-xl font-bold">Kirim Pesan</h2>
            <Field label="Nama" name="nama" type="text" required />
            <Field label="Email" name="email" type="email" required />
            <Field label="Subjek" name="subjek" type="text" required />
            <div>
              <label className="text-sm font-semibold block mb-1.5">Pesan</label>
              <textarea
                name="pesan"
                rows={5}
                required
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-colors focus:border-[var(--rizquna-green)]"
                style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-light)", color: "var(--text-primary)" }}
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl text-white font-bold text-sm transition-all hover:-translate-y-0.5 shadow-md"
              style={{ background: "var(--rizquna-green)" }}
            >
              Kirim
            </button>
            <p className="text-xs text-center" style={{ color: "var(--text-tertiary)" }}>
              Form ini akan membuka aplikasi email default Anda.
            </p>
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
  label,
  name,
  type,
  required,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-sm font-semibold block mb-1.5">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-colors focus:border-[var(--rizquna-green)]"
        style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-light)", color: "var(--text-primary)" }}
      />
    </div>
  );
}
