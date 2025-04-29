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

const Login: React.FC = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

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
        setMessage(
          '⚠️ You need to confirm your email before logging in. Check your inbox or spam folder.',
        );
        setSeverity('warning');
        setOpenSnackbar(true);
        return;
      }

      setMessage('🎉 Login successful!');
      setSeverity('success');
      setOpenSnackbar(true);
      router.push('/dashboard');
    } catch (err: any) {
      const friendly: Record<string, string> = {
        'auth/wrong-password': 'Incorrect password.',
        'auth/user-not-found': 'No account found with this email.',
        'auth/invalid-email': 'Invalid email address.',
        'auth/user-disabled': 'This account has been disabled.',
        'auth/too-many-requests': 'Too many attempts. Please try again later.',
      };
      setMessage(friendly[err.code] ?? err.message);
      setSeverity('error');
      setOpenSnackbar(true);
    }
  };

  /* ──────────────────────────────── JSX ────────────────────────────────────── */
  return (
    <>
      <Head>
        <title>Login</title>
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
            Log In
          </Typography>

          <Typography fontSize={14} color="text.secondary" mb={2}>
            First time logging in?
            <br /> You must confirm your email before using the app.
          </Typography>

          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
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

          {/* ─────────── navigation links (Next.js <Link>) ─────────── */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", paddingBottom: "5px" }}>
  <Link href="/register" passHref>
    <Typography
      component="a"
      fontSize={14}
      fontWeight="bold"
      mt={1}
      mb={2}
      sx={{ color: '#fff', textDecoration: 'underline' }}
    >
      Did Not Create Account?
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
      Forgot Password?
    </Typography>
  </Link>
</div>
          
          <Button
            variant="contained"
            fullWidth
            onClick={handleLogin}
            sx={{ fontSize: 16, fontWeight: 'bold' }}
          >
            Log In
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
