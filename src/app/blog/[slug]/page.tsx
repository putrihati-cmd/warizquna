import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { POSTS, getPost } from "@/lib/posts";

export const dynamicParams = false;

export async function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Artikel tidak ditemukan" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: "article", publishedTime: post.date },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const dateLabel = new Date(post.date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm font-semibold mb-6"
        style={{ color: "var(--rizquna-green)" }}
      >
        <ArrowLeft className="w-4 h-4" /> Kembali ke Blog
      </Link>

      <span
        className="inline-block text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full"
        style={{ background: "rgba(37,211,102,0.1)", color: "var(--rizquna-green)" }}
      >
        {post.tag}
      </span>
      <h1 className="text-3xl sm:text-4xl font-extrabold mt-3 leading-tight">{post.title}</h1>
      <div className="flex flex-wrap items-center gap-4 mt-4 text-xs" style={{ color: "var(--text-tertiary)" }}>
        <span className="inline-flex items-center gap-1"><User className="w-3.5 h-3.5" />{post.author}</span>
        <span className="inline-flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{dateLabel}</span>
        <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
      </div>

      <div className="mt-10 space-y-5 text-[15px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        {post.content.map((b, i) => {
          if (b.type === "p") return <p key={i}>{b.text}</p>;
          if (b.type === "h2")
            return <h2 key={i} className="text-xl sm:text-2xl font-bold mt-8 mb-2" style={{ color: "var(--text-primary)" }}>{b.text}</h2>;
          if (b.type === "h3")
            return <h3 key={i} className="text-lg font-bold mt-6 mb-1.5" style={{ color: "var(--text-primary)" }}>{b.text}</h3>;
          if (b.type === "ul")
            return (
              <ul key={i} className="list-disc pl-6 space-y-1.5">
                {b.items?.map((it, j) => <li key={j}>{it}</li>)}
              </ul>
            );
          if (b.type === "quote")
            return (
              <blockquote key={i} className="border-l-4 pl-4 py-1 italic" style={{ borderColor: "var(--rizquna-green)" }}>
                {b.text}
              </blockquote>
            );
          if (b.type === "code")
            return (
              <pre key={i} className="rounded-xl p-4 overflow-x-auto text-sm leading-relaxed" style={{ background: "#0B141A", color: "#86EFAC", border: "1px solid var(--border)" }}>
                <code>{b.text}</code>
              </pre>
            );
          return null;
        })}
      </div>

      <hr className="my-12" style={{ borderColor: "var(--border-light)" }} />

      <div className="flex items-center justify-between">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-semibold"
          style={{ color: "var(--rizquna-green)" }}
        >
          <ArrowLeft className="w-4 h-4" /> Semua artikel
        </Link>
        <Link
          href="/register"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-bold text-sm shadow-md hover:-translate-y-0.5 transition-all"
          style={{ background: "var(--rizquna-green)" }}
        >
          Coba Rizquna Gratis
        </Link>
      </div>
    </article>
  );
}