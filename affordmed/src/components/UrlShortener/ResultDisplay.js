import React from "react";
import { Alert, Box, Button, Chip, Link, Stack, Typography } from "@mui/material";

const ResultDisplay = ({ results, onVisit }) => {
  if (!results?.length) return null;
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>Results</Typography>
      <Stack spacing={2}>
        {results.map((r, i) => r.ok ? (
          <Alert key={i} severity="success" icon={false} sx={{ alignItems: 'center' }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="body2">Original: <Chip size="small" label={r.record.longUrl} sx={{ ml: 1 }}/></Typography>
                <Typography variant="body2">Expires: {r.record.meta.expires}</Typography>
              </Box>
              <Stack direction="row" spacing={1} alignItems="center">
                <Link href={`/${r.record.shortcode}`} underline="hover" onClick={(e)=>{ e.preventDefault(); onVisit(r.record.shortcode, 'result'); }}>
                  {window.location.origin}/{r.record.shortcode}
                </Link>
                <Button size="small" onClick={() => navigator.clipboard.writeText(`${window.location.origin}/${r.record.shortcode}`)}>Copy</Button>
              </Stack>
            </Stack>
          </Alert>
        ) : (
          <Alert key={i} severity="error">{r.error}</Alert>
        ))}
      </Stack>
    </Box>
  );
};
export default ResultDisplay;