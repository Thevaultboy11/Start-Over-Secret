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

const SignupPage: React.FC = () => {
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

      // Create user initial data in Realtime Database
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

      // Send email verification
      await sendEmailVerification(user, {
        url: window.location.origin + '/login',  // Redirect user to login after email confirm
        handleCodeInApp: true,
      });

      setSuccess(true);
      setOpenSnackbar(true);

      // Optional: redirect after some seconds
      setTimeout(() => {
        router.push('/login');
      }, 5000); // 5 seconds
    } catch (err: any) {
      const code = err.code;
      const messages: { [key: string]: string } = {
        'auth/email-already-in-use': 'Email is already in use.',
        'auth/invalid-email': 'Invalid email format.',
        'auth/operation-not-allowed': 'Email sign-up is currently disabled.',
        'auth/weak-password': 'Password is too weak.',
        'auth/too-many-requests': 'Too many attempts. Try again later.'
      };
      setError(messages[code] || err.message);
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <Head>
        <title>Sign Up</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://breakupaidkit.com/signup" />
      </Head>

      <Box p={2} pt={3}>
        {success ? (
          <Paper elevation={3} sx={{ p: 2, borderRadius: 2, width: '100%', maxWidth: 400, margin: '0 auto' }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              ✅ Next Step
            </Typography>
            <Typography fontSize={14} color="text.secondary" mt={1}>
              • Go to your email inbox<br />
              • Check spam/promotions folder<br />
              • The email comes from <strong>noreply@breakupaidkit.com</strong><br />
              • Click the confirmation link<br />
              • You'll be redirected automatically<br />
              <br />
              Thank you for protecting our community! 💖
            </Typography>
          </Paper>
        ) : (
          <Paper elevation={3} sx={{ p: 2, borderRadius: 2, width: '100%', maxWidth: 400, margin: '0 auto' }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Create Your Healing Account
            </Typography>

            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              helperText="We’ll send a confirmation link to this address 💌"
            />

            <TextField
              label="Password"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText="Password must be at least 6 characters with letters and numbers."
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
              Create Account
            </Button>

            <Typography mt={2} fontSize={14} color="text.secondary">
              Quick signup. No phone verification, no annoying personal questions!
            </Typography>
          </Paper>
        )}

        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
          <Alert onClose={() => setOpenSnackbar(false)} severity={success ? 'success' : 'error'} sx={{ width: '100%' }}>
            {success
              ? '✅ Account created! Please check your email.'
              : error}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default SignupPage;
