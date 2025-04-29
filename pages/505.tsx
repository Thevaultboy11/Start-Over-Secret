// pages/500.tsx
import Head from 'next/head';
import Link from 'next/link';

export default function Custom500() {
  return (
    <>
      <Head>
        <title>505 – Server Error</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000',
          color: '#fff',
          padding: '2rem',
          textAlign: 'center',
          lineHeight: 1.6,
        }}
      >
        <h1 style={{ fontSize: '2.75rem', margin: '0 0 1rem' }}>
          505 – Something Went Wrong
        </h1>

        <p style={{ maxWidth: 480, margin: '0 0 2rem' }}>
          Our servers tripped on a broken heart 💔.  
          If this page doesn’t recover soon, please let us know and we’ll fix it
          as fast as possible.
        </p>

        <Link
          href="mailto:eudoratempleton@gmail.com?subject=Site%20is%20down"
          style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            borderRadius: 9999,
            backgroundColor: '#FF073A',
            color: '#fff',
            fontWeight: 700,
            textDecoration: 'none',
            marginBottom: '1.5rem',
          }}
        >
          Email the Admin
        </Link>

        <p style={{ marginBottom: 0 }}>
          …or&nbsp;
          <Link href="/" passHref>
              Return Home
          </Link>
        </p>
      </div>
    </>
  );
}
