const KEY = "_url_shortener_records_v1";
export const getAllUrls = () => {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; }
};
export const saveAllUrls = (arr) => {
  try { localStorage.setItem(KEY, JSON.stringify(arr)); } catch {}
};

// -------------------------------------------------------------
// src/services/urlService.js
import { format as fmt } from "../utils/dateHelpers";

export const normalizeUrl = (u) => {
  if (!u) return u;
  try {
    // add protocol if missing
    const hasProto = /^https?:\/\//i.test(u);
    return hasProto ? u : `https://${u}`;
  } catch { return u; }
};

export const createShortRecord = ({ longUrl, shortcode, createdAt, expiresAt }) => ({
  id: `${shortcode}-${createdAt}`,
  longUrl,
  shortcode,
  createdAt,
  expiresAt,
  clicks: [],
  meta: { created: fmt(createdAt), expires: fmt(expiresAt) }
});
