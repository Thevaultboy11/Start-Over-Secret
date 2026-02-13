// pages/recordings.tsx
import React, { useState, useEffect } from 'react';
import withAuth from '../components/withAuth';
import Head from 'next/head';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useTranslate } from '../hooks/useTranslate'; // ★ ADDED
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

function Recordings() {
  const { user, loading } = useAuth();
  const t = useTranslate(); // ★ ADDED
  const [selectedDay, setSelectedDay] = useState<any>(null);
  const [reflections, setReflections] = useState<any[]>([]);
  const [fireBaseloading, setFireBaseloading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!user) return;

    const db = getDatabase();
    const userRef = ref(db, 'users/' + user.uid);

    onValue(
      userRef,
      (snapshot) => {
        const data = snapshot.val();
        const reflectionData = data?.dailyReflections;
        if (!reflectionData || typeof reflectionData !== 'object') {
          setReflections([]);
        } else {
          const reflectionsArray = Object.entries(reflectionData)
            .map(([id, val]: any) => ({ id, ...val }))
            .sort((a, b) => b.date.localeCompare(a.date));
          setReflections(reflectionsArray);
        }
        setFireBaseloading(false);
      },
      (err) => {
        setError(err.message);
        setFireBaseloading(false);
      }
    );
  }, [user]);

  const moodEmoji = (mood: number): string => {
    const map: { [key: number]: string } = {
      1: '😭',
      2: '😞',
      3: '😢',
      4: '😔',
      5: '😐',
      6: '🙂',
      7: '😊',
      8: '😄',
      9: '😍',
      10: '🦋'
    };
    return map[mood] || '😐';
  };

  const latestReflections = reflections.slice(0, 5);

  const chartData = {
    labels: latestReflections.map((e) => e.date),
    datasets: [
      {
        label: "Mood", // ★ NEW TRANSLATIONS
        data: latestReflections.map((e) => e.mood),
        borderColor: '#FF073A',
        backgroundColor: 'rgba(255,7,58,0.2)',
        tension: 0.4,
      },
      {
        label: "Return Likelihood",
        data: latestReflections.map((e) => e.returnLikelihood),
        borderColor: '#4FC3F7',
        backgroundColor: 'rgba(79,195,247,0.2)',
        tension: 0.4,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: { y: { min: 1, max: 10, ticks: { stepSize: 1 } } }
  };

  if (loading) return <div>{t("recordingsPage.loadingAuth")}</div>; // ★ UPDATED

  if (!user) {
    if (typeof window !== 'undefined') router.push('/login');
    return null;
  }

  return (
    <>
      <Head>
        <title>{t("recordingsPage.title")}</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://breakupaidkit.com/recordings" />
      </Head>

      <Box p={2} pt={3} pb={10}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight="bold">
            {t("recordingsPage.latestReflections")}
          </Typography>

          <IconButton
            onClick={() => router.push('/add-recordings')}
            sx={{ bgcolor: '#FF073A', color: 'white', borderRadius: '50%', p: 1 }}
          >
            <AddIcon />
          </IconButton>
        </Box>

        {/* LOADING / ERROR / EMPTY STATES */}
        {fireBaseloading ? (
          <Box textAlign="center" mt={4}><CircularProgress /></Box>
        ) : error ? (
          <Typography color="error" fontSize={14} textAlign="center">{error}</Typography>
        ) : reflections.length === 0 ? (
          <Typography color="white" fontSize={14} textAlign="center">
            {t("recordingsPage.noReflections")}
          </Typography>
        ) : (
          <>
            {/* CHART */}
            <Paper
              sx={{
                bgcolor: '#000',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: 2,
                p: 2,
                mb: 3
              }}
            >
              <Typography fontSize={16} fontWeight="bold" gutterBottom>
                {t("recordingsPage.chartTitle")}
              </Typography>

              <Typography fontSize={13} color="gray" gutterBottom>
                {t("recordingsPage.chartDescription")}
              </Typography>

              <Box sx={{ width: '100%', overflowX: 'auto', minHeight: 250 }}>
                <Box sx={{ width: `${latestReflections.length * 100}px`, height: 250 }}>
                  <Line data={chartData} options={chartOptions} />
                </Box>
              </Box>
            </Paper>

            {/* RECENT LOG */}
            <Paper
              sx={{
                bgcolor: '#000',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: 2,
                p: 2
              }}
            >
              <Typography fontSize={16} fontWeight="bold" gutterBottom>
                {t("recordingsPage.recentLogTitle")}
              </Typography>

              <Typography fontSize={13} color="gray" gutterBottom>
                {t("recordingsPage.recentLogDescription")}
              </Typography>

              <TableContainer>
                <Table>
                  <TableBody>
                    {latestReflections.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell sx={{ fontSize: 24, color: 'white' }}>
                          {moodEmoji(entry.mood)}
                        </TableCell>

                        <TableCell
                          sx={{
                            fontSize: 14,
                            maxWidth: 140,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            color: 'white'
                          }}
                        >
                          {entry.reflectionText}
                        </TableCell>

                        <TableCell>
                          <Button
                            size="small"
                            sx={{ fontSize: 14, fontWeight: 'bold', textTransform: 'none' }}
                            onClick={() => setSelectedDay(entry)}
                          >
                            {t("recordingsPage.viewAllInfo")}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>

            {/* DIALOG */}
            <Dialog open={!!selectedDay} onClose={() => setSelectedDay(null)} fullWidth>
              <Paper
                sx={{
                  bgcolor: '#000',
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: 2,
                  p: 2
                }}
              >
                <DialogTitle sx={{ color: 'white' }}>
                  {t("recordingsPage.dialog.reflection")} {selectedDay?.date}
                </DialogTitle>

                <DialogContent>
                  <Typography fontSize={14} mb={1} color="white">
                    <strong>{t("recordingsPage.dialog.mood")}</strong> {selectedDay?.mood}
                  </Typography>

                  <Typography fontSize={14} mb={1} color="white">
                    <strong>{t("recordingsPage.dialog.returnLikelihood")}</strong> {selectedDay?.returnLikelihood}
                  </Typography>

                  <Typography fontSize={14} mb={1} color="white">
                    <strong>{t("recordingsPage.dialog.reflectionText")}</strong> {selectedDay?.reflectionText}
                  </Typography>

                  <Typography fontSize={14} color="white">
                    <strong>{t("recordingsPage.dialog.activities")}</strong> {selectedDay?.activities?.join(', ')}
                  </Typography>
                </DialogContent>
              </Paper>
            </Dialog>
          </>
        )}
      </Box>
    </>
  );
}

export default withAuth(Recordings);
