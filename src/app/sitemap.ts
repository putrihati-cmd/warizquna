import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { POSTS } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const routes = [
    "",
    "/features",
    "/pricing",
    "/how-it-works",
    "/use-cases",
    "/faq",
    "/about",
    "/contact",
    "/docs",
    "/blog",
    "/changelog",
    "/privacy-policy",
    "/terms-of-service",
  ];
  const lastModified = new Date();
  const base_routes = routes.map((path) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency:
      path === "" ? ("weekly" as const) : path.includes("policy") || path.includes("terms") ? ("yearly" as const) : ("monthly" as const),
    priority: path === "" ? 1 : path.includes("pricing") ? 0.9 : 0.7,
  }));
  const blog_posts = POSTS.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...base_routes, ...blog_posts];
}
