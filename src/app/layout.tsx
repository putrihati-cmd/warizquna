import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics } from "@/components/Analytics";
import { JsonLd, organizationLd, websiteLd, softwareLd } from "@/lib/schema";
import { SITE } from "@/lib/site";
import { getSession } from "@/lib/auth";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.brand} — ${SITE.tagline}`,
    template: `%s | ${SITE.brand}`,
  },
  description: SITE.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE.url,
    siteName: SITE.brand,
    title: `${SITE.brand} — ${SITE.tagline}`,
    description: SITE.description,
  },
  twitter: { card: "summary_large_image" },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession().catch(() => null);
  const user = session ? { name: session.name, email: session.email } : null;
  return (
    <html lang="id">
      <body>
        <JsonLd data={[organizationLd(), websiteLd(), softwareLd()]} />
        <Analytics />
        <Header user={user} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
