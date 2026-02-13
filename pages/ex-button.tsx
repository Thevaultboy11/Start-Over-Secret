// pages/ex-button.tsx
import withAuth from '../components/withAuth';
import Head from 'next/head';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useContext } from 'react';
import { Typography, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import { exMessagesEN, exMessagesBS } from "../data/exButtonMessage";
import { LanguageContext } from "@/context/LanguageContext";
import { useTranslate } from "../hooks/useTranslate"; // ★ ADDED

function ExButton() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const theme = useTheme();
  const t = useTranslate(); // ★ ADDED

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { language } = useContext(LanguageContext);

  // Messages depending on language
  const messages = language === "bs" ? exMessagesBS : exMessagesEN;

  const [shuffledMessages, setShuffledMessages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const shuffled = [...messages].sort(() => 0.5 - Math.random());
    setShuffledMessages(shuffled);
  }, [language]); // ★ RE-SHUFFLE when language changes

  const handleClick = () => {
    setCurrentIndex((prev) => (prev + 1) % shuffledMessages.length);
  };

  if (loading) return <div>{t("common.loading")}</div>;

  if (!user) {
    if (typeof window !== 'undefined') router.push('/login');
    return null;
  }

  return (
    <>
      <Head>
        <title>{t("exButtonPage.title")}</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://breakupaidkit.com/ex-button" />
      </Head>

      {/* HEADER */}
      <Typography
        variant="h6"
        fontWeight="bold"
        color="white"
        sx={{ px: 2, pt: 2, pb: 4, textAlign: { xs: 'left', sm: 'center' } }}
      >
        {t("exButtonPage.header")}
      </Typography>

      {/* BUTTON */}
      <motion.div
        initial={{ scale: 1 }}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
        onClick={handleClick}
        style={{
          backgroundColor: 'rgba(255, 7, 58, 0.7)',
          borderRadius: '50%',
          width: 200,
          height: 200,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '2rem auto 1.5rem auto',
          cursor: 'pointer',
          boxShadow: '0 0 20px rgba(255, 7, 58, 0.7)'
        }}
      >
        <Typography fontSize={16} fontWeight="bold" color="rgba(255, 255, 255, 0.9)">
          {t("exButtonPage.button")}
        </Typography>
      </motion.div>

      {/* MESSAGE */}
      {shuffledMessages.length > 0 && (
        <Typography
          fontSize={14}
          fontStyle="italic"
          color="white"
          textAlign="center"
          maxWidth="80%"
          sx={{ mx: 'auto', px: 2 }}
        >
          “{shuffledMessages[currentIndex]}”
        </Typography>
      )}
    </>
  );
}

export default withAuth(ExButton);
