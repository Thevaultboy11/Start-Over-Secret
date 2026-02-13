import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase-config';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useTranslate } from '../hooks/useTranslate';

const ForgotPasswordPage: React.FC = () => {
  const t = useTranslate();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<'success' | 'error' | 'info'>('info');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const router = useRouter();

  const handleReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email, {
        url: window.location.origin + '/login',
        handleCodeInApp: true,
      });

      setMessage(t("forgotPasswordPage.messages.success"));
      setSeverity('success');
      setOpenSnackbar(true);

    } catch (error: any) {
      const code = error.code;

      const messages: Record<string, string> = {
        'auth/user-not-found': t("forgotPasswordPage.messages.userNotFound"),
        'auth/invalid-email': t("forgotPasswordPage.messages.invalidEmail"),
        'auth/too-many-requests': t("forgotPasswordPage.messages.tooManyRequests"),
      };

      setMessage(messages[code] ?? t("forgotPasswordPage.messages.unknown"));
      setSeverity('error');
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <Head>
        <title>{t("forgotPasswordPage.title")}</title>
      </Head>

      <Box p={2} pt={3}>
        <Paper elevation={3} sx={{ p: 2, borderRadius: 2, width: '100%', maxWidth: 400, margin: '0 auto' }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {t("forgotPasswordPage.heading")}
          </Typography>

          <TextField
            label={t("forgotPasswordPage.emailLabel")}
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            helperText={t("forgotPasswordPage.emailHelper")}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={handleReset}
            sx={{ mt: 2, fontSize: 16, fontWeight: 'bold', textTransform: 'none' }}
          >
            {t("forgotPasswordPage.resetButton")}
          </Button>

          <Typography mt={2} fontSize={14} color="text.secondary">
            {t("forgotPasswordPage.noSpamText")}
          </Typography>
        </Paper>

        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
          <Alert onClose={() => setOpenSnackbar(false)} severity={severity} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default ForgotPasswordPage;
