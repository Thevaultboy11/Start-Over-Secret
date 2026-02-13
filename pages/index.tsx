import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Typography,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Modal,
  IconButton,
  useMediaQuery,
  useTheme,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const screenshots = ["/mobile_image/1.png", "/mobile_image/2.png", "/mobile_image/3.png", "/mobile_image/4.png"];

export default function InnerCompassLanding() {
  const router = useRouter();
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleGoToBooking = () => {
    router.push("/booking-call");
  };

  const handleGoToQuiz = () => {
    router.push("/get-back-with-ex");
  };

  const handleGoToApp = () => {
    router.push("/signup");
  };

  const handleOpen = (index: number) => {
    setSelectedIndex(index);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const nextImage = () => setSelectedIndex((prev) => (prev + 1) % screenshots.length);
  const prevImage = () => setSelectedIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);

  // swipe support for mobile in screenshot modal
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
      const diff = touchStartX - touchEndX;

      if (diff > 50) nextImage();
      if (diff < -50) prevImage();
    };

    modal.addEventListener("touchstart", handleTouchStart);
    modal.addEventListener("touchend", handleTouchEnd);

    return () => {
      modal.removeEventListener("touchstart", handleTouchStart);
      modal.removeEventListener("touchend", handleTouchEnd);
    };
  }, [open, isMobile]);

  return (
    <>
      <Head>
        <title>Unutrašnji Kompas – 1:1 Psihoterapija, Kviz i Aplikacija</title>
        <meta
          name="description"
          content="Vrati svoje samopoštovanje bez ponavljanja starih šablona u vezama. Psihoterapija, kviz o bivšem i aplikacija za praćenje iscjeljenja – na jednom mjestu."
        />
      </Head>

      {/* 1) HERO – biggest title, centered on desktop, left on mobile */}
      <Box
        sx={{
          py: { xs: 8, sm: 10, md: 12 },
          overflow: "hidden",
          textAlign: { xs: "left", sm: "center" },
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: "bold",
              mb: 3,
              lineHeight: { xs: 1.2, sm: 1.3 },
              fontSize: { xs: "2.3rem", sm: "2.7rem", md: "3.1rem" },
              textAlign: { xs: "left", sm: "center" },
            }}
          >
            Stop Reliving the Same Relationship Patterns
          </Typography>

          <Typography
            variant="h6"
            color="textSecondary"
            sx={{
              mb: 4,
              maxWidth: 700,
              mx: { xs: 0, sm: "auto" },
              textAlign: { xs: "left", sm: "center" },
            }}
          >
            Let me guess you’re here because you’re tired watching self-help TikToks. New clothes or another workout won’t fix the deeper pain.
            You deserve support that actually makes you feel like yourself again.
          </Typography>

          <Box sx={{ textAlign: { xs: "left", sm: "center" } }}>
            <Button
              variant="contained"
              onClick={handleGoToBooking}
              sx={{
                fontSize: 16,
                fontWeight: "bold",
                textTransform: "none",
                px: 3,
                py: 1.2,
                borderRadius: "999px",
                color: "white",
                backgroundColor: "rgba(255, 7, 58, 0.8)",
                "&:hover": { backgroundColor: "rgba(255, 7, 58, 1)" },
              }}
            >
              Start My Session
            </Button>
          </Box>
        </Container>
      </Box>

      {/* 2) PROBLEM SECTION – second biggest title, left-aligned, with CTA */}
      <Box sx={{ py: { xs: 6, md: 8 } }}>
        <Container maxWidth="md">
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              mb: 2,
              fontSize: { xs: "1.9rem", md: "2.2rem" },
              textAlign: "left",
            }}
          >
            The Inner Compass Formula
          </Typography>

          <Typography
            variant="body1"
            color="textSecondary"
            sx={{
              mb: 5,
              maxWidth: 720,
              textAlign: "left",
            }}
          >
I know how it feels when everything gets blurry and heavy. Self-help books helped, but they weren’t enough on their own. What moved me forward was realizing that emotional wellness depends on more than information it’s shaped by several factors.          </Typography>

          <Grid container spacing={4} alignItems="flex-start">
            {/* bullets left */}
            <Grid size={{xs:12, md:6}}>
              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  color="textSecondary"
                  sx={{ mb: 1, fontSize: { xs: 14, md: 15 } }}
                >
                  Emotional Strength Factors
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText
                      primaryTypographyProps={{ fontSize: 14 }}
                      secondaryTypographyProps={{ fontSize: 13 }}
                      primary="Breakup Knowledge"
                      secondary="Understanding what heals and what prolongs pain."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primaryTypographyProps={{ fontSize: 14 }}
                      secondaryTypographyProps={{ fontSize: 13 }}
                      primary="Support System"
                      secondary="Having people who listen and help you stay grounded."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primaryTypographyProps={{ fontSize: 14 }}
                      secondaryTypographyProps={{ fontSize: 13 }}
                      primary="Mental Resilience"
                      secondary="Your ability to stay steady when emotions rise."
                    />
                  </ListItem>
                </List>

                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  color="textSecondary"
                  sx={{ mt: 3, mb: 1, fontSize: { xs: 14, md: 15 } }}
                >
                  Emotional Drain Factors
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText
                      primaryTypographyProps={{ fontSize: 14 }}
                      secondaryTypographyProps={{ fontSize: 13 }}
                      primary="Physical Exhaustion"
                      secondary="Feeling drained makes emotions harder to manage."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primaryTypographyProps={{ fontSize: 14 }}
                      secondaryTypographyProps={{ fontSize: 13 }}
                      primary="Emotional Turbulence"
                      secondary="Intense, unpredictable feelings cloud your clarity."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primaryTypographyProps={{ fontSize: 14 }}
                      secondaryTypographyProps={{ fontSize: 13 }}
                      primary="Fear of Change"
                      secondary="Worry about the unknown keeps you stuck in place."
                    />
                  </ListItem>
                </List>
              </Box>
            </Grid>

            {/* image right */}
            <Grid size={{xs:12, md:6}}>
              <Box sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" } }}>
                <Box
                  component="img"
                  src="/inner_compass_formula.png"
                  alt="Inner Compass emotional formula"
                  sx={{
                    width: { xs: 260, md: 320 },
                    height: { xs: 260, md: 320 },
                    borderRadius: 2,
                    objectFit: "cover",
                  }}
                />
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              onClick={handleGoToBooking}
              sx={{
                fontSize: 15,
                fontWeight: "bold",
                textTransform: "none",
                px: 3,
                py: 1.1,
                borderRadius: "999px",
                color: "white",
                backgroundColor: "rgba(255, 7, 58, 0.8)",
                "&:hover": { backgroundColor: "rgba(255, 7, 58, 1)" },
              }}
            >
                Start My Session
            </Button>
          </Box>
        </Container>
      </Box>

      {/* 3) QUIZ SECTION – slightly smaller title, left-aligned, with CTA to quiz */}
      <Box sx={{ py: { xs: 6, md: 8 } }}>
        <Container maxWidth="md">
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              mb: 2,
              fontSize: { xs: "1.7rem", md: "2rem" },
              textAlign: "left",
            }}
          >
            The Ex Quiz: Reality Check, Not Fantasy
          </Typography>

          <Typography
            variant="body1"
            color="textSecondary"
            sx={{
              mb: 5,
              maxWidth: 720,
              textAlign: "left",
            }}
          >
            After a relationship ends, our brain replays only the good moments, almost like emotional withdrawal. It’s
            easy to forget reality. That’s why I made a 25-question quiz to help you understand clearly if going back to
            your ex is the right choice.
          </Typography>

          <Grid container spacing={4} alignItems="flex-start">
            {/* bullets left */}
            <Grid size={{xs:12, md:6}}>
              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  color="textSecondary"
                  sx={{ mb: 1, fontSize: { xs: 14, md: 15 } }}
                >
                  What You&apos;ll Get
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText
                      primaryTypographyProps={{ fontSize: 14 }}
                      primary="See your emotional blind spots clearly."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primaryTypographyProps={{ fontSize: 14 }}
                      primary="Avoid getting stuck in regret or rebound cycles."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primaryTypographyProps={{ fontSize: 14 }}
                      primary="Get simple next steps based on your score."
                    />
                  </ListItem>
                </List>

                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  color="textSecondary"
                  sx={{ mt: 3, mb: 1, fontSize: { xs: 14, md: 15 } }}
                >
                  This Is Not
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText
                      primaryTypographyProps={{ fontSize: 14 }}
                      primary="No email funnels and no generic answers."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primaryTypographyProps={{ fontSize: 14 }}
                      primary="Your results stay anonymous and are never saved."
                    />
                  </ListItem>
                </List>
              </Box>
            </Grid>

            {/* image right */}
            <Grid size={{xs:12, md:6}}>
              <Box sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" } }}>
                <Box
                  component="img"
                  src="/quiz_preview.png"
                  alt="Ex quiz preview"
                  sx={{
                    width: { xs: 260, md: 320 },
                    height: { xs: 260, md: 320 },
                    borderRadius: 2,
                    objectFit: "cover",
                  }}
                />
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              onClick={handleGoToQuiz}
              sx={{
                fontSize: 15,
                fontWeight: "bold",
                textTransform: "none",
                px: 3,
                py: 1.1,
                borderRadius: "999px",
                color: "white",
                backgroundColor: "rgba(255, 7, 58, 0.8)",
                "&:hover": { backgroundColor: "rgba(255, 7, 58, 1)" },
              }}
            >
              Take the Ex Quiz
            </Button>
          </Box>
        </Container>
      </Box>

      {/* 4) APPLICATION SECTION – smallest section title, app screenshots + CTA to app */}
      <Box sx={{ py: { xs: 6, md: 8 } }}>
        <Container maxWidth="md">
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              mb: 2,
              fontSize: { xs: "1.5rem", md: "1.8rem" },
              textAlign: "left",
            }}
          >
            Your Healing, Inside an App
          </Typography>

          <Typography
            variant="body1"
            color="textSecondary"
            sx={{
              mb: 4,
              maxWidth: 720,
              textAlign: "left",
            }}
          >
            Because so much of our life happens online, your healing should too. I built an app where you can track your
            progress, practice handling uncomfortable moments, and stay connected to the little things that make you
            feel like you again.
          </Typography>

          {/* screenshot carousel */}
          <Box sx={{ py: 1 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "bold",
                mb: 2,
                fontSize: { xs: 14, md: 15 },
                textAlign: "left",
              }}
            >
              A Glimpse Inside the App
            </Typography>

            <Box
              sx={{
                display: "flex",
                overflowX: "auto",
                gap: 2,
                pb: 2,
                "&::-webkit-scrollbar": { display: "none" },
              }}
            >
              {screenshots.map((src, index) => {
                const altText =
                  index === 0
                    ? "Inner Compass dashboard preview"
                    : index === 1
                    ? "Track progress inside the Inner Compass app"
                    : index === 2
                    ? "Emergency support feature in the app"
                    : "Emotional practice scenario in the Inner Compass app";

                return (
                  <Box
                    key={src}
                    sx={{
                      minWidth: 200,
                      height: 356,
                      borderRadius: 3,
                      backgroundImage: `url(${src})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      position: "relative",
                      flexShrink: 0,
                      cursor: "pointer",
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
                      sx={{ position: "absolute", top: 8, right: 8, color: "#fff" }}
                    >
                      <FullscreenIcon />
                    </IconButton>
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 8,
                        left: 8,
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 999,
                        bgcolor: "rgba(0,0,0,0.6)",
                      }}
                    >
                      <Typography variant="caption" sx={{ color: "#fff", fontSize: 11 }}>
                        {altText}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>

            <Box sx={{ mt: 4 }}>
              <Button
                variant="contained"
                onClick={handleGoToApp}
                sx={{
                  fontSize: 15,
                  fontWeight: "bold",
                  textTransform: "none",
                  px: 3,
                  py: 1.1,
                  borderRadius: "999px",
                  color: "white",
                  backgroundColor: "rgba(255, 7, 58, 0.8)",
                  "&:hover": { backgroundColor: "rgba(255, 7, 58, 1)" },
                }}
              >
                Try the App
              </Button>
            </Box>

            {/* fullscreen modal for screenshots */}
            <Modal open={open} onClose={handleClose}>
              <Box
                ref={modalRef}
                sx={{
                  position: "fixed",
                  inset: 0,
                  backgroundColor: "rgba(0,0,0,0.9)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={(e) => {
                  if (e.target === e.currentTarget) handleClose();
                }}
              >
                <Typography
                  variant="subtitle2"
                  color="white"
                  sx={{ position: "absolute", top: 20, left: 20, fontSize: 13 }}
                >
                  {selectedIndex + 1}/{screenshots.length}
                </Typography>

                <IconButton
                  onClick={handleClose}
                  sx={{ position: "absolute", top: 20, right: 20, color: "#fff" }}
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
                      position: "absolute",
                      left: 32,
                      top: "50%",
                      color: "#fff",
                      transform: "translateY(-50%)",
                    }}
                  >
                    <ArrowBackIosNewIcon />
                  </IconButton>
                )}

                <Box
                  component="img"
                  src={screenshots[selectedIndex]}
                  alt={`App screenshot ${selectedIndex + 1}`}
                  sx={{ maxHeight: "90vh", maxWidth: "90vw", borderRadius: 2 }}
                />

                {selectedIndex < screenshots.length - 1 && (
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    sx={{
                      position: "absolute",
                      right: 32,
                      top: "50%",
                      color: "#fff",
                      transform: "translateY(-50%)",
                    }}
                  >
                    <ArrowForwardIosIcon />
                  </IconButton>
                )}
              </Box>
            </Modal>
          </Box>
        </Container>
      </Box>

      {/* FINAL CTA STRIP – styled like BreakupAid Kit CTA but for booking sessions */}
      <Container maxWidth="md" sx={{ py: 10 }}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            border: "1px solid rgba(255, 255, 255, 0.3)",
            borderRadius: 2,
          }}
        >
          <Grid container>
            <Grid size={{xs:12}}>
              <Box textAlign="left">
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "1.7rem", sm: "1.9rem" },
                    mb: 1,
                  }}
                >
                  Ready to stop doing this alone?
                </Typography>

                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{
                    mb: 1,
                    fontWeight: 400,
                    fontSize: { xs: "1rem", sm: "1.05rem" },
                  }}
                >
                  General advice won&apos;t patch the scars on your soul. In a 1:1 session, we make sense of what
                  you&apos;re going through and decide together what actually makes sense for you.
                </Typography>

                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{
                    my: 2,
                    fontWeight: 400,
                    fontSize: { xs: "1rem", sm: "1.05rem" },
                  }}
                >
                  <i>
                    If it turns out this isn&apos;t the right step for you, I&apos;ll tell you honestly — and you&apos;re
                    free to walk away. No pressure, just clarity.
                  </i>
                </Typography>

                <Button
                  variant="contained"
                  onClick={handleGoToBooking}
                  sx={{
                    fontSize: 16,
                    fontWeight: "bold",
                    textTransform: "none",
                    px: 3,
                    py: 1.2,
                    borderRadius: "999px",
                    color: "white",
                    backgroundColor: "rgba(255, 7, 58, 0.8)",
                    "&:hover": { backgroundColor: "rgba(255, 7, 58, 1)" },
                  }}
                >
                  Book My Session
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
}
