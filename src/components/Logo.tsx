import Link from "next/link";
import { SITE } from "@/lib/site";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2 font-extrabold ${className}`}>
      <span
        className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm shadow-sm"
        style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}
      >
        R
      </span>
      <span style={{ color: "var(--text-primary)" }}>{SITE.name}</span>
    </Link>
  );
}
