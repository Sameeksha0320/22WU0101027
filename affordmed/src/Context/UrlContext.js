import React, { createContext, useContext, useMemo, useState, useEffect, useCallback } from "react";
import { getAllUrls, saveAllUrls } from "../services/storageService";
import { createShortRecord, normalizeUrl } from "../services/urlService";
import { isValidUrl, isValidMinutes, isValidShortcode } from "../utils/validation";
import { randomShortcode } from "../utils/shortcodeGenerator";
import { addMinutes, isExpired } from "../utils/dateHelpers";

const UrlContext = createContext();

export const UrlProvider = ({ children }) => {
  const [urls, setUrls] = useState(() => getAllUrls());

  useEffect(() => {
    saveAllUrls(urls);
  }, [urls]);

  const shortcodeExists = useCallback((code) => urls.some(u => u.shortcode === code), [urls]);

  const ensureUniqueShortcode = useCallback((preferred) => {
    let code = preferred && isValidShortcode(preferred) && !shortcodeExists(preferred)
      ? preferred
      : randomShortcode();
    while (shortcodeExists(code)) code = randomShortcode();
    return code;
  }, [shortcodeExists]);

  const createShortUrls = useCallback((rows) => {
    // rows: [{longUrl, minutes?, shortcode?}]
    const created = [];
    const next = [...urls];

    rows.forEach((row) => {
      const longUrlNorm = normalizeUrl(row.longUrl);
      if (!isValidUrl(longUrlNorm)) {
        created.push({ error: "Invalid URL format", input: row });
        return;
      }
      const mins = row.minutes == null || row.minutes === "" ? 30 : Number(row.minutes);
      if (!isValidMinutes(mins)) {
        created.push({ error: "Validity must be an integer (1–10080 minutes)", input: row });
        return;
      }
      const code = ensureUniqueShortcode(row.shortcode);
      if (!isValidShortcode(code)) {
        created.push({ error: "Shortcode must be 3–12 alphanumeric/-_", input: row });
        return;
      }
      if (shortcodeExists(code)) {
        created.push({ error: "Shortcode already in use", input: row });
        return;
      }
      const record = createShortRecord({
        longUrl: longUrlNorm,
        shortcode: code,
        createdAt: new Date().toISOString(),
        expiresAt: addMinutes(new Date(), mins).toISOString(),
      });
      next.push(record);
      created.push({ ok: true, record });
    });

    setUrls(next);
    return created;
  }, [urls, ensureUniqueShortcode, shortcodeExists]);

  const resolveShortcode = useCallback((code) => urls.find(u => u.shortcode === code) || null, [urls]);

  const registerClick = useCallback(async (shortcode, source = "unknown") => {
    setUrls(prev => prev.map(u => {
      if (u.shortcode !== shortcode) return u;
      if (isExpired(u.expiresAt)) return u; // don't record after expiry
      const ts = new Date().toISOString();
      const click = { ts, source, location: null };
      // try geolocation (coarse)
      if (typeof navigator !== "undefined" && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords || {};
            const loc = latitude != null && longitude != null ?
              { lat: Number(latitude.toFixed(2)), lon: Number(longitude.toFixed(2)) } : null;
            // async update after permission
            setUrls(p => p.map(x => x.shortcode === shortcode ? {
              ...x,
              clicks: [...x.clicks, { ...click, location: loc }]
            } : x));
          },
          () => { /* ignore errors */ },
          { enableHighAccuracy: false, maximumAge: 60000, timeout: 4000 }
        );
      }
      return { ...u, clicks: [...u.clicks, click] };
    }));
  }, []);

  const value = useMemo(() => ({ urls, createShortUrls, resolveShortcode, registerClick }), [urls, createShortUrls, resolveShortcode, registerClick]);

  return <UrlContext.Provider value={value}>{children}</UrlContext.Provider>;
};

export const useUrlContext = () => useContext(UrlContext);