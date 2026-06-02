import Script from "next/script";

/**
 * Loads analytics scripts based on env vars present at build time.
 * Supports Plausible, Umami, and GA4. Only the configured one renders.
 *
 * Set one of:
 *  - NEXT_PUBLIC_PLAUSIBLE_DOMAIN
 *  - NEXT_PUBLIC_UMAMI_SRC + NEXT_PUBLIC_UMAMI_ID
 *  - NEXT_PUBLIC_GA_ID
 */
export function Analytics() {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const plausibleHost = process.env.NEXT_PUBLIC_PLAUSIBLE_HOST || "https://plausible.io";
  const umamiSrc = process.env.NEXT_PUBLIC_UMAMI_SRC;
  const umamiId = process.env.NEXT_PUBLIC_UMAMI_ID;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <>
      {plausibleDomain && (
        <Script
          defer
          data-domain={plausibleDomain}
          src={`${plausibleHost}/js/script.js`}
          strategy="afterInteractive"
        />
      )}
      {umamiSrc && umamiId && (
        <Script defer data-website-id={umamiId} src={umamiSrc} strategy="afterInteractive" />
      )}
      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}');`}
          </Script>
        </>
      )}
    </>
  );
}
