import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase-config';
import { useRouter } from 'next/router';
import Head from 'next/head';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<'success' | 'error' | 'info'>('info');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const router = useRouter();

  const handleReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email, {
        url: window.location.origin + '/login', // After password reset, they go to login
        handleCodeInApp: true,
      });
      setMessage('✅ Password reset email sent! Check your inbox.');
      setSeverity('success');
      setOpenSnackbar(true);
    } catch (error: any) {
      const code = error.code;
      const messages: { [key: string]: string } = {
        'auth/user-not-found': 'No user found with this email.',
        'auth/invalid-email': 'Invalid email address format.',
        'auth/too-many-requests': 'Too many requests. Please try again later.'
      };
      setMessage(messages[code] || error.message);
      setSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Head>
        <title>Forgot Password</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://breakupaidkit.com/forgot-password" />
      </Head>

      <Box p={2} pt={3}>
        <Paper elevation={3} sx={{ p: 2, borderRadius: 2, width: '100%', maxWidth: 400, margin: '0 auto' }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Forgot Your Password?
          </Typography>

          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            helperText="We'll send you a link to reset it 📩"
          />

          <Button
            variant="contained"
            fullWidth
            onClick={handleReset}
            sx={{ mt: 2, fontSize: 16, fontWeight: 'bold', textTransform: 'none' }}
          >
            Send Reset Link
          </Button>

          <Typography mt={2} fontSize={14} color="text.secondary">
            We'll never spam you. 💖
          </Typography>
        </Paper>

        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={severity} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default ForgotPasswordPage;
