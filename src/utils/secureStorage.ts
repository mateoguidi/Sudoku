const STORAGE_KEY = 'sudoku';
const SECRET_KEY = '8zgtLb_R@GiG@G6*' + navigator.userAgent.substring(0, 20);

function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36);
}

function xorEncrypt(data: string, key: string): string {
  let result = '';
  for (let i = 0; i < data.length; i++) {
    result += String.fromCharCode(data.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return result;
}

function toBase64(str: string): string {
  try {
    return btoa(unescape(encodeURIComponent(str)));
  } catch {
    return btoa(str);
  }
}

function fromBase64(str: string): string {
  try {
    return decodeURIComponent(escape(atob(str)));
  } catch {
    return atob(str);
  }
}

function createSecurePackage(data: string): string {
  const timestamp = Date.now().toString();
  const hash = simpleHash(data + timestamp + SECRET_KEY);
  const payload = JSON.stringify({ d: data, t: timestamp, h: hash });
  const encrypted = xorEncrypt(payload, SECRET_KEY);
  return toBase64(encrypted);
}

function extractSecurePackage(secureData: string): string | null {
  try {
    const decrypted = xorEncrypt(fromBase64(secureData), SECRET_KEY);
    const payload = JSON.parse(decrypted);

    // Verify integrity
    const expectedHash = simpleHash(payload.d + payload.t + SECRET_KEY);
    if (payload.h !== expectedHash) {
      console.warn('Data integrity check failed');
      return null;
    }

    return payload.d;
  } catch (error) {
    console.warn('Failed to extract secure data:', error);
    return null;
  }
}

export const secureStorage = {
  set: (key: string, value: unknown): void => {
    try {
      const jsonData = JSON.stringify(value);
      const secureData = createSecurePackage(jsonData);
      localStorage.setItem(STORAGE_KEY + '_' + key, secureData);
    } catch (error) {
      console.error('Failed to securely store data:', error);
    }
  },

  get: <T>(key: string): T | null => {
    try {
      const secureData = localStorage.getItem(STORAGE_KEY + '_' + key);
      if (!secureData) return null;

      const jsonData = extractSecurePackage(secureData);
      if (!jsonData) {
        // Clear corrupted data
        localStorage.removeItem(STORAGE_KEY + '_' + key);
        return null;
      }

      return JSON.parse(jsonData) as T;
    } catch (error) {
      console.error('Failed to retrieve secure data:', error);
      // Clear corrupted data on parse error
      localStorage.removeItem(STORAGE_KEY + '_' + key);
      return null;
    }
  },

  clear: (key: string): void => {
    try {
      localStorage.removeItem(STORAGE_KEY + '_' + key);
    } catch (error) {
      console.error('Failed to clear secure data:', error);
    }
  }
};


