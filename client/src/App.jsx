// Pages
import HomePage from "pages/home";
import LoginPage from "pages/login";
import ProfilePage from "pages/profile";

// MUI
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import getDesignTokens from "theme";

import { useMemo } from "react";
import { useSelector } from "react-redux";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
            <Route
              path="*"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
