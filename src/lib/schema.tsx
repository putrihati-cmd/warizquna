import { SITE } from "./site";

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.brand,
    url: SITE.url,
    logo: `${SITE.url}/icon.svg`,
    email: SITE.email,
    sameAs: [SITE.social.github, SITE.social.linkedin, SITE.social.twitter].filter((x) => x && x !== "#"),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: SITE.email,
        availableLanguage: ["Indonesian", "English"],
      },
    ],
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.brand,
    url: SITE.url,
    inLanguage: "id-ID",
    publisher: { "@type": "Organization", name: SITE.brand },
  };
}

export function softwareLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE.brand,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: SITE.description,
    offers: [
      { "@type": "Offer", name: "Free", price: "0", priceCurrency: "IDR" },
      { "@type": "Offer", name: "Starter", price: "99000", priceCurrency: "IDR" },
      { "@type": "Offer", name: "Growth", price: "249000", priceCurrency: "IDR" },
    ],
  };
}

export function faqLd(qa: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qa.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

export function breadcrumbLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(Array.isArray(data) ? data : [data]) }}
    />
  );
}
