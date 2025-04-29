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

const ContactUs = () => {
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
      setError('Please fill in all required fields.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
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
        setError('Submission failed. Please try again later.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
   <Head>
  <link rel="canonical" href="https://breakupaidkit.com/contact-us" />
</Head>
    <Box p={2} pt={6} pb={10}>
      <Typography variant="h4" fontWeight="bold" sx={{ pb: 2 }} textAlign="center" gutterBottom>
        Contact Us
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
          label="Name"
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
          label="Email"
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
          label="Phone Number (optional)"
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
          label="Comment"
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
          {loading ? <CircularProgress size={24} /> : 'Send Message'}
        </Button>
      </Paper>

      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>

      <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
        <Alert severity="success">Message sent successfully!</Alert>
      </Snackbar>
    </Box>
    </>
  );
};

export default ContactUs;