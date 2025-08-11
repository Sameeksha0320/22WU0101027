// src/App.js
import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useParams, Navigate, useNavigate } from "react-router-dom";
import { CssBaseline, Box, Container, CircularProgress, Button, Typography } from "@mui/material";

import { UrlProvider } from "./Context/UrlContext";
import { useUrlManagement } from "./hooks/useUrlManagement";
import { isExpired } from "./utils/dateHelpers";

// Pages
import UrlShortenerPage from "./pages/UrlShortenerPage";
import StatisticsPage from "./pages/StatisticsPage";

// --- Small helper view used by the redirect route ---
const RedirectHandler = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const { resolveShortcode, registerClick } = useUrlManagement();
  const [status, setStatus] = useState("checking"); // checking | notfound | expired | redirecting
  const record = useMemo(() => resolveShortcode(code), [code, resolveShortcode]);

  useEffect(() => {
    if (!record) {
      setStatus("notfound");
      return;
    }
    if (isExpired(record.expiresAt)) {
      setStatus("expired");
      return;
    }
    setStatus("redirecting");
    // log click and redirect
    try {
      registerClick(record.shortcode, "router");
    } catch (_) {}
    // immediate redirect to long URL
    window.location.replace(record.longUrl);
  }, [record, registerClick]);

  if (status === "checking" || status === "redirecting") {
    return (
      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", justifyContent: "center" }}>
          <CircularProgress />
          <Typography>Taking you to your destination…</Typography>
        </Box>
      </Container>
    );
  }

  if (status === "notfound") {
    return (
      <Container maxWidth="sm" sx={{ py: 6, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>Short link not found</Typography>
        <Typography color="text.secondary" gutterBottom>
          The shortcode “{code}” doesn’t exist on this device.
        </Typography>
        <Button variant="contained" onClick={() => navigate("/")}>Go to Shortener</Button>
      </Container>
    );
  }

  // expired
  return (
    <Container maxWidth="sm" sx={{ py: 6, textAlign: "center" }}>
      <Typography variant="h5" gutterBottom>Link expired</Typography>
      <Typography color="text.secondary" gutterBottom>
        The link “{window.location.origin}/{code}” has expired. Create a new one from the shortener page.
      </Typography>
      <Button variant="contained" onClick={() => navigate("/")}>Create New Link</Button>
    </Container>
  );
};

function App() {
  return (
    <UrlProvider>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", pb: 7 /* space for bottom nav */ }}>
        <Router>
          <Routes>
            <Route path="/" element={<UrlShortenerPage />} />
            <Route path="/stats" element={<StatisticsPage />} />
            <Route path="/:code" element={<RedirectHandler />} />
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </Box>
    </UrlProvider>
  );
}

export default App;
