const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/$/, '');
  }

  const hostname = typeof window !== 'undefined' ? window.location.hostname : '127.0.0.1';
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '0.0.0.0' || hostname === '::') {
    return 'http://127.0.0.1:8000';
  }

  return `http://${hostname}:8000`;
};

export const API_BASE_URL = getApiBaseUrl();
