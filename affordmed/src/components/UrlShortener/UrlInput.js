import React from "react";
import { Stack, TextField } from "@mui/material";

const UrlInput = ({ value, onChange, index }) => {
  const handle = (field) => (e) => onChange(index, { ...value, [field]: e.target.value });
  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ width: '100%' }}>
      <TextField fullWidth label="Long URL" value={value.longUrl} onChange={handle('longUrl')} placeholder="https://example.com/long/path" />
      <TextField label="Validity (mins)" value={value.minutes} onChange={handle('minutes')} type="number" inputProps={{ min:1, max:10080 }} sx={{ width: { xs: '100%', sm: 160 }}}/>
      <TextField label="Preferred Shortcode" value={value.shortcode} onChange={handle('shortcode')} placeholder="e.g., promo2025" sx={{ width: { xs: '100%', sm: 220 }}}/>
    </Stack>
  );
};
export default UrlInput;