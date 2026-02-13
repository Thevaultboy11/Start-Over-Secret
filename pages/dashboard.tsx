import React, { useContext, useEffect, useState } from 'react';
import {
  Box, Typography, Paper, Grid, Tooltip, Chip, useMediaQuery, useTheme, List, ListItem, ListItemText, CircularProgress,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { getDatabase, ref, onValue } from 'firebase/database';
import withAuth from '../components/withAuth';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslate } from '../hooks/useTranslate';  // ★ ADDED
import { LanguageContext } from '@/context/LanguageContext';
import { dashboardActivityLabelsBS, dashboardActivityLabelsEN } from '@/data/dashboardContent';

function Dashboard() {
  const { user, loading } = useAuth();
  const t = useTranslate(); // ★ ADDED
  const { language } = useContext(LanguageContext);
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [fireBaseloading, setFireBaseloading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [streak, setStreak] = useState(0);
  const [avgMood, setAvgMood] = useState(0);
  const [moodTrend, setMoodTrend] = useState(0);
  const [topActivities, setTopActivities] = useState<[string, number][]>([]);

  useEffect(() => {
    if (!user) return;

    const db = getDatabase();
    const userRef = ref(db, 'users/' + user.uid);

    const unsubscribe = onValue(
      userRef,
      (snapshot) => {
        const data = snapshot.val();
        if (!data) {
          setError(page.noUserData);
          setFireBaseloading(false);
          return;
        }

        setStreak(typeof data.consistencyStreak === 'number' ? data.consistencyStreak : 0);

        const reflectionsRaw = data.dailyReflections;
        const reflections = reflectionsRaw && typeof reflectionsRaw === 'object'
          ? Object.values(reflectionsRaw)
          : [];

        const moods = reflections.map((r: any) =>
          typeof r.mood === 'number' ? r.mood : 0
        );

        if (moods.length > 0) {
          const avg = Math.round(moods.reduce((a, b) => a + b, 0) / moods.length);
          const prevAvg = Math.round(
            moods.slice(0, -1).reduce((a, b) => a + b, 0) / (moods.length - 1 || 1)
          );
          setAvgMood(avg);
          setMoodTrend(avg - prevAvg);
        } else {
          setAvgMood(0);
          setMoodTrend(0);
        }

        const rawActivities = Object.entries(data.activityCounts || {});
        const filtered = rawActivities.filter(([, count]) => typeof count === 'number');
        const sorted = filtered
          .sort((a, b) => {
            const diff = (b[1] as number) - (a[1] as number);
            return diff !== 0 ? diff : a[0].localeCompare(b[0]);
          })
          .slice(0, 3);

        setTopActivities(sorted as [string, number][]);
        setFireBaseloading(false);
      },
      (err) => {
        setError(err.message);
        setFireBaseloading(false);
      }
    );

    return () => unsubscribe();
  }, [user, language]);

  const activityLabels = language === 'bs' ? dashboardActivityLabelsBS : dashboardActivityLabelsEN;

  const getEmoji = (score: number) => {
    const moodMap: { [key: number]: string } = {
      1: '😭', 2: '😞', 3: '😢', 4: '😔', 5: '😐',
      6: '🙂', 7: '😊', 8: '😄', 9: '😍', 10: '🦋'
    };
    return moodMap[score] || '🙂';
  };

  if (loading) return <div>{page.loadingAuth}</div>;

  if (!user) {
    if (typeof window !== 'undefined') router.push('/login');
    return null;
  }

  return (
    <>
      <Head>
        <title>{page.title}</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://breakupaidkit.com/dashboard" />
      </Head>

      <Box p={2}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {page.title}
        </Typography>

        {fireBaseloading ? (
          <Box textAlign="center" mt={4}>
            <CircularProgress color="primary" />
          </Box>
        ) : error ? (
          <Typography color="error" fontSize={14} textAlign="center">
            {error}
          </Typography>
        ) : (
          <>
            {/* Analytics Box */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                mt: 1,
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: 2,
                backgroundColor: '#000'
              }}
            >
              <Grid container spacing={2} alignItems="center">
                {/* Healing Streak */}
                <Grid size={{ xs: 6 }}>
                  <Box textAlign="center">
                    <Typography fontSize={16} fontWeight="bold" gutterBottom>
                      {page.healingStreak}
                    </Typography>

                    <Typography
                      sx={{ py: 2, color: theme.palette.primary.main }}
                      fontSize={36}
                      fontWeight="bold"
                    >
                      {streak}
                      <Typography
                        component="span"
                        fontSize={36}
                        fontWeight="bold"
                        color={theme.palette.primary.main}
                      >
                        D
                      </Typography>
                    </Typography>
                  </Box>
                </Grid>

                {/* Average Mood */}
                <Grid size={{ xs: 6 }}>
                  <Box textAlign="center">
                    <Typography fontSize={16} fontWeight="bold" gutterBottom>
                      {page.averageMood}
                    </Typography>

                    <Typography
                      component="div"
                      sx={{ py: 2 }}
                      fontSize={36}
                      fontWeight="bold"
                      position="relative"
                    >
                      {getEmoji(avgMood)}

                      <Tooltip
                        title={
                          <Typography fontSize={12}>
                            {moodTrend >= 0 ? "+" : ""}
                            {moodTrend}
                          </Typography>
                        }
                        arrow
                      >
                        <Chip
                          label={`${moodTrend >= 0 ? "+" : ""}${moodTrend}`}
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            bgcolor:
                              moodTrend >= 0
                                ? 'rgba(76, 175, 80, 0.8)'
                                : 'rgba(244, 67, 54, 0.8)',
                            color: 'white',
                            fontSize: '0.75rem',
                            fontWeight: 'bold'
                          }}
                        />
                      </Tooltip>
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>

            {/* Top Activities */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                mt: 3,
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: 2,
                backgroundColor: '#000'
              }}
            >
              <Typography fontSize={16} fontWeight="bold" gutterBottom>
                {page.mostUsedActivities}
              </Typography>

              <List>
                {topActivities.map(([name, count], index) => (
                  <ListItem key={name} disablePadding>
                    <ListItemText
                      primary={`${index + 1}. ${activityLabels[name as keyof typeof activityLabels] ?? name}`}
                      primaryTypographyProps={{
                        fontSize: 14,
                        color: 'white',
                        sx: { wordBreak: 'break-word', pr: 2 },
                      }}
                    />
                    <Typography fontSize={14} color="white">
                      {count}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Paper>

            {/* Emergency Section */}
            <Box
              mt={3}
              p={2}
              borderRadius={2}
              onClick={() => router.push('/ex-button')}
              sx={{
                bgcolor: theme.palette.primary.main,
                color: 'white',
                cursor: 'pointer',
                transition: 'transform 0.1s ease-in-out',
                '&:hover': { transform: 'scale(1.02)' }
              }}
            >
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                {page.emergencyTitle}
              </Typography>

              <Typography fontSize={14} paragraph>
                {page.emergencyDescription}
              </Typography>

              <Typography fontSize={14} fontWeight="bold">
                {page.emergencyButton}
              </Typography>
            </Box>
          </>
        )}
      </Box>
    </>
  );
}

export default withAuth(Dashboard);
