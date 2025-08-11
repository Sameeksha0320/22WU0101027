const KEY = "_url_shortener_records_v1";
export const getAllUrls = () => {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; }
};
export const saveAllUrls = (arr) => {
  try { localStorage.setItem(KEY, JSON.stringify(arr)); } catch {}
};