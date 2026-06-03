import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getSession } from "@/lib/auth";
import { getDb } from "@/lib/db";
import ContactsClient, { type ContactItem } from "./ContactsClient";

export const metadata: Metadata = { title: "Kontak" };
export const dynamic = "force-dynamic";

type Row = {
  id: number;
  phone: string;
  name: string;
  tags: string | null;
  created_at: string;
  updated_at: string;
};

export default async function ContactsPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const db = getDb();
  
  const totalRow = db
    .prepare<{ uid: number }, { count: number }>(
      `SELECT COUNT(*) as count FROM contacts WHERE user_id = @uid`
    )
    .get({ uid: session.uid });
  const total = totalRow?.count ?? 0;

  const rows = db
    .prepare<{ uid: number }, Row>(
      `SELECT id, phone, name, tags, created_at, updated_at FROM contacts WHERE user_id = @uid ORDER BY id DESC LIMIT 50`
    )
    .all({ uid: session.uid });

  const initial: ContactItem[] = rows.map((r) => {
    let parsedTags: string[] = [];
    if (r.tags) {
      try {
        parsedTags = JSON.parse(r.tags) as string[];
      } catch {
        parsedTags = [];
      }
    }
    return {
      id: r.id,
      phone: r.phone,
      name: r.name,
      tags: parsedTags,
      created_at: r.created_at,
    };
  });

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-sm font-semibold mb-4" style={{ color: "var(--rizquna-green)" }}>
        <ArrowLeft className="w-4 h-4" /> Kembali ke Dashboard
      </Link>
      <h1 className="text-3xl font-extrabold">Kontak</h1>
      <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
        Kelola database pelanggan untuk broadcast dan segmentasi.
      </p>
      <ContactsClient initial={initial} initialTotal={total} />
    </section>
  );
}