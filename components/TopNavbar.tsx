'use client';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  Menu,
  MenuItem,
} from "@mui/material";
import ExploreIcon from '@mui/icons-material/Explore';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import TelegramIcon from '@mui/icons-material/Telegram';
import { useAuth } from '../context/AuthContext';
import { MouseEvent, useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import '@fontsource/poppins/700.css';
import { useTranslate } from "../hooks/useTranslate";
import { AppLanguage, LanguageContext } from "../context/LanguageContext";


const languageOptions: { code: AppLanguage; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "bs", label: "Bosnian", flag: "🇧🇦" },
];

export default function TopNav() {
  const { user, logout } = useAuth();
  const { language, setLanguage } = useContext(LanguageContext);
  const t = useTranslate();
  const isMobile = useMediaQuery('(max-width:600px)');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [languageAnchorEl, setLanguageAnchorEl] = useState<null | HTMLElement>(null);

  const router = useRouter();
  const languageMenuOpen = Boolean(languageAnchorEl);
  const selectedLanguage = languageOptions.find((option) => option.code === language) ?? languageOptions[0];

  const handleLogoClick = () => {
    if (!isMobile) router.push(user ? '/dashboard' : '/');
  };

  useEffect(() => {
    const dismissed = sessionStorage.getItem('hideTelegramBanner');
    if (!dismissed) setShowBanner(true);
  }, []);

  const handleDismissBanner = () => {
    setShowBanner(false);
    sessionStorage.setItem('hideTelegramBanner', 'true');
  };

  const handleOpenLanguageMenu = (event: MouseEvent<HTMLElement>) => {
    setLanguageAnchorEl(event.currentTarget);
  };

  const handleCloseLanguageMenu = () => {
    setLanguageAnchorEl(null);
  };

  const handleLanguageChange = (lang: AppLanguage) => {
    setLanguage(lang);
    handleCloseLanguageMenu();
  };

  // ★ TRANSLATED NAV ITEMS
  const drawerLinks = [
    { label: t("topNav.links.home"), path: '/' },
    { label: t("topNav.links.bookingCall"), external: false, path: '/booking-call' },
    { label: t("topNav.links.getBackWithEx"), path: '/get-back-with-ex' },
    { label: t("topNav.links.contactUs"), path: '/contact-us' },
  ];

  return (
    <>
      <AppBar
        position="static"
        color="transparent"
        elevation={2}
        sx={{
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
          px: 2,
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 80,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <Box
            onClick={handleLogoClick}
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              transition: "color 0.3s ease",
              "&:hover .logo-text": { color: "#FF073A" },
            }}
          >
            <ExploreIcon sx={{ mr: 1, color: "white", fontSize: 28 }} />
            <Typography
              className="logo-text"
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "25px",
                fontWeight: "bold",
                letterSpacing: "-0.5px",
                color: "white",
                transition: "color 0.3s ease",
              }}
            >
              {t("topNav.brand")}
            </Typography>
          </Box>

          {/* Desktop Links */}
          {!isMobile && (
            <Box display="flex" gap={3}>
              {drawerLinks.map((link) =>
                link.external ? (
                  <Button
                    key={link.label}
                    onClick={() => window.open(link.path, '_blank')}
                    sx={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 16,
                      textTransform: 'none',
                    }}
                  >
                    {link.label}
                  </Button>
                ) : (
                  <Link key={link.label} href={link.path} passHref legacyBehavior>
                    <Button
                      sx={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 16,
                        textTransform: 'none',
                      }}
                    >
                      {link.label}
                    </Button>
                  </Link>
                )
              )}
            </Box>
          )}

          {/* Right Section */}
          {isMobile ? (
            <IconButton onClick={() => setDrawerOpen(true)}>
              <MenuIcon sx={{ color: 'white' }} />
            </IconButton>
          ) : (
            <Box display="flex" alignItems="center" gap={2}>
              <Button
                onClick={handleOpenLanguageMenu}
                sx={{ color: 'white', fontWeight: 'bold', textTransform: 'none', minWidth: 0 }}
              >
                {selectedLanguage.flag} {selectedLanguage.label}
              </Button>

              {user ? (
            <Button
              variant="outlined"
              onClick={logout}
              sx={{
                fontSize: 16,
                fontWeight: "bold",
                textTransform: "none",
                px: 2.5,
                py: 1,
                borderRadius: 2,
                borderColor: "white",
                color: "white",
                backgroundColor: "transparent",
                "&:hover": {
                  borderColor: "#FF073A",
                  color: "#FF073A",
                  backgroundColor: "rgba(255, 255, 255, 0.01)",
                },
              }}
            >
              {t("topNav.auth.logout")}
            </Button>
              ) : (
            <Box display="flex" gap={2}>
              <Link href="/login" passHref legacyBehavior>
                <Button
                  variant="outlined"
                  sx={{
                    fontSize: 16,
                    fontWeight: "bold",
                    textTransform: "none",
                    px: 2.5,
                    py: 1,
                    borderRadius: 2,
                    borderColor: "white",
                    color: "white",
                    backgroundColor: "transparent",
                    "&:hover": {
                      borderColor: "#FF073A",
                      color: "#FF073A",
                      backgroundColor: "rgba(255, 255, 255, 0.01)",
                    },
                  }}
                >
                  {t("topNav.auth.signIn")}
                </Button>
              </Link>

              <Link href="/signup" passHref legacyBehavior>
                <Button
                  variant="outlined"
                  sx={{
                    fontSize: 16,
                    fontWeight: "bold",
                    textTransform: "none",
                    px: 2.5,
                    py: 1,
                    borderRadius: 2,
                    borderColor: "white",
                    color: "white",
                    backgroundColor: "transparent",
                    "&:hover": {
                      borderColor: "#FF073A",
                      color: "#FF073A",
                      backgroundColor: "rgba(255, 255, 255, 0.01)",
                    },
                  }}
                >
                  {t("topNav.auth.signUp")}
                </Button>
              </Link>
            </Box>
          )}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={languageAnchorEl}
        open={languageMenuOpen}
        onClose={handleCloseLanguageMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {languageOptions.map((option) => (
          <MenuItem key={option.code} onClick={() => handleLanguageChange(option.code)}>
            {option.flag} {option.label}
          </MenuItem>
        ))}
      </Menu>

      {/* Telegram Banner */}
      {showBanner && (
        <Box
          sx={{
            position: 'relative',
            bgcolor: 'rgba(127, 219, 255, 1)',
            color: 'white',
            py: 1.5,
            px: 2,
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <TelegramIcon />
          <Typography
            onClick={() => router.push('/booking-call')}
            sx={{ cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }}
          >
            {t("topNav.banner.message")}
          </Typography>
          <IconButton onClick={handleDismissBanner} sx={{ position: 'absolute', right: 8, top: 4 }}>
            <CloseIcon sx={{ color: 'white', fontSize: 20 }} />
          </IconButton>
        </Box>
      )}

      {/* Mobile Drawer */}
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box
          sx={{
            bgcolor: 'black',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            px: 3,
            pt: 2,
          }}
        >
          <Box display="flex" justifyContent="flex-end">
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon sx={{ color: 'white' }} />
            </IconButton>
          </Box>

          <Box flex={1} display="flex" flexDirection="column" justifyContent="center">
            <List>
              {drawerLinks.map((link) => (
                <ListItem disablePadding key={link.label}>
                  <ListItemButton
                    onClick={() => {
                      setDrawerOpen(false);
                      if (link.external) {
                        window.open(link.path, '_blank');
                      } else {
                        router.push(link.path);
                      }
                    }}
                  >
                    <ListItemText
                      primary={link.label}
                      primaryTypographyProps={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>

            <Box mt={2} mb={3}>
              {languageOptions.map((option) => (
                <Button
                  key={option.code}
                  fullWidth
                  onClick={() => {
                    setLanguage(option.code);
                    setDrawerOpen(false);
                  }}
                  sx={{
                    justifyContent: 'flex-start',
                    fontWeight: language === option.code ? 'bold' : 500,
                    color: 'white',
                    textTransform: 'none',
                  }}
                >
                  {option.flag} {option.label}
                </Button>
              ))}
            </Box>

            {user ? (
              <Button
                variant="outlined"
                onClick={() => {
                  logout();
                  setDrawerOpen(false);
                }}
                sx={{ fontWeight: 'bold', fontSize: 18, textTransform: 'none', color: 'white', borderColor: 'white', mt: 4 }}
              >
                {t("topNav.auth.logout")}
              </Button>
            ) : (
              <Box mt={3} display="flex" flexDirection="column" gap={2}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => {
                    router.push('/login');
                    setDrawerOpen(false);
                  }}
                  sx={{ fontWeight: 'bold', fontSize: 16, textTransform: 'none' }}
                >
                  {t("topNav.auth.signIn")}
                </Button>

                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => {
                    router.push('/signup');
                    setDrawerOpen(false);
                  }}
                  sx={{ fontWeight: 'bold', fontSize: 16, textTransform: 'none', borderColor: 'white', color: 'white' }}
                >
                  {t("topNav.auth.signUp")}
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
