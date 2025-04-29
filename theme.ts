// theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: 'dark', // 🔥 Dark mode globally
    primary: {
      main: '#FF073A', // Your red
    },
    background: {
      default: "#121212", // Full dark
      paper: "#1e1e1e",   // For Paper components
    },
    text: {
      primary: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
});

export default theme;

// import { createTheme } from "@mui/material/styles";

// const theme = createTheme({
//   palette: {
//     mode: "dark",
//     primary: {
//       main: "rgba(255, 7, 58, 0.8)",
//     },
//   },
//   typography: {
//     fontFamily: "Inter, sans-serif",
//   },
// });

// export default theme;