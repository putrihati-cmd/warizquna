import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getSession } from "@/lib/auth";
import ForgotClient from "./ForgotClient";

export const metadata: Metadata = {
  title: "Lupa Kata Sandi",
  description: "Setel ulang kata sandi akun Rizquna WhatsApp Gateway Anda.",
};

export const dynamic = "force-dynamic";

export default async function ForgotPage() {
  const session = await getSession();
  if (session) redirect("/dashboard");

  return (
    <Suspense fallback={null}>
      <ForgotClient />
    </Suspense>
  );
}