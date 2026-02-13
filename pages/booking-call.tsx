import Head from "next/head";
import Script from "next/script";
import { useContext, useRef } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { LanguageContext } from "@/context/LanguageContext";
import {
  bookingCallContentBS,
  bookingCallContentEN,
  calendlyBookingLink,
} from "@/data/bookingCallContent";

export default function BookingCallPage() {
  const { language } = useContext(LanguageContext);
  const content = language === "bs" ? bookingCallContentBS : bookingCallContentEN;
  const calendlyRef = useRef<HTMLDivElement | null>(null);

  const scrollToCalendly = () => {
    calendlyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Head>
        <title>{content.hero.title} | UnutrasnjiKompas</title>
        <meta name="description" content={content.hero.body} />
      </Head>

      <Box sx={{ py: { xs: 8, md: 10 } }}>
        <Container maxWidth="md">
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: "bold",
              mb: 3,
              fontSize: { xs: "2rem", sm: "2.4rem", md: "2.8rem" },
              textAlign: { xs: "left", sm: "center" },
            }}
          >
            {content.hero.title}
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              mb: 4,
              textAlign: { xs: "left", sm: "center" },
              maxWidth: 760,
              mx: { xs: 0, sm: "auto" },
            }}
          >
            {content.hero.body}
          </Typography>

          <Box sx={{ textAlign: { xs: "left", sm: "center" }, mb: 7 }}>
            <Button
              onClick={scrollToCalendly}
              variant="contained"
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
              {content.hero.button}
            </Button>
          </Box>

          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              mb: 2,
              fontSize: { xs: "1.7rem", md: "2rem" },
            }}
          >
            {content.whyConsultations.title}
          </Typography>

          {content.whyConsultations.paragraphs.map((paragraph, idx) => (
            <Typography key={idx} variant="body1" color="text.secondary" sx={{ mb: 2.5, maxWidth: 900 }}>
              {paragraph}
            </Typography>
          ))}

          <Box sx={{ my: 7 }}>
            <Grid container spacing={4} alignItems="center">
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 2.5, md: 3 },
                    border: "1px solid rgba(255, 7, 58, 0.85)",
                    boxShadow: "0 0 28px rgba(255, 7, 58, 0.28)",
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2, fontSize: { xs: "1.7rem", md: "2rem" } }}>
                    {content.trust.title}
                  </Typography>

                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                    {content.trust.name}
                  </Typography>

                  <List dense>
                    {content.trust.bullets.map((item) => (
                      <ListItem key={item} sx={{ px: 0 }}>
                        <ListItemText
                          primaryTypographyProps={{ fontSize: 15 }}
                          primary={`• ${item}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Box
                  component="img"
                  src="/authority.png"
                  alt="Elma Dzananovic"
                  sx={{
                    width: "100%",
                    aspectRatio: "1 / 1",
                    objectFit: "cover",
                    borderRadius: 2,
                  }}
                />
              </Grid>
            </Grid>
          </Box>

          <Box ref={calendlyRef} sx={{ mt: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
              {content.calendlyTitle}
            </Typography>
            <Paper
              elevation={0}
              sx={{
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: 2,
                overflow: "hidden",
                minHeight: 700,
              }}
            >
              <div
                className="calendly-inline-widget"
                data-url={calendlyBookingLink}
                style={{ minWidth: "320px", height: "700px" }}
              />
            </Paper>
          </Box>
        </Container>
      </Box>

      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </>
  );
}
