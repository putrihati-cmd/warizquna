import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import LoginClient from "./LoginClient";

export const metadata: Metadata = {
  title: "Masuk",
  description: "Masuk ke dashboard Rizquna WhatsApp Gateway.",
};

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const session = await getSession();
  if (session) redirect("/dashboard");
  return <LoginClient />;
}
