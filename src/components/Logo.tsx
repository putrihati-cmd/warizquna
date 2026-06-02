import Link from "next/link";
import { SITE } from "@/lib/site";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-3 font-extrabold ${className}`}>
      <img
        src="/logo.png"
        alt="New Rizquna Elfath Logo"
        className="w-8 h-8 object-contain rounded-md"
      />
      <span className="text-sm font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
        {SITE.name}
      </span>
    </Link>
  );
}
