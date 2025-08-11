import React from "react";
import { TextField, Stack } from "@mui/material";

const UrlInput = ({ value, index, onChange }) => {
  const handleChange = (e) => {
    const { name, value: val } = e.target;
    onChange(index, { ...value, [name]: val });
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <TextField
        label="Long URL"
        name="longUrl"
        value={value.longUrl}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Minutes"
        name="minutes"
        value={value.minutes}
        onChange={handleChange}
        type="number"
        inputProps={{ min: 1, max: 10080 }}
        style={{ width: 120 }}
      />
      <TextField
        label="Shortcode (optional)"
        name="shortcode"
        value={value.shortcode}
        onChange={handleChange}
        style={{ width: 150 }}
      />
    </Stack>
  );
};

export default UrlInput;
