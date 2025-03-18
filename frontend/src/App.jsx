import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  Container,
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import HomePage from "./pages/HomePage.jsx";
import ThreadPage from "./pages/ThreadPage.jsx";
import NewThreadPage from "./pages/NewThreadPage.jsx";


const theme = createTheme({
  palette: {
    primary: {
      main: "#2563eb", 
      light: "#3b82f6",
      dark: "#1d4ed8",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    button: {
      textTransform: "none", 
    },
  },
  shape: {
    borderRadius: 12, 
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "10px 20px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow:
            "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        },
      },
    },
  },
});

function App() {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          bgcolor: "background.default",
          minHeight: "100vh",
          py: { xs: 2, sm: 4 },
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            px: isMobile ? 2 : 3,
          }}
        >
          <Box
            sx={{
              bgcolor: "background.paper",
              borderRadius: { xs: 2, sm: 3 },
              boxShadow:
                "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
              p: { xs: 2, sm: 3 },
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                boxShadow:
                  "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
              },
            }}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/thread/:id" element={<ThreadPage />} />
              <Route path="/new" element={<NewThreadPage />} />
            </Routes>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
