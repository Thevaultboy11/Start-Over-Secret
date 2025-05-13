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
  Chip,
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

  const handleStartNow = ()=>{console.log('hello')}
  function getWeekRange() {
    const today = new Date();
    const day = today.getDay(); // 0 (Sun) to 6 (Sat)
    const diffToMonday = day === 0 ? -6 : 1 - day; // shift Sunday back to previous Monday
    const monday = new Date(today);
    monday.setDate(today.getDate() + diffToMonday);
  
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
  
    const options = { month: 'short', day: 'numeric' };
    const startDate = monday.toLocaleDateString('en-US', options);
    const endDate = sunday.toLocaleDateString('en-US', options);
  
    return { startDate, endDate };
  }
  const { startDate, endDate } = getWeekRange();

  /* ───────────────────────────── render ──────────────────────────── */
  return (
    <>
      {/* <Head>
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

         }
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
      </Head> */}

      {/* ───────────────────────── Hero section ───────────────────────── */}
      <Box
      sx={{
        py: { xs: 8, sm: 10, md: 12 },
        overflow: 'hidden',
        textAlign: { xs: 'left', sm: 'center' },
      }}
    >
      <Container maxWidth="md">
        {/* Translucent Primary Chip */}
        <Chip
          label="💔 For women tired of crying over someone who’s already moved on."
          sx={{
            mb: 2,
            backgroundColor: 'rgba(255, 7, 58, 0.1)',
            color: '#FF073A',
            fontWeight: 'bold',
            borderRadius: '8px',
            px: 1.5,
            py: 0.5,
            fontSize: 14,
          }}
        />

        {/* Headline */}
        <Typography
          variant="h1"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            mb: 3,
            lineHeight: { xs: '1.2', sm: '1.3' },
            textAlign: { xs: 'left', sm: 'center' },
            fontSize: { xs: '2.5rem', sm: '2.5rem', md: '2.5rem' },
          }}
        >
          BreakupAid Kit is a bundle of tools that makes it <b>unreasonable</b> that you stay stuck in heartbreak.
        </Typography>

        {/* Subheading */}
        <Typography variant="h6" color="textSecondary" sx={{ mb: 4 }}>
         <i> This isn’t about “just moving on.” It’s about healing the soul wounds, so your next love doesn’t repeat the same story.</i>
        </Typography>

        {/* CTA Button */}
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
          Enroll now
        </Button>
      </Container>
    </Box>
      <Box sx={{ py: 10 }}>
      <Container maxWidth="md">
        {/* First Part: Video + CTA */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
            alignItems: 'stretch',
            justifyContent: 'center',
          }}
        >
          {/* Video with red glowing border */}
          <Box
            sx={{
              flex: 2,
              border: '1px solid #FF073A',
              borderRadius: 2,
              boxShadow: '0 0 20px #FF073A',
              overflow: 'hidden',
              width: '100%',
            }}
          >
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/ObLCpzeyEgk?si=Qe_5R7d_RI4ogYmJ" // placeholder
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </Box>

          {/* CTA Box */}
          <Paper
          elevation={0}
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            px: { xs: 2, md: 2 },
            py: { xs: 4, md: 0 },
            textAlign: { xs: 'center', md: 'center' },
            
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: 2,
          }}
        >
            <Typography variant="h5" gutterBottom>
             Join the cohort <br/> <strong>{startDate}</strong> – <strong>{endDate}</strong>
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Snag the bundle for 50% off in the Summertime Sadness deal. 
              <br/>
              <br/>
              <i>If it’s not helping, you get a full refund—easy as that.</i>
            </Typography>
            <Button  onClick={handleStartNow} variant="contained" color="primary">
            Enroll now
            </Button>
        </Paper>
          
            
          
        </Box>

        {/* Second Part: Section Below */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
            alignItems: 'center',
            mt: 10,
          }}
        >
          <Box sx={{ flex: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
              What is BreakupAid Kit?
              </Typography>

              <List>
  <ListItem>
    <ListItemText
      primary={
        <Typography variant="body1">
          BreakupAid Kit is a bundle of tools <i>(made just for women)</i> that makes it almost unreasonable not to move on from your ex. The best part? <strong>You choose how to start your healing.</strong>
        </Typography>
      }
    />
  </ListItem>

  <ListItem>
    <ListItemText
      primary={
        <Typography variant="body1">
          This works because it’s built on something I call the <strong>3 X Factors</strong>. When they’re activated, you go from just surviving and feeling anxious... to becoming the version of you who knows <i>her worth</i> again.
        </Typography>
      }
    />
  </ListItem>

  <ListItem>
    <ListItemText
      primary={
        <Typography variant="body1">
          We’ll gently rewire your brain away from toxic love patterns <i>(yes, sometimes it was your side too)</i>, so you can attract the right person—or finally feel <strong>peace</strong> being single.
        </Typography>
      }
    />
  </ListItem>

  <ListItem>
    <ListItemText
      primary={
        <Typography variant="body1">
          And no, it doesn’t mean journaling for hours or changing your whole morning routine. <strong>No affirmations in the mirror, promise.</strong>
        </Typography>
      }
    />
  </ListItem>
</List>
            </Box>
         
        </Box>
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

              <Typography variant="h6" color="textSecondary" fontWeight="bold" >
                Step 1 – Read the Book:
              </Typography>
              <List dense sx={{mb:4}}>
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
              Step 2 – Build Your Support System (on your phone!)
              </Typography>

              <List dense sx={{mb:4}}>
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

              <Typography variant="h6" color="textSecondary" fontWeight="bold">
              Step 3 – Talk With Someone Who Gets It
              </Typography>
              <List dense sx={{mb:4}}>
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
                src="/cta2_image.png"
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
                  Only 7 Spots Available Per Week
                </Typography>

                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{
                    mb: 1,
                    fontWeight: 400,
                    fontSize: { xs: '1rem', sm: '1.125rem' },
                  }}
                >
                    Why is it 50% off? It’s summer. If there’s ever a time to heal, and maybe flirt with a stranger on a beach it’s now. Right?
                </Typography>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{
                    my: 2,
                    fontWeight: 400,
                    fontSize: { xs: '1rem', sm: '1.125rem' },
                  }}
                >
               <i> ps. If it’s not the right fit, we’ll refund you. Simple as that.</i>
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
                  Enroll now
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
}
