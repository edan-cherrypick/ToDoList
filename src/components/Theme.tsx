import { createTheme } from "@mui/material/styles";

export const todoTheme = createTheme({
  palette: {
    mode: "light",

    // Backgrounds
    background: {
      default: "#F7F9FC", // page background
      paper: "#FFFFFF",  // cards / table
    },

    // Buttons / primary actions
    primary: {
      main: "#4F7DF3",
      contrastText: "#FFFFFF",
    },

    // Destructive actions
    error: {
      main: "#E53935",
    },

    // Text
    text: {
      primary: "#1F2937",
      secondary: "#6B7280",
    },
  },

  typography: {
    fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
});
