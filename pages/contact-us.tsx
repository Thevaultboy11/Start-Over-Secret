import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Paper,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import Head from 'next/head';
import { useTranslate } from '../hooks/useTranslate';

const ContactUs = () => {
  const t = useTranslate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !comment) {
      setError(t("contactPage.errors.required"));
      return;
    }
    if (!validateEmail(email)) {
      setError(t("contactPage.errors.invalidEmail"));
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('access_key', 'dd74113f-44ad-4666-8981-551b2ea56081');
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('message', comment);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        setSuccess(true);
        setName('');
        setEmail('');
        setPhone('');
        setComment('');
      } else {
        setError(t("contactPage.errors.submissionFailed"));
      }
    } catch (err) {
      setError(t("contactPage.errors.unknown"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>{t("contactPage.title")}</title>
      </Head>

      <Box p={2} pt={6} pb={10}>
        <Typography variant="h4" fontWeight="bold" sx={{ pb: 2 }} textAlign="center" gutterBottom>
          {t("contactPage.title")}
        </Typography>

        <Paper
          component="form"
          onSubmit={handleSubmit}
          sx={{
            bgcolor: '#000',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: 2,
            p: 3,
            maxWidth: 600,
            mx: 'auto',
          }}
        >
          <TextField
            fullWidth
            label={t("contactPage.fields.name")}
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2 }}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
            required
          />
          <TextField
            fullWidth
            label={t("contactPage.fields.email")}
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
            required
          />
          <TextField
            fullWidth
            label={t("contactPage.fields.phone")}
            variant="outlined"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            sx={{ mb: 2 }}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label={t("contactPage.fields.comment")}
            variant="outlined"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{ mb: 2 }}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
            required
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : t("contactPage.submitButton")}
          </Button>
        </Paper>

        <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
          <Alert severity="error">{error}</Alert>
        </Snackbar>

        <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
          <Alert severity="success">{t("contactPage.successMessage")}</Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default ContactUs;
