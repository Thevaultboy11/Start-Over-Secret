import React, { useContext, useState } from 'react';
import {
  Chart as ChartJS,
  /* controllers we actually use */
  RadarController,
  DoughnutController,
  BarController,
  /* shared scales / elements */
  RadialLinearScale,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar, Bar, Doughnut } from 'react-chartjs-2';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  Slider,
  Chip,
} from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import { questionsBS, questionsEN } from '../data/getBackWithEx';
import { getBackWithExContentBS, getBackWithExContentEN } from '@/data/getBackWithExContent';
import { LanguageContext } from '@/context/LanguageContext';
/* ------------------------------------------------------------------ */
/*  Chart.js – one‑time global registration                           */
/* ------------------------------------------------------------------ */
ChartJS.register(
  RadarController,
  DoughnutController,
  BarController,
  RadialLinearScale,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */
type Stage = 'start' | 'quiz' | 'results';
type Factor = 'ER' | 'TPI' | 'CD' | 'PG' | 'EF';

interface QuestionBase<T> {
  id: keyof Responses;
  factor: Factor;
  text: string;
  type: 'radio' | 'slider';
  options?: readonly T[];
}
type Question = QuestionBase<string | never>;

interface Responses {
  q1_loveEx?: string;
  q2_missScale?: number;
  q3_thinkFrequency?: string;
  q4_feelingOnSeeing?: string;
  q5_datingDifficulty?: string;
  q6_issuesResolved?: string;
  q7_ownPart?: string;
  q8_problemsSolvable?: string;
  q9_trustEase?: string;
  q10_abuse?: string;
  q11_argumentFreq?: string;
  q12_toxicity?: string;
  q13_sharedValues?: string;
  q14_bestVersion?: string;
  q15_initiator?: string;
  q16_selfFocus?: string;
  q17_exGrowth?: string;
  q18_betterPartner?: string;
  q19_bothGrown?: string;
  q20_confidenceNoRepeat?: string;
  q21_lastContact?: string;
  q22_socialOpinion?: string;
  q23_pressure?: string;
  q24_externalTies?: string;
  q25_willingEffort?: string;
}

interface Scores {
  emotionalReadiness: number;
  trustPastIssues: number;
  compatibilityDynamics: number;
  personalGrowth: number;
  externalFactors: number;
  reuniteIndex: number;
}

interface GraphData {
  lastContactBucket: string;
  radar: number[];
  bars: Omit<Scores, 'reuniteIndex'>;
  gaugeValue: number;
}

interface ResultPayload {
  userId: string;
  timestamp: string;
  responses: Responses;
  scores: Scores;
  flags: { abuse: boolean; autoReject: boolean };
  graphData: GraphData;
}

/* ------------------------------------------------------------------ */
/*  Question list                                                     */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */
const factorKeys: Record<Factor, (keyof Responses)[]> = {
  ER: ['q1_loveEx', 'q2_missScale', 'q3_thinkFrequency', 'q4_feelingOnSeeing', 'q5_datingDifficulty'],
  TPI: ['q6_issuesResolved', 'q7_ownPart', 'q8_problemsSolvable', 'q9_trustEase', 'q10_abuse'],
  CD: ['q11_argumentFreq', 'q12_toxicity', 'q13_sharedValues', 'q14_bestVersion', 'q15_initiator'],
  PG: ['q16_selfFocus', 'q17_exGrowth', 'q18_betterPartner', 'q19_bothGrown', 'q20_confidenceNoRepeat'],
  EF: ['q21_lastContact', 'q22_socialOpinion', 'q23_pressure', 'q24_externalTies', 'q25_willingEffort'],
};

const scoreMap: Record<keyof Responses, number[] | null> = {
  q1_loveEx: [3, 2, 1, 0],
  q2_missScale: null,
  q3_thinkFrequency: [0, 1, 2, 3],
  q4_feelingOnSeeing: [1, 2, 3, 0],
  q5_datingDifficulty: [0, 1, 2],
  q6_issuesResolved: [2, 1, 0],
  q7_ownPart: [2, 1, 0],
  q8_problemsSolvable: [2, 1, 0],
  q9_trustEase: [2, 1, 0],
  q10_abuse: [0, 1, 2],
  q11_argumentFreq: [3, 2, 1, 0],
  q12_toxicity: [2, 1, 0],
  q13_sharedValues: [2, 1, 0],
  q14_bestVersion: [2, 1, 0],
  q15_initiator: [2, 1, 0],
  q16_selfFocus: [2, 1, 0],
  q17_exGrowth: [2, 1, 0],
  q18_betterPartner: [2, 1, 0],
  q19_bothGrown: [2, 1, 0],
  q20_confidenceNoRepeat: [2, 1, 0],
  q21_lastContact: [0, 1, 2, 3],
  q22_socialOpinion: [2, 1, 0],
  q23_pressure: [2, 1, 0],
  q24_externalTies: [0, 1, 2],
  q25_willingEffort: [2, 1, 0],
};

const getOptionIndex = (
  questions: Question[],
  id: keyof Responses,
  ans: string | number | undefined
): number => {
  if (typeof ans !== 'string') return -1;
  const question = questions.find((q) => q.id === id);
  if (!question?.options) return -1;
  return question.options.indexOf(ans);
};

const mapAnswerToPoints = (questions: Question[], id: keyof Responses, ans: string | number | undefined): number => {
  if (ans === undefined) return 0;
  if (id === 'q2_missScale') return Math.round(((Number(ans) - 1) / 9) * 2);

  const answerIndex = getOptionIndex(questions, id, ans);
  if (answerIndex < 0) return 0;

  const mapped = scoreMap[id];
  if (!mapped) return 0;
  return mapped[answerIndex] ?? 0;
};

const isAbuseAnswer = (questions: Question[], ans: string | number | undefined): boolean => {
  return getOptionIndex(questions, 'q10_abuse', ans) === 2;
};

const mapBarLabels = (
  bars: GraphData['bars'],
  labels: typeof getBackWithExContentEN.results.charts.barLabels
) => {
  return (Object.keys(bars) as (keyof GraphData['bars'])[]).map((key) => labels[key]);
};

export default function GetBackWithEx() {
  const [stage, setStage] = useState<Stage>('start');
  const [responses, setResponses] = useState<Responses>({});
  const [result, setResult] = useState<ResultPayload | null>(null);
  const { language } = useContext(LanguageContext);
  const questions: Question[] =  language === "bs" ? questionsBS : questionsEN;
  const content = language === 'bs' ? getBackWithExContentBS : getBackWithExContentEN;
  
  
  /* -------------- handlers -------------- */
  const handleRadioChange  = (id: keyof Responses, v: string) =>
    setResponses((p) => ({ ...p, [id]: v }));
  const handleSliderChange = (id: keyof Responses, v: number) =>
    setResponses((p) => ({ ...p, [id]: v }));

  /* -------------- scoring -------------- */
  const computeScores = (): Scores => {
    const factorScores: Record<Factor, number> = { ER: 0, TPI: 0, CD: 0, PG: 0, EF: 0 };
    (Object.keys(factorKeys) as Factor[]).forEach((f) => {
      const sum = factorKeys[f].reduce(
        (a, q) => a + mapAnswerToPoints(questions, q, responses[q]),
        0
      );
      factorScores[f] = Math.round((sum / (5 * 2)) * 100);
    });
    const abuse = isAbuseAnswer(questions, responses.q10_abuse);
    const reuniteIndex = abuse
      ? 0
      : Math.round(
          Object.values(factorScores).reduce((a, b) => a + b, 0) / 5
        );
    return {
      emotionalReadiness: factorScores.ER,
      trustPastIssues: factorScores.TPI,
      compatibilityDynamics: factorScores.CD,
      personalGrowth: factorScores.PG,
      externalFactors: factorScores.EF,
      reuniteIndex,
    };
  };

  const handleSubmit = () => {
    const scores = computeScores();
    const payload: ResultPayload = {
      userId: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      responses,
      scores,
      flags: {
        abuse: isAbuseAnswer(questions, responses.q10_abuse),
        autoReject: scores.reuniteIndex === 0,
      },
      graphData: {
        lastContactBucket: responses.q21_lastContact ?? '',
        radar: [
          scores.emotionalReadiness,
          scores.trustPastIssues,
          scores.compatibilityDynamics,
          scores.personalGrowth,
          scores.externalFactors,
        ],
        bars: {
          emotionalReadiness: scores.emotionalReadiness,
          trustPastIssues: scores.trustPastIssues,
          compatibilityDynamics: scores.compatibilityDynamics,
          personalGrowth: scores.personalGrowth,
          externalFactors: scores.externalFactors,
        },
        gaugeValue: scores.reuniteIndex,
      },
    };
    setResult(payload);
    setStage('results');
  };

  const allAnswered = questions.every((q) => responses[q.id] !== undefined);

  /* ─────────────────────────── JSX ─────────────────────────── */
  return (
    <>
      <Head>
      <title>Should I Go Back to My Ex Quiz? – Alice Dautovic</title>
  <meta name="description" content="Before you go back, take the quiz. 25+ questions reveal trust, compatibility, and healing readiness. A breakup tool like no other." />
  <meta name="keywords" content="should i go back with ex - alice dautovic, alice dautovic ex quiz, alice dautovic should i go back with ex, breakup decision quiz alice dautovic, relationship reflection tool alice dautovic" />
  <link rel="canonical" href="https://breakupaidkit.com/get-back-with-ex/" />

  <meta property="og:title" content="Should I Go Back to My Ex? – Alice Dautovic" />
  <meta property="og:description" content="Get emotional clarity before making the next relationship decision. See 4 personalized charts that decode your past love." />
  <meta property="og:image" content="https://breakupaidkit.com/images/og-should-I-return.png" />
  <meta property="og:url" content="https://breakupaidkit.com/get-back-with-ex/" />
  <meta property="og:type" content="website" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Should I Go Back to My Ex? – Alice Dautovic" />
  <meta name="twitter:description" content="Reflect on your past relationship with 4 smart charts and 25 self-check questions." />
  <link rel="canonical" href="https://breakupaidkit.com/get-back-with-ex" />
       
      </Head>

      <div className="p-4 max-w-4xl mx-auto">
        {/* ---------- START PAGE ---------- */}
        {stage === 'start' && (
          <>
            <Box
              sx={{
                py: { xs: 8, sm: 10, md: 12 },
                textAlign: { xs: 'left', sm: 'center' },
                overflow: 'hidden',
              }}
            >
              <Container maxWidth="md">
                <Typography
                  variant="h2"
                  component="h1"
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                    mb: 3,
                    lineHeight: { xs: '1.2', sm: '1.3' },
                    fontSize: { xs: '2rem', sm: '3rem', md: '3.75rem' },
                  }}
                >
                  {content.start.title}
                </Typography>

                <Typography variant="h6" color="textSecondary" sx={{ mb: 4 }}>
                  {content.start.subtitle}
                </Typography>

                <Button
                  variant="contained"
                  onClick={() => setStage('quiz')}
                  sx={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    px: 3,
                    py: 1.2,
                    borderRadius: '999px',
                    bgcolor: 'rgba(255, 7, 58, 0.8)',
                    '&:hover': { bgcolor: 'rgba(255, 7, 58, 1)' },
                  }}
                >
                  {content.start.startButton}
                </Button>
              </Container>
            </Box>

                       {/* ----------------  WHO-IS-THIS-FOR section  ---------------- */}
                       <Box sx={{ py: 10 }}>
              <Container maxWidth="md">
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 4,
                    alignItems: 'center',
                  }}
                >
                  {/* Image */}
                  <Box
                    sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}
                  >
                    <Box
                      component="img"
                      src="/form_results.png"
                      alt="Insights and Actions"
                      sx={{ width: 350, height: 350, borderRadius: 2, objectFit: 'cover' }}
                    />
                  </Box>

                  {/* Text */}
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h4" fontWeight="bold" mb={4}>
                      {content.afterTest.title}
                    </Typography>

                    <Typography variant="h6" fontWeight="bold" color="textSecondary" mb={1}>
                      {content.afterTest.afterQuizTitle}
                    </Typography>
                    <List dense>
                      {content.afterTest.afterQuizItems.map((item) => (
                        <ListItem key={item}><ListItemText primary={item} /></ListItem>
                      ))}
                    </List>

                    <Typography variant="h6" fontWeight="bold" color="textSecondary" mt={3} mb={1}>
                      {content.afterTest.insightsTitle}
                    </Typography>
                    <List dense>
                      {content.afterTest.insightsItems.map((item) => (
                        <ListItem key={item}><ListItemText primary={item} /></ListItem>
                      ))}
                    </List>
                  </Box>
                </Box>
              </Container>
            </Box>

            {/* ----------------  CTA strip  ---------------- */}
            <Container maxWidth="md" sx={{ py: 10 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  border: '1px solid rgba(255, 7, 58, 0.8)',
                  borderRadius: 2,
                }}
              >
                <Grid container justifyContent="center">
                  <Grid size={{xs:12}}>
                    <Box textAlign="center">
                      <Typography variant="h5" fontWeight="bold" mb={1}>
                        {content.midCta.title}
                      </Typography>
                      <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{ mb: 3, fontWeight: 400 }}
                      >
                        {content.midCta.body}
                      </Typography>
                      <Button
                        variant="contained"
                        onClick={() => setStage('quiz')}
                        sx={{
                          fontSize: 16,
                          fontWeight: 'bold',
                          px: 3,
                          py: 1.2,
                          borderRadius: '999px',
                          bgcolor: 'rgba(255, 7, 58, 0.8)',
                          '&:hover': { bgcolor: 'rgba(255, 7, 58, 1)' },
                        }}
                      >
                        {content.midCta.button}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Container>
          </>
        )}

        {/* ---------- QUIZ FORM ---------- */}
        {stage === 'quiz' && (
          <Paper
            component="form"
            elevation={0}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            sx={{
              bgcolor: '#000',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 2,
              p: { xs: 2, sm: 4 },
              mb: 6,
            }}
          >
            {/* Intro */}
            <Box mb={4}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {content.quiz.stepTitle}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {content.quiz.instructions}
              </Typography>
            </Box>

            {/* Questions */}
            <Grid container spacing={4}>
              {questions.map((q, idx) => (
                <Grid size={{xs:12, sm:6}} key={q.id}>
                  <Paper
                    elevation={2}
                    sx={{
                      bgcolor: '#111',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 2,
                      p: 3,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    {/* Number */}
                    <Typography variant="caption" color="text.secondary" mb={1}>
                      Question {idx + 1} of {questions.length}
                    </Typography>

                    {/* Text */}
                    <Typography component="legend" fontSize={14} fontWeight="bold" mb={q.type === 'slider' ? 1 : 2}>
                      {q.text}
                    </Typography>

                    {/* Radio */}
                    {q.type === 'radio' && q.options && (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {q.options.map((opt) => (
                          <Chip
                            key={opt}
                            label={opt}
                            clickable
                            onClick={() => handleRadioChange(q.id, opt)}
                            color={responses[q.id] === opt ? 'primary' : 'default'}
                            variant={responses[q.id] === opt ? 'filled' : 'outlined'}
                            sx={{
                              color: 'white',
                              borderColor: 'rgba(255,255,255,0.4)',
                              '&.MuiChip-filled': { bgcolor: 'rgba(255,7,58,0.8)' },
                            }}
                          />
                        ))}
                      </Box>
                    )}

                    {/* Slider */}
                    {q.type === 'slider' && (
                      <Slider
                        min={1}
                        max={10}
                        step={1}
                        marks
                        value={responses[q.id] ?? 5 as any}
                        onChange={(_, v) => handleSliderChange(q.id, v as number)}
                        valueLabelDisplay="auto"
                        sx={{
                          mt: 2,
                          '& .MuiSlider-thumb': { bgcolor: 'rgba(255,7,58,0.9)' },
                          '& .MuiSlider-track': { bgcolor: 'rgba(255,7,58,0.9)' },
                          '& .MuiSlider-rail': { bgcolor: 'rgba(255,255,255,0.2)' },
                        }}
                      />
                    )}
                  </Paper>
                </Grid>
              ))}
            </Grid>

            {/* Submit */}
            <Button
              type="submit"
              variant="contained"
              disabled={!allAnswered}
              sx={{
                mt: 6,
                display: 'block',
                mx: 'auto',
                px: 4,
                py: 1.4,
                borderRadius: '999px',
                fontWeight: 'bold',
                bgcolor: 'rgba(255, 7, 58, 0.8)',
                '&:hover': { bgcolor: 'rgba(255, 7, 58, 1)' },
              }}
            >
              {content.quiz.submit}
            </Button>
          </Paper>
        )}

        {/* ---------- RESULTS ---------- */}
        {stage === 'results' && result && (() => {
          /* chart-ready datasets (identical logic) */
          const radarData = {
            labels: content.results.charts.radarLabels,
            datasets: [
              {
                label: content.results.charts.factorLegendLabel,
                data: result.graphData.radar,
                backgroundColor: 'rgba(79,195,247,0.2)',
                borderColor: '#4FC3F7',
                pointBackgroundColor: '#4FC3F7',
                pointBorderColor: '#fff',
              },
            ],
          };
          const radarOptions = {
            scales: {
              r: {
                min: 0,
                max: 100,
                ticks: { stepSize: 20, backdropColor: 'transparent', color: '#aaa' },
                grid: { color: 'rgba(255,255,255,0.1)' },
                angleLines: { color: 'rgba(255,255,255,0.1)' },
                pointLabels: { color: '#fff', font: { size: 12 } },
              },
            },
            plugins: { legend: { display: false } },
            responsive: true,
            maintainAspectRatio: false,
          } as const;

          const horizontalBarData = {
            labels: mapBarLabels(result.graphData.bars, content.results.charts.barLabels),
            datasets: [
              {
                label: content.results.charts.scoreLegendLabel,
                data: Object.values(result.graphData.bars),
                backgroundColor: '#FF073A',
              },
            ],
          };
          const horizontalBarOptions = {
            indexAxis: 'y' as const,
            scales: {
              x: { min: 0, max: 100, ticks: { color: '#aaa' }, grid: { color: 'rgba(255,255,255,0.05)' } },
              y: { ticks: { color: '#fff' } },
            },
            plugins: { legend: { display: false } },
            responsive: true,
            maintainAspectRatio: false,
          };

          const gaugeData = {
            labels: ['Score', 'Remaining'],
            datasets: [
              {
                data: [result.graphData.gaugeValue, 100 - result.graphData.gaugeValue],
                backgroundColor: ['#00E676', '#424242'],
                borderWidth: 0,
                cutout: '70%',
              },
            ],
          };
          const gaugeOptions = {
            plugins: { legend: { display: false }, tooltip: { enabled: false } },
            rotation: -90,
            circumference: 180,
            responsive: true,
            maintainAspectRatio: false,
          };

          const lastContactData = {
            labels: [content.results.charts.lastContactTitle],
            datasets: [
              {
                label: result.graphData.lastContactBucket,
                data: [1],
                backgroundColor: '#FFD54F',
              },
            ],
          };
          const lastContactOptions = {
            scales: { y: { display: false }, x: { display: false } },
            plugins: { legend: { position: 'bottom' as const, labels: { color: '#fff' } } },
            responsive: true,
            maintainAspectRatio: false,
          };

          return (
            
            <Box
            p={2}
            pt={4}
            pb={10}
            sx={{ maxWidth: 1200, mx: 'auto' }}      /* centre & cap width on XL */
          >
            {/* -----------  PERSONAL ANALYSIS  ----------- */}
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, sm: 4 },
                mb: 8,                                 /* big gap before charts */
                bgcolor: '#000',
                border: '2px solid rgba(79,195,247,0.35)',
                borderRadius: 2,
                maxWidth: 900,
                mx: 'auto',
              }}
            >
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {content.results.analysisTitle}
              </Typography>
          
              {result.scores.reuniteIndex < 60 ? (
  <>
    {content.results.lowScoreParagraphs.map((paragraph) => (
      <Typography key={paragraph} variant="body1" sx={{ mb: 2, lineHeight: 1.75 }}>
        {paragraph}
      </Typography>
    ))}
    <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.75 }}>
      {content.results.lowScoreListTitle}
      <ul style={{ marginTop: '0.5rem', paddingLeft: '1rem' }}>
        {content.results.lowScoreList.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Typography>
  </>
) : (
  <>
    {content.results.highScoreParagraphs.map((paragraph) => (
      <Typography key={paragraph} variant="body1" sx={{ mb: 2, lineHeight: 1.75 }}>
        {paragraph}
      </Typography>
    ))}
    <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.75 }}>
      {content.results.highScoreListTitle}
      <ul style={{ marginTop: '0.5rem', paddingLeft: '1rem' }}>
        {content.results.highScoreList.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Typography>
  </>
)}

          
              {/* -----------  BABY‑BLUE CTA (whole box clickable) ----------- */}
              <Box
                component={Link}
                href="/booking-call"
                sx={{
                  mt: 4,
                  p: { xs: 3, sm: 4 },
                  bgcolor: '#ff4fa0',
                  borderRadius: 2,
                  textAlign: 'center',
                  textDecoration: 'none',
                  display: 'block',
                  transition: 'background 0.2s',
                  '&:hover': { bgcolor: '#ff2e8b' },
                }}
              >
         <Typography variant="h5" fontWeight="bold" sx={{ color: '#fff', mb: 1 }}>
                  {content.results.consultationBoxTitle}
                </Typography>
                <Typography variant="body1" sx={{ color: '#fff', mb: 2, lineHeight: 1.6 }}>
                  {content.results.consultationBoxItems.map((item) => (
                    <React.Fragment key={item}>• {item}<br/></React.Fragment>
                  ))}
</Typography>
                <Button
                  variant="contained"
                  sx={{
                    px: 4,
                    py: 1.4,
                    fontWeight: 'bold',
                    textTransform: 'none',
                    borderRadius: '999px',
                    bgcolor: '#fff',
                    color: '#ff2e8b',
                    '&:hover': { bgcolor: '#e0f7ff' },
                  }}
                >
                  {content.results.consultationButton}
                </Button>
              </Box>
            </Paper>


              <Typography variant="h5" fontWeight="bold" textAlign="center" mb={4}>
                {content.results.reuniteIndexLabel}: {result.scores.reuniteIndex}
              </Typography>

              {/* charts grid */}
              <Grid container spacing={4} justifyContent="center">
                {/* Radar */}
                <Grid size={{xs:12, md:6}}>
                  <Paper
                    sx={{
                      p: 2,
                      bgcolor: '#000',
                      border: '1px solid rgba(255,255,255,0.15)',
                      height: '100%',
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      {content.results.charts.factorBreakdownTitle}
                    </Typography>
                    <Typography variant="body2" color="gray" gutterBottom>
                      {content.results.charts.factorBreakdownSubtitle}
                    </Typography>
                    <Box sx={{ position: 'relative', height: 300 }}>
                      <Radar data={radarData} options={radarOptions} />
                    </Box>
                  </Paper>
                </Grid>

                {/* Horizontal bars */}
                <Grid size={{xs:12, md:6}}>
                  <Paper
                    sx={{
                      p: 2,
                      bgcolor: '#000',
                      border: '1px solid rgba(255,255,255,0.15)',
                      height: '100%',
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      {content.results.charts.detailedScoresTitle}
                    </Typography>
                    <Typography variant="body2" color="gray" gutterBottom>
                      {content.results.charts.detailedScoresSubtitle}
                    </Typography>
                    <Box sx={{ position: 'relative', height: 300 }}>
                      <Bar data={horizontalBarData} options={horizontalBarOptions} />
                    </Box>
                  </Paper>
                </Grid>

                {/* Gauge */}
                <Grid size={{xs:12, md:4}}>
                  <Paper
                    sx={{
                      p: 2,
                      bgcolor: '#000',
                      border: '1px solid rgba(255,255,255,0.15)',
                      height: '100%',
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      {content.results.charts.overallGaugeTitle}
                    </Typography>
                    <Typography variant="body2" color="gray" gutterBottom>
                      {content.results.charts.overallGaugeSubtitle}
                    </Typography>
                    <Box sx={{ position: 'relative', height: 250 }}>
                      <Doughnut data={gaugeData} options={gaugeOptions} />
                      <Box
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -40%)',
                          textAlign: 'center',
                        }}
                      >
                        <Typography variant="h4" fontWeight="bold">
                          {result.graphData.gaugeValue}
                        </Typography>
                        <Typography variant="caption" color="gray">
                          / 100
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>

                {/* Last-contact bar */}
                <Grid size={{xs:12, md:8}}>
                  <Paper
                    sx={{
                      p: 2,
                      bgcolor: '#000',
                      border: '1px solid rgba(255,255,255,0.15)',
                      height: '100%',
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      {content.results.charts.lastContactTitle}
                    </Typography>
                    <Typography variant="body2" color="gray" gutterBottom>
                      {content.results.charts.lastContactSubtitle}
                    </Typography>
                    <Box sx={{ position: 'relative', height: 250 }}>
                      <Bar data={lastContactData} options={lastContactOptions} />
                    </Box>
                  </Paper>
                </Grid>
              </Grid>

              {/* retake */}
              <Button
                variant="contained"
                onClick={() => {
                  setResponses({});
                  setResult(null);
                  setStage('start');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                sx={{
                  mt: 6,
                  display: 'block',
                  mx: 'auto',
                  fontWeight: 'bold',
                  bgcolor: '#FF073A',
                  textTransform: 'none',
                  '&:hover': { bgcolor: '#c40024' },
                }}
              >
                {content.results.charts.retakeQuiz}
              </Button>
            </Box>
          );
        })()}
      </div>
    </>
  );
}
