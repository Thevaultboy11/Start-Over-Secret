import React, { useState } from 'react';
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
import Router, { useRouter } from 'next/router';
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
const questions: Question[] = [
  { id: 'q1_loveEx', factor: 'ER', text: 'Do you still love your ex?', type: 'radio', options: ['Yes', 'Some', 'Unsure', 'No'] },
  { id: 'q2_missScale', factor: 'ER', text: 'On a scale of 1‑10, how much do you miss them?', type: 'slider' },
  { id: 'q3_thinkFrequency', factor: 'ER', text: 'How often do you think about your ex?', type: 'radio', options: ['Never', 'Occasionally', 'A lot', 'Constantly'] },
  { id: 'q4_feelingOnSeeing', factor: 'ER', text: 'How do you feel when you see (or imagine) them?', type: 'radio', options: ['Happy', 'Sad', 'Angry', 'Neutral'] },
  { id: 'q5_datingDifficulty', factor: 'ER', text: 'How difficult is it to date someone new?', type: 'radio', options: ['Not difficult', 'Challenging', "Haven’t tried"] },
  { id: 'q6_issuesResolved', factor: 'TPI', text: 'Have the breakup issues been resolved?', type: 'radio', options: ['Yes', 'Partly', 'No'] },
  { id: 'q7_ownPart', factor: 'TPI', text: 'Do you both own your part in what went wrong?', type: 'radio', options: ['Yes', 'Partly', 'No'] },
  { id: 'q8_problemsSolvable', factor: 'TPI', text: 'Can the old problems be solved now?', type: 'radio', options: ['Yes', 'Maybe', 'No'] },
  { id: 'q9_trustEase', factor: 'TPI', text: 'How easy would it be to trust your ex again?', type: 'radio', options: ['Can trust', 'Tough', 'Unsure'] },
  { id: 'q10_abuse', factor: 'TPI', text: 'Was there any abuse in the past?', type: 'radio', options: ['No', 'Isolated incident', 'Yes'] },
  { id: 'q11_argumentFreq', factor: 'CD', text: 'How often did you argue?', type: 'radio', options: ['Rarely', 'Sometimes', 'Often', 'Constantly'] },
  { id: 'q12_toxicity', factor: 'CD', text: 'Toxic behaviours or red flags?', type: 'radio', options: ['No', 'Some', 'Yes'] },
  { id: 'q13_sharedValues', factor: 'CD', text: 'Shared values & long‑term goals?', type: 'radio', options: ['Yes', 'Partly', 'No'] },
  { id: 'q14_bestVersion', factor: 'CD', text: 'Did the relationship bring out the best in you?', type: 'radio', options: ['Yes', 'Neutral', 'No'] },
  { id: 'q15_initiator', factor: 'CD', text: 'Who ended the relationship?', type: 'radio', options: ['I did', 'Mutual', 'My ex'] },
  { id: 'q16_selfFocus', factor: 'PG', text: 'Your focus since the breakup?', type: 'radio', options: ['Self‑growth', 'Distraction', 'No change'] },
  { id: 'q17_exGrowth', factor: 'PG', text: 'Has your ex shown personal growth?', type: 'radio', options: ['Yes', 'Maybe', 'No'] },
  { id: 'q18_betterPartner', factor: 'PG', text: 'Would you be a better partner now?', type: 'radio', options: ['Yes', 'Maybe', 'No'] },
  { id: 'q19_bothGrown', factor: 'PG', text: 'Have both of you grown emotionally?', type: 'radio', options: ['Yes', 'Partly', 'Not really'] },
  { id: 'q20_confidenceNoRepeat', factor: 'PG', text: 'Confidence the same mistakes won’t repeat?', type: 'radio', options: ['Yes', 'Not sure', 'No'] },
  { id: 'q21_lastContact', factor: 'EF', text: 'Time since last contact with your ex?', type: 'radio', options: ['< 1 week', '1‑4 wks', '1‑3 mths', '> 3 mths'] },
  { id: 'q22_socialOpinion', factor: 'EF', text: 'Friends & family opinion of reconciling?', type: 'radio', options: ['Supportive', 'Mixed', 'Against'] },
  { id: 'q23_pressure', factor: 'EF', text: 'Do you feel pressured to reconcile?', type: 'radio', options: ['No', 'A little', 'Yes'] },
  { id: 'q24_externalTies', factor: 'EF', text: 'External circumstances tying you together?', type: 'radio', options: ['Yes', 'Some', 'No'] },
  { id: 'q25_willingEffort', factor: 'EF', text: 'Are you willing to invest the effort to rebuild?', type: 'radio', options: ['Yes', 'I’ll try', 'Unsure'] },
];

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

const mapAnswerToPoints = (id: keyof Responses, ans: string | number | undefined): number => {
  if (ans === undefined) return 0;
  switch (id) {
    case 'q1_loveEx':          return ['No','Unsure','Some','Yes'].indexOf(ans as string);
    case 'q2_missScale':       return Math.round(((Number(ans) - 1) / 9) * 2);
    case 'q3_thinkFrequency':  return ['Never','Occasionally','A lot','Constantly'].indexOf(ans as string);
    case 'q4_feelingOnSeeing': return ['Neutral','Happy','Sad','Angry'].indexOf(ans as string);
    case 'q5_datingDifficulty':return ['Not difficult','Challenging',"Haven’t tried"].indexOf(ans as string);
    case 'q6_issuesResolved':
    case 'q7_ownPart':
    case 'q8_problemsSolvable':return ['No','Partly','Maybe','Yes'].indexOf(ans as string)%3;
    case 'q9_trustEase':       return ['Unsure','Tough','Can trust'].indexOf(ans as string);
    case 'q10_abuse':          return ['No','Isolated incident','Yes'].indexOf(ans as string);
    case 'q11_argumentFreq':   return ['Constantly','Often','Sometimes','Rarely'].indexOf(ans as string);
    case 'q12_toxicity':       return ['Yes','Some','No'].indexOf(ans as string);
    case 'q13_sharedValues':   return ['No','Partly','Yes'].indexOf(ans as string);
    case 'q14_bestVersion':    return ['No','Neutral','Yes'].indexOf(ans as string);
    case 'q15_initiator':      return ['My ex','Mutual','I did'].indexOf(ans as string);
    case 'q16_selfFocus':      return ['No change','Distraction','Self‑growth'].indexOf(ans as string);
    case 'q17_exGrowth':
    case 'q18_betterPartner':  return ['No','Maybe','Yes'].indexOf(ans as string);
    case 'q19_bothGrown':      return ['Not really','Partly','Yes'].indexOf(ans as string);
    case 'q20_confidenceNoRepeat': return ['No','Not sure','Yes'].indexOf(ans as string);
    case 'q21_lastContact':    return ['< 1 week','1‑4 wks','1‑3 mths','> 3 mths'].indexOf(ans as string);
    case 'q22_socialOpinion':  return ['Against','Mixed','Supportive'].indexOf(ans as string);
    case 'q23_pressure':       return ['Yes','A little','No'].indexOf(ans as string);
    case 'q24_externalTies':   return ['Yes','Some','No'].indexOf(ans as string);
    case 'q25_willingEffort':  return ['Unsure','I’ll try','Yes'].indexOf(ans as string);
    default: return 0;
  }
};

export default function GetBackWithEx() {
  const router = useRouter();                    // 👈 replaces useNavigate
  const [stage, setStage] = useState<Stage>('start');
  const [responses, setResponses] = useState<Responses>({});
  const [result, setResult] = useState<ResultPayload | null>(null);

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
        (a, q) => a + mapAnswerToPoints(q, responses[q]),
        0
      );
      factorScores[f] = Math.round((sum / (5 * 2)) * 100);
    });
    const abuse = responses.q10_abuse === 'Yes';
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
        abuse: responses.q10_abuse === 'Yes',
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
                  Should I Go Back With My Ex <br /> Alice Dautovic
                </Typography>

                <Typography variant="h6" color="textSecondary" sx={{ mb: 4 }}>
                  Not sure if going back is right? This 25-question quiz breaks it down
                  with emotional charts and healing insight. Fast. Free.
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
                  Find Your Answer
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
                      What You’ll Get <br /> After the Test
                    </Typography>

                    <Typography variant="h6" fontWeight="bold" color="textSecondary" mb={1}>
                      🎯 After the Quiz, You’ll Know:
                    </Typography>
                    <List dense>
                      <ListItem><ListItemText primary="Your current emotional blind spots" /></ListItem>
                      <ListItem><ListItemText primary="How to avoid the cycle of regret or rebound" /></ListItem>
                      <ListItem><ListItemText primary="What actions to take based on your score" /></ListItem>
                    </List>

                    <Typography variant="h6" fontWeight="bold" color="textSecondary" mt={3} mb={1}>
                      📊 Detailed Insights:
                    </Typography>
                    <List dense>
                      <ListItem><ListItemText primary="Trust, growth, and compatibility percentages" /></ListItem>
                      <ListItem><ListItemText primary="4+ interactive graphs built from your answers" /></ListItem>
                      <ListItem><ListItemText primary="“Last Contact” timeline insight" /></ListItem>
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
                        Alice Dautovic Ex Quiz
                      </Typography>
                      <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{ mb: 3, fontWeight: 400 }}
                      >
                        Reflect on your past relationship with honesty—get the clarity
                        you need to either walk away stronger or rebuild with intention.
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
                        Find Your Answer
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
                Step 1 · Answer the 25 questions
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Choose the option that fits best. Sliders run from <b>1 = low</b> to{' '}
                <b>10 = high</b>. Once every question is filled in, the “See Results”
                button unlocks.
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
              See Results
            </Button>
          </Paper>
        )}

        {/* ---------- RESULTS ---------- */}
        {stage === 'results' && result && (() => {
          /* chart-ready datasets (identical logic) */
          const radarData = {
            labels: [
              'Emotional Readiness',
              'Trust & Past Issues',
              'Compatibility & Dynamics',
              'Personal Growth',
              'External Factors',
            ],
            datasets: [
              {
                label: 'Factor Scores',
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
            labels: Object.keys(result.graphData.bars),
            datasets: [
              {
                label: 'Scores',
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
            labels: ['Last Contact'],
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
                Analysis &amp; What to Look For in the Charts Below
              </Typography>
          
              {result.scores.reuniteIndex < 60 ? (
  <>
    <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.75 }}>
      Your <strong>Reunite Index</strong> and the factor charts show that there’s still a lot of emotional pain and unmet needs. 
      Going back now would likely bring more hurt than healing.
    </Typography>
    <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.75 }}>
      The charts clearly show which areas—like trust, boundaries, or emotional safety—need your attention first.
    </Typography>
    <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.75 }}>
      If you're not sure how to work on these, I offer private 1-on-1 coaching on Telegram for free.  
      You can message me directly and I’ll help you figure out the next steps, just for you.
    </Typography>
    <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.75 }}>
      Here's what you'll get with 1-on-1 support:
      <ul style={{ marginTop: '0.5rem', paddingLeft: '1rem' }}>
        <li>Daily custom advice for your healing journey</li>
        <li>Simple exercises that help you move forward</li>
        <li>Private chat with a licensed psychologist</li>
        <li>Support that’s personal, safe, and confidential</li>
      </ul>
    </Typography>
  </>
) : (
  <>
    <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.75 }}>
      Your score shows real potential for getting back together, but the charts reveal specific issues—like communication or emotional safety—that still need work.
    </Typography>
    <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.75 }}>
      If you want help understanding these areas and how to improve them before reconnecting, I offer 1-on-1 coaching directly on Telegram for free.
    </Typography>
    <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.75 }}>
      You’ll get personal support, clear advice, and step-by-step help to give your relationship the best possible chance.
    </Typography>
    <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.75 }}>
      Here's what you'll receive with 1-on-1 coaching:
      <ul style={{ marginTop: '0.5rem', paddingLeft: '1rem' }}>
        <li>Direct Telegram support tailored to your story</li>
        <li>Exercises to rebuild trust, clarity, and communication</li>
        <li>Access to a licensed psychologist in a private setting</li>
        <li>Support that’s practical, personal, and non-judgmental</li>
      </ul>
    </Typography>
  </>
)}

          
              {/* -----------  BABY‑BLUE CTA (whole box clickable) ----------- */}
              <Box
                component="a"
                href="https://t.me/breakupaid_elma"
                target="_blank"
                rel="noopener"
                sx={{
                  mt: 4,
                  p: { xs: 3, sm: 4 },
                  bgcolor: '#4FC3F7',
                  borderRadius: 2,
                  textAlign: 'center',
                  textDecoration: 'none',
                  display: 'block',
                  transition: 'background 0.2s',
                  '&:hover': { bgcolor: '#35b7ee' },
                }}
              >
         <Typography variant="h5" fontWeight="bold" sx={{ color: '#fff', mb: 1 }}>
                  Ready for daily personal support?
                </Typography>
                <Typography variant="body1" sx={{ color: '#fff', mb: 2, lineHeight: 1.6 }}>
  • Personal voice notes and advice sent daily Q&amp;A<br/>
  • Tailored “homework” to help you move forward faster<br/>
  • 1-on-1 access to a licensed psychologist<br/>
  • Clear, actionable steps based on your unique situation
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
                    color: '#4FC3F7',
                    '&:hover': { bgcolor: '#e0f7ff' },
                  }}
                >
                  Send Hello!
                </Button>
              </Box>
            </Paper>


              <Typography variant="h5" fontWeight="bold" textAlign="center" mb={4}>
                Your Reunite Index: {result.scores.reuniteIndex}
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
                      Factor Breakdown
                    </Typography>
                    <Typography variant="body2" color="gray" gutterBottom>
                      Balance of Readiness, Trust, Compatibility, Growth &amp; Factors.
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
                      Detailed Scores
                    </Typography>
                    <Typography variant="body2" color="gray" gutterBottom>
                      See which factors fall below the healthy 70 + zone.
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
                      Overall Gauge
                    </Typography>
                    <Typography variant="body2" color="gray" gutterBottom>
                      Quick glance at your readiness score.
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
                      Last Contact
                    </Typography>
                    <Typography variant="body2" color="gray" gutterBottom>
                      How recent interaction affects emotional readiness.
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
                Retake Quiz
              </Button>
            </Box>
          );
        })()}
      </div>
    </>
  );
}
