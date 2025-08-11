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