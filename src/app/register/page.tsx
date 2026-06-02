import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import RegisterClient from "./RegisterClient";

export const metadata: Metadata = {
  title: "Daftar",
  description: "Buat akun Rizquna gratis. Trial premium 30 hari, tanpa kartu kredit.",
};

export const dynamic = "force-dynamic";

export default async function RegisterPage() {
  const session = await getSession();
  if (session) redirect("/dashboard");
  return <RegisterClient />;
}
