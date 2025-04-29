import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function NotFound() {
    return (
      <>
        <Head><title>Page not found</title></Head>
        <main style={{padding:40,textAlign:'center'}}>
          <h1>404 – Lost in heart-break</h1>
          <Link href="/">Go home</Link>
        </main>
      </>
    );
  }
  