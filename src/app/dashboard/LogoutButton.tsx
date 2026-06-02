"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handle() {
    setLoading(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handle}
      disabled={loading}
      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors hover:bg-[var(--bg-surface)] disabled:opacity-60"
      style={{ color: "var(--text-primary)", border: "1px solid var(--border)" }}
    >
      <LogOut className="w-4 h-4" />
      {loading ? "Keluar..." : "Keluar"}
    </button>
  );
}
