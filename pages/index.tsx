import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Typography,
  Container,
  IconButton,
  Modal,
  useMediaQuery,
  useTheme,
  List,
  ListItem,
  ListItemText,
  Paper,
  Grid,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

/* ────────────────────────── static images ────────────────────────── */
const screenshots = [
  '/mobile_image/1.png',
  '/mobile_image/2.png',
  '/mobile_image/3.png',
  '/mobile_image/4.png',
];

/* ─────────────────────────── component ───────────────────────────── */
export default function LandingPage() {
  const router = useRouter();
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const modalRef = useRef<HTMLDivElement | null>(null);

  /* ─────────────── navigation to signup (client-side push) ─────────────── */
  const handleStartNow = () => router.push('/signup');

  const handleOpen = (index: number) => {
    setSelectedIndex(index);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const nextImage = () =>
    setSelectedIndex((prev) => (prev + 1) % screenshots.length);
  const prevImage = () =>
    setSelectedIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);

  /* ───────────────────── swipe support for mobiles ─────────────────────── */
  useEffect(() => {
    if (!open || !isMobile) return;

    const modal = modalRef.current;
    if (!modal) return;

    let touchStartX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) nextImage();
      if (touchEndX - touchStartX > 50) prevImage();
    };

    modal.addEventListener('touchstart', handleTouchStart);
    modal.addEventListener('touchend', handleTouchEnd);
    return () => {
      modal.removeEventListener('touchstart', handleTouchStart);
      modal.removeEventListener('touchend', handleTouchEnd);
    };
  }, [open, isMobile]);

  /* ───────────────────────────── render ──────────────────────────── */
  return (
    <>
      <Head>
        <title>Start Over Secret by Alice Dautovic – Official Breakup App</title>
        <meta
          name="description"
          content="Struggling with a breakup? Discover Alice Dautovic’s Start Over Secret—your daily healing companion to feel whole again, one reflection at a time."
        />
        <meta
          name="keywords"
          content="start over secret by alice dautovic, alice dautovic app, alice dautovic breakup app, start over secret application, start over secret alice dautovic"
        />
        <link rel="canonical" href="https://breakupaidkit.com/" />

        {/* Open Graph / Twitter */}
        <meta property="og:title" content="Start Over Secret - Alice Dautovic" />
        <meta
          property="og:description"
          content="Track your healing journey, resist the urge to text your ex, and rediscover your authentic self. One day at a time."
        />
        <meta property="og:image" content="https://breakupaidkit.com/images/og-default.png" />
        <meta property="og:url" content="https://breakupaidkit.com/" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Start Over Secret – Alice Dautovic" />
        <meta
          name="twitter:description"
          content="Helps you reflect, grow, and resist the urge to reach out to your ex. One day at a time."
        />
      </Head>

      {/* ───────────────────────── Hero section ───────────────────────── */}
      <Box sx={{ py: { xs: 8, sm: 10, md: 12 }, overflow: 'hidden', textAlign: {xs: 'left', sm:"center"} }}>
        <Container maxWidth="md">
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              mb: 3,
              lineHeight: { xs: '1.2', sm: '1.3' },
              textAlign: { xs: 'left', sm: 'center' },
              fontSize: { xs: '2rem', sm: '3rem', md: '3.75rem' },
            }}
          >
            Start Over Secret by <br /> Alice Dautovic
          </Typography>

          <Typography variant="h6" color="textSecondary" sx={{ mb: 4 }}>
            The only breakup app built for women who want to stop surviving and actually
            start over. Track healing, resist the urge to text your ex, and stay
            accountable with us.
          </Typography>

          <Button
            variant="contained"
            onClick={handleStartNow}
            sx={{
              fontSize: 16,
              fontWeight: 'bold',
              textTransform: 'none',
              px: 3,
              py: 1.2,
              borderRadius: '999px',
              color: 'white',
              backgroundColor: 'rgba(255, 7, 58, 0.8)',
              '&:hover': { backgroundColor: 'rgba(255, 7, 58, 1)' },
            }}
          >
            Begin Now
          </Button>
        </Container>
      </Box>

      {/* ───────────────────────── Features carousel ─────────────────────── */}
      <Box sx={{ py: 8, px: 2 }}>
        <Container maxWidth="md">
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
            Features
          </Typography>

          <Box
            sx={{
              display: 'flex',
              overflowX: 'auto',
              gap: 2,
              pb: 2,
              '&::-webkit-scrollbar': { display: 'none' },
            }}
          >
            {screenshots.map((src, index) => {
              const altText =
                index === 0
                  ? 'Start Over Secret dashboard feature'
                  : index === 1
                  ? 'Track progress in Start Over Secret application'
                  : index === 2
                  ? 'Emergency Ex Button in Alice Dautovic app'
                  : 'Emotional Gym scenario in Start Over Secret app';

              return (
                <Box
                  key={src}
                  sx={{
                    minWidth: 200,
                    height: 356,
                    borderRadius: 3,
                    backgroundImage: `url(${src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                    flexShrink: 0,
                    cursor: 'pointer',
                  }}
                  role="button"
                  aria-label={`Open screenshot ${index + 1}`}
                  onClick={() => handleOpen(index)}
                >
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpen(index);
                    }}
                    sx={{ position: 'absolute', top: 8, right: 8, color: '#fff' }}
                  >
                    <FullscreenIcon />
                  </IconButton>
                </Box>
              );
            })}
          </Box>

          {/* ───────────────────────── Full-screen modal ───────────────────────── */}
          <Modal open={open} onClose={handleClose}>
            <Box
              ref={modalRef}
              sx={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onClick={(e) => {
                if (e.target === e.currentTarget) handleClose();
              }}
            >
              <Typography
                variant="h6"
                color="white"
                sx={{ position: 'absolute', top: 20, left: 20 }}
              >
                {selectedIndex + 1}/{screenshots.length}
              </Typography>

              <IconButton
                onClick={handleClose}
                sx={{ position: 'absolute', top: 20, right: 20, color: '#fff' }}
              >
                <CloseIcon />
              </IconButton>

              {selectedIndex > 0 && (
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  sx={{
                    position: 'absolute',
                    left: 32,
                    top: '50%',
                    color: '#fff',
                    transform: 'translateY(-50%)',
                  }}
                >
                  <ArrowBackIosNewIcon />
                </IconButton>
              )}

              <Box
                component="img"
                src={screenshots[selectedIndex]}
                alt={`Screenshot ${selectedIndex + 1} – ${selectedIndex}`}
                sx={{ maxHeight: '90vh', maxWidth: '90vw', borderRadius: 2 }}
              />

              {selectedIndex < screenshots.length - 1 && (
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  sx={{
                    position: 'absolute',
                    right: 32,
                    top: '50%',
                    color: '#fff',
                    transform: 'translateY(-50%)',
                  }}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              )}
            </Box>
          </Modal>
        </Container>
      </Box>

      {/* ───────────────────────── “Who is this for?” section ───────────────── */}
      <Box sx={{ py: 10 }}>
        <Container maxWidth="md">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 4,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
                Is Start Over Secret <br /> Right for You?
              </Typography>

              <Typography variant="h6" color="textSecondary" fontWeight="bold">
                ✅ For Women Who Want Real Emotional Progress:
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText primary="You’re ready to track your healing day by day" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="You’re done with vague quotes and emotional chaos" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="You need more than another “don’t text him” rule" />
                </ListItem>
              </List>

              <Typography variant="h6" color="textSecondary" fontWeight="bold">
                ✅ When You’re Done Healing Alone:
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText primary="You crave structure when your feelings are loud" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="You want accountability, not confusion" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="You’re ready to commit to yourself" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Start Over Secret by Alice Dautovic was built for women just like you" />
                </ListItem>
              </List>
            </Box>

            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <Box
                component="img"
                src="/cta_image.png"
                alt="Who is this for"
                sx={{ width: 300, height: 300, borderRadius: 2, objectFit: 'cover' }}
              />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ───────────────────────── CTA strip ───────────────────────── */}
      <Container maxWidth="md" sx={{ py: 10 }}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: 2,
          }}
        >
          <Grid container justifyContent="center">
            <Grid size={{xs:12}}>
              <Box textAlign="center">
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 'bold',
                    fontSize: { xs: '1.75rem', sm: '2rem' },
                    mb: 1,
                  }}
                >
                  Healing shouldn’t come with a price tag
                </Typography>

                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{
                    mb: 3,
                    fontWeight: 400,
                    fontSize: { xs: '1rem', sm: '1.125rem' },
                  }}
                >
                  The Start Over Secret app gives you more than journaling. Built by Alice
                  Dautovic, this application was made to hold you accountable and help you
                  grow—for free.
                </Typography>

                <Button
                  variant="contained"
                  onClick={handleStartNow}
                  sx={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    textTransform: 'none',
                    px: 3,
                    py: 1.2,
                    borderRadius: '999px',
                    color: 'white',
                    backgroundColor: 'rgba(255, 7, 58, 0.8)',
                    '&:hover': { backgroundColor: 'rgba(255, 7, 58, 1)' },
                  }}
                >
                  Begin Now
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
}
