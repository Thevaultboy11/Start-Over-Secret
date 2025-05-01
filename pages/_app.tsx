// pages/_app.tsx
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import type { AppProps } from 'next/app';

// ← add your Measurement ID here (same as in _document.tsx) the new changes
const GA4_ID = 'G-HNEK7JXBHE';

/** fires a page_view to gtag */
const pageview = (url: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'page_view', {
      page_path: url,
      send_to: GA4_ID
    });
  }
};

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // initial load
    pageview(router.asPath);

    // on client-side nav
    const handleRouteChange = (url: string) => pageview(url);
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <AuthProvider>
        <Layout>
         <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ThemeProvider>
  );
}
