// pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Start Over Secret',
        url: 'https://breakupaidkit.com',
        logo: 'https://breakupaidkit.com/images/logo.png',
        sameAs: ['https://x.com/StartOverSecret'],
    };
    
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Feeling lost after a breakup? Start Over Secret by Alice Dautovic gives you daily tools to process your emotions and feel like yourself again." />
        <meta property="og:title" content="Healing with Alice Dautovic's Start Over Secret" />
        <meta property="og:description" content="Your healing journey starts here. Let go of the pain and find peace with emotional check-ins, support, and strength-building reflections." />
        <meta property="og:image" content="/images/og-default.png" />
        <meta property="og:url" content="https://breakupaidkit.com/" />
        <meta property="og:type" content="website" />
        

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Start Over Secret by Alice Dautovic" />
        <meta name="twitter:description" content="Struggling with a breakup? Discover Alice Dautovic Start Over Secret—your daily healing companion to feel whole again, one reflection at a time." />
        <meta name="twitter:image" content="/images/og-default.png" />
        {/* --- global meta / favicons --- */}
    
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/heart_favicon2.png" />
        <link rel="apple-touch-icon" href="/heart_favicon2.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Google fonts (or switch to next/font) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
          rel="stylesheet"
        />

        {/* Google Tag Manager (script) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id=${'GT-5DCR49LL'}'+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GT-5DCR49LL');`,
          }}
        />
        {/* --- JSON-LD org schema --- */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <body>
        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GT-5DCR49LL"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
