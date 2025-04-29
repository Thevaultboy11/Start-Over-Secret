// pages/your-page.tsx
import withAuth from '../components/withAuth';
import Head from 'next/head';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { Typography, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';

const messages = [
  "He's not the one. Trust that.",
  "Remember the nights you cried.",
  "You deserve peace, not confusion.",
  "Love shouldn’t feel like survival.",
  "He made you doubt your worth.",
  "You are healing, don’t reopen the wound.",
  "You broke free. Stay free.",
  "He never showed up the way you needed.",
  "Texting him won’t bring closure.",
  "You already know the answer.",
  "Don’t go back to what broke you.",
  "He didn’t change. You did.",
  "Missing him isn’t a reason to reach out.",
  "You’ve come so far.",
  "Feelings fade. Your peace stays.",
  "You were always too much for him.",
  "Choose your future over your past.",
  "You are not his option.",
  "The silence is healing you.",
  "He didn’t fight for you. Don’t fight for him.",
  "You owe him nothing.",
  "Healing > Hoping he’ll change.",
  "Protect your peace at all costs.",
  "He taught you what you don’t want.",
  "You're not hard to love. He just wasn’t capable.",
  "If he cared, you'd know.",
  "You are not a backup plan.",
  "Closure comes from within, not his texts.",
  "It ended for a reason. Trust that.",
  "Don’t romanticize the pain.",
  "You deserve consistency, not chaos.",
  "He doesn’t get access to the healed you.",
  "You’ve already forgiven enough.",
  "The right person won’t leave.",
  "Don’t text your trauma.",
  "Stay strong. You’re breaking the cycle.",
  "His name doesn’t belong in your future.",
  "You're not lonely, you're detoxing.",
  "You are the one that got away.",
  "He's a memory, not a mission.",
  "You're building something better.",
  "You outgrew his love.",
  "No message will fix what was broken.",
  "You don’t need to explain yourself again.",
  "You cried over him — now rise from him.",
  "He’s not your home anymore.",
  "You’ve survived harder things.",
  "Don’t confuse missing him with needing him.",
  "You gave your best. He didn’t.",
  "You are not meant to chase.",
  "He’s not worth the setback.",
  "Text a friend, not your ex.",
  "What you're looking for isn't in the past.",
  "Your energy deserves better.",
  "That ‘what if’ is a trap.",
  "Don’t invite him into your peace.",
  "It’s time to heal, not repeat.",
  "You were the blessing, not him.",
  "He doesn’t deserve a second chance.",
  "Your heart is not a revolving door.",
  "The pain taught you power.",
  "You’re rewriting your story, not rereading his.",
  "Stop rewriting red flags as memories.",
  "You're not alone — you're free.",
  "You deserve someone who shows up.",
  "You are the closure.",
  "You are not his therapist.",
  "Pain isn’t love.",
  "You deserve effort, not excuses.",
  "Reaching out won’t heal you.",
  "He’s not confused. He’s just not choosing you.",
  "Love shouldn’t hurt like that.",
  "That text won't change anything.",
  "Choose yourself again.",
  "Some lessons come in heartbreak.",
  "You’re not stuck — you’re healing.",
  "Don’t settle for bare minimum love.",
  "You’re glowing without him.",
  "Your heart is learning freedom.",
  "He didn’t choose you then. Why now?",
  "You’re too rare to go back.",
  "This time, protect your energy.",
  "You are not his emotional support.",
  "He doesn't get another version of you.",
  "Distance is your new boundary.",
  "Don't mistake silence for loneliness.",
  "Your growth deserves better company.",
  "You’ve changed. He hasn’t.",
  "Let go with grace.",
  "Texting him = instant regret.",
  "Healing hurts less than staying hurt.",
  "Don’t text someone who left you broken.",
  "There’s no spark left to rekindle.",
  "You’ve earned your peace.",
  "What if… will never beat what’s next.",
  "You are the storm he couldn't handle.",
  "Be proud of how far you've come.",
  "Don’t chase. Attract.",
  "Your value doesn’t decrease based on his absence.",
  "You’re not his second chance.",
  "The right one wouldn’t let you go.",
  "Texting him won't turn him into who you needed.",
  "You’re allowed to move on.",
  "Trust the no-contact process.",
  "Not texting him is the real glow up."
];


function ExButton() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [shuffledMessages, setShuffledMessages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const shuffled = [...messages].sort(() => 0.5 - Math.random());
    setShuffledMessages(shuffled);
  }, []);

  const handleClick = () => {
    setCurrentIndex((prev) => (prev + 1) % shuffledMessages.length);
  };

  if (loading) return <div>Loading...</div>;   // while Firebase checks

  if (!user) {
    // extra safety; withAuth should already redirect
    if (typeof window !== 'undefined') router.push('/login');
    return null;
  }

  return (
    <>
      <Head>
        <title>Ex Button</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://breakupaidkit.com/ex-button" />
      </Head>

      <Typography
        variant="h6"
        fontWeight="bold"
        color="white"
        sx={{ px: 2, pt: 2, pb: 4,  textAlign: { xs: 'left', sm: 'center' }}}
      >
        Remember Your Journey
      </Typography>

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
          More Strength
        </Typography>
      </motion.div>

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
