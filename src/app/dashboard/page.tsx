import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Users, Send, Key, Webhook, Settings, ExternalLink } from "lucide-react";
import { getSession } from "@/lib/auth";
import { listApiKeys } from "@/lib/api-keys";
import { getDb } from "@/lib/db";
import LogoutButton from "./LogoutButton";
import ApiKeysPanel from "./ApiKeysPanel";
import SendTestPanel from "./SendTestPanel";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard Rizquna WhatsApp Gateway.",
};

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const db = getDb();
  
  // Fetch real counts from Database
  const contactsCount = db.prepare("SELECT COUNT(*) as count FROM contacts WHERE user_id = ?").get(session.uid) as { count: number } | undefined;
  const webhooksCount = db.prepare("SELECT COUNT(*) as count FROM webhooks WHERE user_id = ?").get(session.uid) as { count: number } | undefined;
  const messagesCount = db.prepare("SELECT COUNT(*) as count FROM messages WHERE user_id = ?").get(session.uid) as { count: number } | undefined;
  const keys = listApiKeys(session.uid);
  const userRow = db.prepare("SELECT plan, email FROM users WHERE id = ?").get(session.uid) as { plan: string; email: string } | undefined;
  const plan = userRow?.plan || "free";
  const email = userRow?.email || "";
  const adminEmail = process.env.ADMIN_EMAIL || "admin@rizquna.id";
  const isFreeUser = plan === "free" && email !== adminEmail;

  const tiles = [
    { icon: Users, label: "Kontak", value: String(contactsCount?.count ?? 0), desc: "Kelola daftar kontak", href: "/contacts" },
    { icon: Send, label: "Pesan", value: String(messagesCount?.count ?? 0), desc: "Terkirim & diterima", href: null },
    { icon: Key, label: "API Key", value: String(keys.length), desc: keys.length ? "Aktif" : "Belum dibuat", href: null },
    { icon: Webhook, label: "Webhook", value: String(webhooksCount?.count ?? 0), desc: "Integrasi aktif", href: null },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--rizquna-green)" }}>
            Dashboard
          </p>
          <h1 className="text-3xl font-extrabold mt-1">
            Halo, <span className="gradient-text">{session.name}</span>
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-tertiary)" }}>
            {session.email}
          </p>
        </div>
        <LogoutButton />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {tiles.map((t) => {
          const Icon = t.icon;
          const content = (
            <>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-tertiary)" }}>
                  {t.label}
                </span>
                <Icon className="w-4 h-4" style={{ color: "var(--rizquna-green)" }} />
              </div>
              <p className="text-3xl font-extrabold mt-2">{t.value}</p>
              <p className="text-xs mt-1" style={{ color: "var(--text-tertiary)" }}>
                {t.desc}
              </p>
            </>
          );

          return t.href ? (
            <Link
              key={t.label}
              href={t.href}
              className="rounded-2xl p-5 block hover:-translate-y-0.5 transition-all hover:shadow-sm"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)" }}
            >
              {content}
            </Link>
          ) : (
            <div
              key={t.label}
              className="rounded-2xl p-5"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)" }}
            >
              {content}
            </div>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-5 mb-5">
        <ApiKeysPanel />
        <SendTestPanel isFreeUser={isFreeUser} />
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div
          className="rounded-2xl p-6"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)" }}
        >
          <h2 className="text-lg font-bold mb-2">Mulai mengirim pesan pertama</h2>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Hubungkan nomor WhatsApp Anda di panel admin gateway untuk mulai
            mengirim pesan.
          </p>
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-xl text-white font-bold text-sm shadow-md hover:-translate-y-0.5 transition-all"
            style={{ background: "var(--rizquna-green)" }}
          >
            Buka Admin Gateway <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div
          className="rounded-2xl p-6"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)" }}
        >
          <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
            <Settings className="w-5 h-5" style={{ color: "var(--rizquna-green)" }} />
            Pengaturan
          </h2>
          <ul className="space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
            <li>
              <Link href="/account" className="hover:underline inline-flex items-center gap-1">
                Profil & keamanan akun <ArrowRight className="w-3 h-3" />
              </Link>
            </li>
            <li>
              <Link href="/account/audit" className="hover:underline inline-flex items-center gap-1">
                Audit log akun <ArrowRight className="w-3 h-3" />
              </Link>
            </li>
            <li>
              <Link href="/docs" className="hover:underline inline-flex items-center gap-1">
                Pelajari REST API <ArrowRight className="w-3 h-3" />
              </Link>
            </li>
            <li>
              <Link href="/changelog" className="hover:underline inline-flex items-center gap-1">
                Lihat changelog <ArrowRight className="w-3 h-3" />
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline inline-flex items-center gap-1">
                Hubungi support <ArrowRight className="w-3 h-3" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
