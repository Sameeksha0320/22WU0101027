import React from "react";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import UrlInput from "./UrlInput";
import ResultDisplay from "./ResultDisplay";
import { useUrlManagement } from "../../hooks/useUrlManagement";

const emptyRow = () => ({ longUrl: "", minutes: "", shortcode: "" });

const UrlForm = () => {
  const { createShortUrls, registerClick } = useUrlManagement();
  const [rows, setRows] = React.useState([emptyRow()]);
  const [results, setResults] = React.useState([]);

  const updateRow = (idx, value) => setRows(prev => prev.map((r, i) => i === idx ? value : r));
  const addRow = () => setRows(prev => prev.length >= 5 ? prev : [...prev, emptyRow()]);
  const removeRow = (idx) => setRows(prev => prev.length === 1 ? prev : prev.filter((_, i) => i !== idx));

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = rows.filter(r => r.longUrl.trim());
    const res = createShortUrls(payload);
    setResults(res);
  };

  const onVisit = (code, source) => {
    registerClick(code, source);
    // client-side redirect: update location to mimic route handler; your App router should catch this path
    window.location.assign(`/${code}`);
  };

  return (
    <Box component="form" onSubmit={onSubmit} sx={{ mt: 2 }}>
      <Stack spacing={2}>
        {rows.map((r, idx) => (
          <Stack key={idx} spacing={1}>
            <UrlInput value={r} index={idx} onChange={updateRow} />
            <Stack direction="row" spacing={1}>
              <Button variant="outlined" size="small" onClick={addRow} disabled={rows.length >= 5}>Add</Button>
              <Button variant="text" size="small" onClick={() => removeRow(idx)} disabled={rows.length === 1}>Remove</Button>
            </Stack>
            {idx < rows.length - 1 && <Divider />}
          </Stack>
        ))}
        <Button type="submit" variant="contained">Shorten</Button>
      </Stack>
      <ResultDisplay results={results} onVisit={onVisit} />
      <Typography variant="caption" sx={{ display: 'block', mt: 2, color: 'text.secondary' }}>
        Tip: You can add up to 5 URLs at once. Default validity is 30 minutes if left blank.
      </Typography>
    </Box>
  );
};
export default UrlForm;