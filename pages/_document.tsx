// pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document';

/** ✅ keep IDs in ONE place (read from env in prod) */
const GTM_ID = 'GTM-N9SBFV88';       // your Tag-Manager container
const GA4_ID = 'G-HNEK7JXBHE';       // your GA4 Measurement ID

export default function Document() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'UnutrasnjiKompas',
    url: 'https://breakupaidkit.com',
    logo: 'https://breakupaidkit.com/images/logo.png',
    sameAs: ['https://x.com/StartOverSecret'],
  };

  return (
    <Html lang="en">
      <Head>
        {/* SEO basics -------------------------------------------------- */}
        <meta name="description" content="Feeling lost after a breakup? …" />
        <meta property="og:title" content="Healing with Elma Dzananovic’s UnutrasnjiKompas" />
        {/*  …your existing <meta> + icons + fonts stay here … */}

        {/* Google site-verification  (add your token) ----------------- */}
        <meta name="google-site-verification" content="PASTE_TOKEN_HERE" />

        {/* Self-canonical (avoids duplicate-URL issues) ---------------- */}
        <link rel="canonical" href="https://breakupaidkit.com" />

        {/* ---------- Google Tag Manager (head) ---------- */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
        {/* ---------- Optional GA4 fallback (loads if GTM fails) ------ */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              /* send_page_view: false → we’ll fire SPA page-views ourselves */
              gtag('config', '${GA4_ID}', { send_page_view: false });
            `,
          }}
        />

        {/* JSON-LD organisation schema -------------------------------- */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <body>
        {/* ---------- Google Tag Manager (noscript) ---------- */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0" width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
