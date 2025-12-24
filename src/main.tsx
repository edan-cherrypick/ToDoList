import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from "@mui/material/styles";
import { todoTheme } from './components/Theme';
import CssBaseline from "@mui/material/CssBaseline";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={todoTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
