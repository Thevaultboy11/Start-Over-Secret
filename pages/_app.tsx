// pages/_app.tsx
import type { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext';   // keep your old file
import { ThemeProvider, CssBaseline } from "@mui/material";
import Layout from '@/components/Layout';
import theme from "../theme";

export default function App({ Component, pageProps }: AppProps) {
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
