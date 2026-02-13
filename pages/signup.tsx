// pages/signup.tsx
import React, { useState } from 'react';
import {
  TextField, Button, Typography, Box, Paper, Snackbar, Alert,
  IconButton, InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { ref, set, getDatabase } from 'firebase/database';
import { auth } from '../firebase-config';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useTranslate } from '../hooks/useTranslate'; // ← ADDED

const SignupPage: React.FC = () => {
  const t = useTranslate(); // ← TRANSLATION HOOK

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const router = useRouter();

  const handleSignUp = async () => {
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create user initial data
      const db = getDatabase();
      await set(ref(db, 'users/' + user.uid), {
        consistencyStreak: 0,
        activityCounts: {
          "✅ Exercise": 0,
          "💬 Therapy": 0,
          "🧑‍🤝‍🧑 Social Time": 0,
          "💧 Hydration": 0,
          "🌬️ Breathing": 0,
          "🪥 Dry Brushing": 0,
          "🤗 Hugged Someone": 0,
          "🛁 Took a Bath": 0,
          "🥗 Ate a Healthy Meal": 0,
          "😴 Took a Nap": 0,
          "✨ Spiritual Practice": 0,
          "🎨 Creative Hobby": 0,
          "🧘 Meditated": 0
        },
        dailyReflections: []
      });

      // Send verification email
      await sendEmailVerification(user, {
        url: window.location.origin + '/login',
        handleCodeInApp: true,
      });

      setSuccess(true);
      setOpenSnackbar(true);

      setTimeout(() => {
        router.push('/login');
      }, 10000);

    } catch (err: any) {
      const code = err.code;

      const messages: Record<string, string> = {
        'auth/email-already-in-use': t("signupPage.errors.emailInUse"),
        'auth/invalid-email': t("signupPage.errors.invalidEmail"),
        'auth/operation-not-allowed': t("signupPage.errors.signUpDisabled"),
        'auth/weak-password': t("signupPage.errors.weakPassword"),
        'auth/too-many-requests': t("signupPage.errors.tooManyRequests"),
      };

      setError(messages[code] ?? t("signupPage.errors.unknown"));
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <Head>
        <title>{t("signupPage.title")}</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://breakupaidkit.com/signup" />
      </Head>

      <Box p={2} pt={3}>
        {success ? (
          <Paper elevation={3} sx={{ p: 2, borderRadius: 2, width: '100%', maxWidth: 400, margin: '0 auto' }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {t("signupPage.successTitle")}
            </Typography>

            <Typography fontSize={14} color="text.secondary" mt={1}>
              {t("signupPage.successLine1")}<br />
              {t("signupPage.successLine2")}<br />
              {t("signupPage.successLine3")} <strong>noreply@breakupaidkit.com</strong><br />
              {t("signupPage.successLine4")}<br />
              {t("signupPage.successLine5")}<br /><br />
              {t("signupPage.successThankYou")}
            </Typography>

            <Typography fontSize={14} color="text.secondary" mt={1}>
              {t("signupPage.successTrialInfo")}
            </Typography>
          </Paper>
        ) : (
          <Paper elevation={3} sx={{ p: 2, borderRadius: 2, width: '100%', maxWidth: 400, margin: '0 auto' }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {t("signupPage.title")}
            </Typography>

            <TextField
              label={t("signupPage.emailLabel")}
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              helperText={t("signupPage.emailHelper")}
            />

            <TextField
              label={t("signupPage.passwordLabel")}
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText={t("signupPage.passwordHelper")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            {error && (
              <Typography fontSize={14} color="error" mt={1}>
                {error}
              </Typography>
            )}

            <Button
              variant="contained"
              fullWidth
              onClick={handleSignUp}
              sx={{ mt: 2, fontSize: 16, fontWeight: 'bold', textTransform: 'none' }}
            >
              {t("signupPage.createAccountButton")}
            </Button>

            <Typography mt={2} fontSize={14} color="text.secondary">
              {t("signupPage.quickSignupInfo")}
            </Typography>
          </Paper>
        )}

        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
          <Alert onClose={() => setOpenSnackbar(false)} severity={success ? 'success' : 'error'} sx={{ width: '100%' }}>
            {success ? t("signupPage.snackbarSuccess") : error}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default SignupPage;
