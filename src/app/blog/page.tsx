import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import { POSTS } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Tips, tutorial, dan update terbaru seputar WhatsApp Business API & Rizquna.",
};

export default function BlogPage() {
  return (
    <>
      <section className="pt-16 pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--rizquna-green)" }}>
            Blog
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mt-3">
            Tips, Tutorial, & <span className="gradient-text">Update Terbaru</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg" style={{ color: "var(--text-secondary)" }}>
            Belajar memaksimalkan WhatsApp Business API untuk bisnis Anda.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-6">
          {POSTS.map((p) => (
            <article
              key={p.slug}
              className="rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)" }}
            >
              <span
                className="inline-block text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full"
                style={{ background: "rgba(37,211,102,0.1)", color: "var(--rizquna-green)" }}
              >
                {p.tag}
              </span>
              <h2 className="text-xl font-bold mt-3 leading-snug">
                <Link href={`/blog/${p.slug}`} className="hover:underline">
                  {p.title}
                </Link>
              </h2>
              <p className="text-sm mt-2 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {p.excerpt}
              </p>
              <div className="flex items-center gap-4 mt-4 text-xs" style={{ color: "var(--text-tertiary)" }}>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(p.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                </span>
                <span className="inline-flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  {p.author}
                </span>
              </div>
              <Link
                href={`/blog/${p.slug}`}
                className="inline-flex items-center gap-1 text-sm font-semibold mt-4"
                style={{ color: "var(--rizquna-green)" }}
              >
                Baca selengkapnya <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
