import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getDb, type UserRow } from "@/lib/db";
import { getSession } from "@/lib/auth";
import ProfileForm from "./ProfileForm";
import PasswordForm from "./PasswordForm";
import BillingTab from "./BillingTab";

export const metadata: Metadata = {
  title: "Pengaturan Akun",
};

export const dynamic = "force-dynamic";

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/login");
  
  const { tab } = await searchParams;
  const activeTab = tab === "billing" ? "billing" : "profile";

  const db = getDb();
  const user = db
    .prepare<{ id: number }, UserRow>("SELECT * FROM users WHERE id = @id")
    .get({ id: session.uid });
  if (!user) redirect("/login");

  const transactions = db
    .prepare("SELECT * FROM transactions WHERE user_id = ? ORDER BY created_at DESC")
    .all(session.uid) as any[];

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--rizquna-green)" }}>
          Pengaturan Akun
        </p>
        <h1 className="text-3xl font-extrabold mt-1">Profil & Keamanan</h1>
      </div>

      {/* Tabs navigation */}
      <div className="flex gap-4 border-b mb-8" style={{ borderColor: "var(--border-light)" }}>
        <Link
          href="/account"
          className="pb-3 text-sm font-semibold border-b-2 px-1 transition-all"
          style={{
            borderColor: activeTab === "profile" ? "var(--rizquna-green)" : "transparent",
            color: activeTab === "profile" ? "var(--text-primary)" : "var(--text-tertiary)",
          }}
        >
          Profil & Keamanan
        </Link>
        <Link
          href="/account?tab=billing"
          className="pb-3 text-sm font-semibold border-b-2 px-1 transition-all"
          style={{
            borderColor: activeTab === "billing" ? "var(--rizquna-green)" : "transparent",
            color: activeTab === "billing" ? "var(--text-primary)" : "var(--text-tertiary)",
          }}
        >
          Tagihan & Langganan
        </Link>
      </div>

      {activeTab === "profile" ? (
        <div className="space-y-6">
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
        </div>
      ) : (
        <BillingTab transactions={transactions} currentPlan={user.plan} />
      )}
    </section>
  );
}