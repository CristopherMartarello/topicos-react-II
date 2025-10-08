export const loadFromLocal = <T>(key: string): T | null => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch (e) {
    console.error('loadFromLocal error', e);
    return null;
  }
};

export const saveToLocal = (key: string, data: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('saveToLocal error', e);
  }
};

export const removeFromLocal = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.error('removeFromLocal error', e);
  }
};

export const saveSession = (key: string, data: unknown) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('saveSession error', e);
  }
};

export const loadSession = <T>(key: string): T | null => {
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch (e) {
    console.error('loadSession error', e);
    return null;
  }
};
