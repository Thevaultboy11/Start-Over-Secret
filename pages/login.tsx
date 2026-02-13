import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Snackbar,
  Alert,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../firebase-config';
import { useAuth } from '../context/AuthContext';
import { useTranslate } from '../hooks/useTranslate';  // ← ADD THIS

const Login: React.FC = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const t = useTranslate();              // ← TRANSLATION HOOK

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [message, setMessage] = useState('');
  const [severity, setSeverity] =
    useState<'info' | 'success' | 'error' | 'warning'>('info');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  /* ───────────────────────── redirect if already verified ──────────────────── */
  useEffect(() => {
    if (!loading && user?.emailVerified) router.push('/dashboard');
  }, [loading, user, router]);

  /* ────────────────────────────── sign-in logic ────────────────────────────── */
  const handleLogin = async () => {
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      await cred.user.reload();

      if (!cred.user.emailVerified) {
        setMessage(t("loginPage.needEmailVerification"));
        setSeverity('warning');
        setOpenSnackbar(true);
        return;
      }

      setMessage(t("loginPage.loginSuccess"));
      setSeverity('success');
      setOpenSnackbar(true);
      router.push('/dashboard');
    } catch (err: any) {
      const errorMap: Record<string, string> = {
        'auth/wrong-password': t("loginPage.errors.wrongPassword"),
        'auth/user-not-found': t("loginPage.errors.userNotFound"),
        'auth/invalid-email': t("loginPage.errors.invalidEmail"),
        'auth/user-disabled': t("loginPage.errors.userDisabled"),
        'auth/too-many-requests': t("loginPage.errors.tooManyRequests"),
      };

      setMessage(errorMap[err.code] ?? t("loginPage.errors.unknown"));
      setSeverity('error');
      setOpenSnackbar(true);
    }
  };

  /* ──────────────────────────────── JSX ────────────────────────────────────── */
  return (
    <>
      <Head>
        <title>{t("loginPage.title")}</title>
        <meta name="robots" content="noindex,nofollow" />
        <link rel="canonical" href="https://breakupaidkit.com/login" />
      </Head>

      <Box p={2} pt={3}>
        <Paper
          elevation={3}
          sx={{
            p: 2,
            borderRadius: 2,
            width: '100%',
            maxWidth: 400,
            mx: 'auto',
          }}
        >
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {t("loginPage.title")}
          </Typography>

          <Typography fontSize={14} color="text.secondary" mb={2}>
            {t("loginPage.instructionsLine1")}
            <br />
            {t("loginPage.instructionsLine2")}
          </Typography>

          <TextField
            label={t("loginPage.emailLabel")}
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label={t("loginPage.passwordLabel")}
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((v) => !v)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* ─────────── navigation links ─────────── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              paddingBottom: "5px"
            }}
          >
            <Link href="/signup" passHref>
              <Typography
                component="a"
                fontSize={14}
                fontWeight="bold"
                mt={1}
                mb={2}
                sx={{ color: '#fff', textDecoration: 'underline' }}
              >
                {t("loginPage.didNotCreateAccount")}
              </Typography>
            </Link>

            <Link href="/forgot-password" passHref>
              <Typography
                component="a"
                fontSize={14}
                fontWeight="bold"
                mt={1}
                mb={2}
                sx={{ color: '#fff', textDecoration: 'underline' }}
              >
                {t("loginPage.forgotPassword")}
              </Typography>
            </Link>
          </div>

          <Button
            variant="contained"
            fullWidth
            onClick={handleLogin}
            sx={{ fontSize: 16, fontWeight: 'bold' }}
          >
            {t("loginPage.loginButton")}
          </Button>
        </Paper>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity={severity}
            sx={{ width: '100%' }}
          >
            {message}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default Login;
