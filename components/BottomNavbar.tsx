// components/BottomNav.tsx
'use client';

import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useAuth } from "../context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function BottomNav() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  if (!isMobile || !user) return null; // don't render if not mobile or not logged in

  const indexToPath = ["/emotional-gym", "/recordings", "/dashboard"];
  const currentIndex = indexToPath.indexOf(pathname);

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 90,
        borderTop: '1px solid rgba(255, 255, 255, 0.4)',
        bgcolor: 'background.default',
        zIndex: 1300,
      }}
      elevation={8}
    >
      <BottomNavigation
        sx={{
          height: '100%',
          '& .MuiBottomNavigationAction-root': {
            color: 'white',
            fontSize: '0.8rem',
          },
          '& .Mui-selected': {
            color: 'primary.main',
          },
        }}
        showLabels
        value={currentIndex === -1 ? false : currentIndex}
        onChange={(_, newValue) => {
          router.push(indexToPath[newValue]);
        }}
      >
        <BottomNavigationAction
          label="Emotional Gym"
          icon={<FavoriteIcon fontSize="medium" />}
        />
        <BottomNavigationAction
          label=""
          icon={
            <AddCircleIcon
              sx={{
                fontSize: 56,
                color: 'white',
                mt: -2,
                bgcolor: 'primary.main',
                borderRadius: '50%',
                p: 1,
              }}
            />
          }
        />
        <BottomNavigationAction
          label="Dashboard"
          icon={<DashboardIcon fontSize="medium" />}
        />
      </BottomNavigation>
    </Paper>
  );
}
