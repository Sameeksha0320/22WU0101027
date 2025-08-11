export const isValidUrl = (u) => {
  try { new URL(u); return true; } catch { return false; }
};
export const isValidMinutes = (m) => Number.isInteger(m) && m >= 1 && m <= 10080; // up to 7 days
export const isValidShortcode = (s) => typeof s === "string" && /^[A-Za-z0-9_-]{3,12}$/.test(s);