// pages/emotional-gym.tsx
import React, { useState } from 'react';
import withAuth from '../components/withAuth';
import Head from 'next/head';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import {
  Box,
  Typography,
  Button,
  Paper,
  Chip,
  RadioGroup,
  FormControlLabel,
  Radio,
  Collapse,
  Grid
} from '@mui/material';
import { motion } from 'framer-motion';

// IMPORT BOTH DATASETS
import { emotionalGymEN } from "../data/emotionalGym";
import { emotionalGymBH } from "../data/emotionalGym";

// TRANSLATION HOOK + LANGUAGE CONTEXT
import { useTranslate } from "@/hooks/useTranslate";
import { useContext } from "react";
import { LanguageContext } from "@/context/LanguageContext";

function EmotionalGym() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const t = useTranslate();
  const { language } = useContext(LanguageContext);   // <── Detect current language

  // CHOOSE DATASET BASED ON LANGUAGE
  const data = language === "bs" ? emotionalGymBH : emotionalGymEN;

  const [selected, setSelected] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const [activeCategory, setActiveCategory] = useState(data[0].category);
  const [scenarioIndex, setScenarioIndex] = useState(0);

  const currentCategoryData = data.find(cat => cat.category === activeCategory);
  const currentScenario = currentCategoryData?.scenarios[scenarioIndex];

  const handleSubmit = () => {
    if (selected) setSubmitted(true);
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setSelected('');
    setSubmitted(false);
    setShowFullText(false);
    setScenarioIndex(0);
  };

  const handleNext = () => {
    if (currentCategoryData && scenarioIndex < currentCategoryData.scenarios.length - 1) {
      setScenarioIndex(scenarioIndex + 1);
      setSelected('');
      setSubmitted(false);
      setShowFullText(false);
    }
  };

  const handlePrevious = () => {
    if (scenarioIndex > 0) {
      setScenarioIndex(scenarioIndex - 1);
      setSelected('');
      setSubmitted(false);
      setShowFullText(false);
    }
  };

  if (!currentScenario) return null;

  if (loading) {
    return <div>{t("emotionalGymPage.loading")}</div>;
  }

  if (!user) {
    if (typeof window !== 'undefined') router.push('/login');
    return null;
  }

  return (
    <>
      <Head>
        <title>{t("emotionalGymPage.title")}</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://breakupaidkit.com/emotional-gym" />
      </Head>

      <Box p={2} pt={3}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {t("emotionalGymPage.title")}
        </Typography>

        {/* CATEGORY BUTTONS */}
        <Grid container spacing={1} mb={2}>
          {data.map((cat) => (
            <Grid size={{ xs: 6 }} key={cat.category}>
              <Button
                variant={activeCategory === cat.category ? 'contained' : 'outlined'}
                fullWidth
                onClick={() => handleCategoryChange(cat.category)}
                sx={{
                  textTransform: 'none',
                  borderRadius: 2,
                  color: 'white',
                  borderColor: 'white',
                  bgcolor: activeCategory === cat.category ? 'primary.main' : 'transparent',
                }}
              >
                {cat.category}
              </Button>
            </Grid>
          ))}
        </Grid>

        {/* SCENARIO CARD */}
        <Paper
          sx={{
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: 2,
            backgroundColor: '#000',
            p: 2
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Chip
              label={`${currentCategoryData.icon} ${activeCategory}`}
              sx={{ fontSize: 12, color: 'white', bgcolor: 'rgba(255,255,255,0.08)' }}
            />

            <Typography fontSize={12} color="gray">
              {t("emotionalGymPage.scenarioCount")}
            </Typography>
          </Box>

          <Typography fontSize={16} fontWeight="bold" gutterBottom>
            {currentScenario.title}
          </Typography>

          <Typography fontSize={14} color="white">
            {showFullText ? currentScenario.text : currentScenario.text.slice(0, 140) + '...'}
            {!showFullText && (
              <Button
                size="small"
                onClick={() => setShowFullText(true)}
                sx={{ textTransform: 'none', ml: 1 }}
              >
                {t("emotionalGymPage.loadMore")}
              </Button>
            )}
          </Typography>

          {!submitted && (
            <RadioGroup value={selected} onChange={(e) => setSelected(e.target.value)}>
              {currentScenario.options.map((opt, idx) => (
                <FormControlLabel
                  key={idx}
                  value={opt}
                  control={<Radio />}
                  label={<Typography fontSize={14}>{opt}</Typography>}
                />
              ))}
            </RadioGroup>
          )}

          {!submitted && (
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              sx={{ mt: 2, textTransform: 'none' }}
              disabled={!selected}
            >
              {t("emotionalGymPage.submitAnswer")}
            </Button>
          )}

          <Collapse in={submitted}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Typography
                mt={2}
                fontSize={14}
                color={selected === currentScenario.correct_answer ? 'green' : 'red'}
              >
                {selected === currentScenario.correct_answer
                  ? t("emotionalGymPage.correct")
                  : t("emotionalGymPage.incorrect")}
              </Typography>

              <Typography mt={1} fontSize={14}>
                {currentScenario.correct_answer_explanation}
              </Typography>
            </motion.div>
          </Collapse>

          <Box mt={3} display="flex" justifyContent="space-between">
            <Button
              variant="text"
              color="primary"
              sx={{ textTransform: 'none' }}
              disabled={scenarioIndex === 0}
              onClick={handlePrevious}
            >
              {t("emotionalGymPage.previous")}
            </Button>

            <Button
              variant="text"
              color="primary"
              sx={{ textTransform: 'none' }}
              disabled={
                !currentCategoryData ||
                scenarioIndex === currentCategoryData.scenarios.length - 1
              }
              onClick={handleNext}
            >
              {t("emotionalGymPage.next")}
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
}

export default withAuth(EmotionalGym);
