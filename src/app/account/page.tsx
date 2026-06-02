import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getDb, type UserRow } from "@/lib/db";
import { getSession } from "@/lib/auth";
import ProfileForm from "./ProfileForm";
import PasswordForm from "./PasswordForm";

export const metadata: Metadata = {
  title: "Pengaturan Akun",
};

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  const db = getDb();
  const user = db
    .prepare<{ id: number }, UserRow>("SELECT * FROM users WHERE id = @id")
    .get({ id: session.uid });
  if (!user) redirect("/login");

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--rizquna-green)" }}>
          Pengaturan Akun
        </p>
        <h1 className="text-3xl font-extrabold mt-1">Profil & Keamanan</h1>
      </div>

      <ProfileForm
        defaultValues={{
          name: user.name,
          email: user.email,
          phone: user.phone ?? "",
          company: user.company ?? "",
        }}
      />

      <PasswordForm />

      <div
        className="mt-6 rounded-2xl p-5 text-sm"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)" }}
      >
        <p className="font-bold">Detail akun</p>
        <p className="mt-1" style={{ color: "var(--text-tertiary)" }}>
          Plan: <strong style={{ color: "var(--text-primary)" }}>{user.plan}</strong> · ID: #{user.id} · Bergabung:{" "}
          {new Date(user.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
        </p>
      </div>
    </section>
  );
}