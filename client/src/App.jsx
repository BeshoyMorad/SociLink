// Pages
import HomePage from "pages/home";
import LoginPage from "pages/login";
import ProfilePage from "pages/profile";

// MUI
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { useMemo } from "react";
import { useSelector } from "react-redux";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const mode = useSelector((state) => state.mode);

  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
