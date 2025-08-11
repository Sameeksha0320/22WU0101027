export const addMinutes = (dt, mins) => new Date(new Date(dt).getTime() + mins*60000);
export const isExpired = (iso) => new Date(iso).getTime() <= Date.now();
export const format = (iso) => new Date(iso).toLocaleString();
export const fmt = format;