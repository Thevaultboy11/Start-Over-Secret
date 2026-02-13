// pages/add-recordings.tsx
import withAuth from '../components/withAuth';
import Head from 'next/head';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Slider,
  Chip,
  Button,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getDatabase, ref, get, set, update } from 'firebase/database';
import { useTranslate } from '../hooks/useTranslate'; // ★ ADDED
import { useContext } from 'react';
import { LanguageContext } from '@/context/LanguageContext';
import { addRecordingsContentBS, addRecordingsContentEN } from '@/data/addRecordingsContent';

function AddRecordings() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { language } = useContext(LanguageContext);
  const content = language === 'bs' ? addRecordingsContentBS : addRecordingsContentEN;

  const userId = user?.uid;

  const [title, setTitle] = useState('');
  const [mood, setMood] = useState(5);
  const [likelihood, setLikelihood] = useState(3);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  const moodEmoji = (mood: number): string => {
    const map: { [key: number]: string } = {
      1: '😭', 2: '😞', 3: '😢', 4: '😔', 5: '😐',
      6: '🙂', 7: '😊', 8: '😄', 9: '😍', 10: '🦋'
    };
    return map[mood] || '😐';
  };

  const likelihoodEmoji = (value: number): string => {
    const map: { [key: number]: string } = {
      1: '🧘‍♀️', 2: '🧊', 3: '🤷', 4: '🫠', 5: '💌'
    };
    return map[value] || '🤷';
  };

  const allActivities = content.activities;

  const toggleActivity = (activityKey: string) => {
    setSelectedActivities((prev) =>
      prev.includes(activityKey)
        ? prev.filter((a) => a !== activityKey)
        : [...prev, activityKey]
    );
  };

  const resetForm = () => {
    setTitle('');
    setMood(5);
    setLikelihood(3);
    setSelectedActivities([]);
  };

  const handleSubmit = async () => {
    if (!userId) return;
    const today = new Date().toISOString().split('T')[0];

    const db = getDatabase();
    const userRef = ref(db, 'users/' + userId);
    const snapshot = await get(userRef);

    const newEntry = {
      date: today,
      reflectionText: title,
      mood,
      returnLikelihood: likelihood,
      activities: selectedActivities
    };

    if (snapshot.exists()) {
      const data = snapshot.val();
      const reflections = data.dailyReflections || {};
      const activityCounts = data.activityCounts || {};
      const currentStreak = data.consistencyStreak || 0;

      if (reflections && reflections[today]) {
        setShowModal(true);
        return;
      }

      const updatedActivityCounts: any = { ...activityCounts };
      selectedActivities.forEach((act) => {
        updatedActivityCounts[act] = (updatedActivityCounts[act] || 0) + 1;
      });

      const updates: any = {
        activityCounts: updatedActivityCounts,
        consistencyStreak: currentStreak + 1
      };
      updates[`dailyReflections/${today}`] = newEntry;

      await update(userRef, updates);
    } else {
      const initialCounts: any = {};
      allActivities.forEach((act) => {
        initialCounts[act.key] = selectedActivities.includes(act.key) ? 1 : 0;
      });

      await set(userRef, {
        activityCounts: initialCounts,
        consistencyStreak: 1,
        dailyReflections: {
          [today]: newEntry
        }
      });
    }

    router.push('/recordings');
  };

  if (loading) return <div>{page.loading}</div>;

  if (!user) {
    if (typeof window !== 'undefined') router.push('/login');
    return null;
  }

  return (
    <>
      <Head>
        <title>{page.title}</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://breakupaidkit.com/add-recordings" />
      </Head>

      <Box p={2} pt={3} pb={10}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight="bold">
            {page.header}
          </Typography>

          <IconButton onClick={resetForm} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Paper
          sx={{
            bgcolor: '#000',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: 2,
            p: 2
          }}
        >
          <Typography mt={2} fontSize={14} color="white">
            {page.titleLabel} {title || '...'}
          </Typography>

          <TextField
            fullWidth
            inputProps={{ maxLength: 60 }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={page.titlePlaceholder}
            sx={{ mt: 1, mb: 2 }}
          />

          <Typography fontSize={14} fontWeight="bold" color="white" gutterBottom>
            {page.moodLabel} ({mood}){page.moodScale} {moodEmoji(mood)}
          </Typography>

          <Slider
            min={1}
            max={10}
            value={mood}
            onChange={(_, v) => setMood(v as number)}
            sx={{ mb: 2 }}
          />

          <Typography fontSize={14} fontWeight="bold" color="white" gutterBottom>
            {page.likelihoodLabel} ({likelihood}){page.likelihoodScale} {likelihoodEmoji(likelihood)}
          </Typography>

          <Slider
            min={1}
            max={5}
            value={likelihood}
            onChange={(_, v) => setLikelihood(v as number)}
            sx={{ mb: 2 }}
          />

          <Typography fontSize={14} fontWeight="bold" color="white" gutterBottom>
            {page.activitiesLabel}
          </Typography>

          <Box display="flex" flexWrap="wrap" gap={1}>
            {allActivities.map((activityObj) => (
              <Chip
                key={activityObj.key}
                label={activityObj.label}
                onClick={() => toggleActivity(activityObj.key)}
                variant={selectedActivities.includes(activityObj.key) ? 'filled' : 'outlined'}
                sx={{ color: 'white', borderColor: 'white' }}
              />
            ))}
          </Box>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            onClick={handleSubmit}
          >
            {page.submitButton}
          </Button>
        </Paper>

        <Dialog open={showModal} onClose={() => setShowModal(false)}>
          <DialogTitle sx={{ color: 'white', bgcolor: '#000' }}>
            {page.modalTitle}
          </DialogTitle>
          <DialogContent sx={{ color: 'white', bgcolor: '#000' }}>
            {page.modalMessage}
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
}

export default withAuth(AddRecordings);
