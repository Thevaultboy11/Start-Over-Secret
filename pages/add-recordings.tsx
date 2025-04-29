// pages/your-page.tsx
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

function AddRecordings() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
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

  const allActivities = [
    '✅ Exercise', '💬 Therapy', '🧑‍🤝‍🧑 Social Time', '💧 Hydration',
    '🌬️ Breathing', '🪥 Dry Brushing', '🤗 Hugged Someone', '🛁 Took a Bath',
    '🥗 Ate a Healthy Meal', '😴 Took a Nap', '✨ Spiritual Practice', '🎨 Creative Hobby',
    '🧘 Meditated'
  ];

  const toggleActivity = (activity: string) => {
    setSelectedActivities((prev) =>
      prev.includes(activity)
        ? prev.filter((a) => a !== activity)
        : [...prev, activity]
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
        initialCounts[act] = selectedActivities.includes(act) ? 1 : 0;
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

  if (loading) return <div>Loading...</div>;   // while Firebase checks

  if (!user) {
    // extra safety; withAuth should already redirect
    if (typeof window !== 'undefined') router.push('/login');
    return null;
  }

  return (
    <>
      <Head>
      <title>Add Record</title>
          <meta name="robots" content="noindex, nofollow" />
          <link rel="canonical" href="https://breakupaidkit.com/add-recordings" />
      </Head>
      <Box p={2} pt={3} pb={10}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight="bold">Add Reflection</Typography>
        <IconButton onClick={resetForm} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Paper sx={{ bgcolor: '#000', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 2, p: 2 }}>
        <Typography mt={2} fontSize={14} color="white">Title: {title || '...'}</Typography>
        <TextField
          fullWidth
          inputProps={{ maxLength: 60 }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter reflection title"
          sx={{ mt: 1, mb: 2 }}
        />

        <Typography fontSize={14} fontWeight="bold" color="white" gutterBottom>
          Mood ({mood})/10: {moodEmoji(mood)}
        </Typography>
        <Slider
          min={1}
          max={10}
          value={mood}
          onChange={(_, v) => setMood(v as number)}
          sx={{ mb: 2 }}
        />

        <Typography fontSize={14} fontWeight="bold" color="white" gutterBottom>
          Likelihood to text back ({likelihood})/5: {likelihoodEmoji(likelihood)}
        </Typography>
        <Slider
          min={1}
          max={5}
          value={likelihood}
          onChange={(_, v) => setLikelihood(v as number)}
          sx={{ mb: 2 }}
        />

        <Typography fontSize={14} fontWeight="bold" color="white" gutterBottom>
          Activities Completed
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={1}>
          {allActivities.map((activity) => (
            <Chip
              key={activity}
              label={activity}
              onClick={() => toggleActivity(activity)}
              variant={selectedActivities.includes(activity) ? 'filled' : 'outlined'}
              sx={{ color: 'white', borderColor: 'white' }}
            />
          ))}
        </Box>

        <Button fullWidth variant="contained" color="primary" sx={{ mt: 3 }} onClick={handleSubmit}>
          Submit Reflection
        </Button>
      </Paper>

      <Dialog open={showModal} onClose={() => setShowModal(false)}>
        <DialogTitle sx={{ color: 'white', bgcolor: '#000' }}>Submission Error</DialogTitle>
        <DialogContent sx={{ color: 'white', bgcolor: '#000' }}>
          You've already submitted a reflection for today.
        </DialogContent>
      </Dialog>
    </Box>
      {/* --- page JSX goes here --- */}
    </>
  );
}

export default withAuth(AddRecordings);
