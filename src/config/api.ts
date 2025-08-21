export const API_CONFIG = {
  BACKEND_URL:
    import.meta.env.BACKEND_API_URL ||
    import.meta.env.BACKEND_API_URL_PROD ||
    "https://peekvisor.vercel.app",

  ENDPOINTS: {
    WEBSITES: "/api/websites",
    ANALYTICS: "/api/analytics",
    TRACK: "/api/track",
    USER_PROFILE: "/api/user/profile",
    TRACKING_SCRIPT: "/peekvisor.js",
  },

  DEFAULT_HEADERS: {
    "Content-Type": "application/json",
  },

  REQUEST_TIMEOUT: 30000,

  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,
};

export function getApiUrl(endpoint: string): string {
  return `${API_CONFIG.BACKEND_URL}${endpoint}`;
}

export function getAuthHeaders(): Record<string, string> {
  const token = getAuthToken();
  return {
    ...API_CONFIG.DEFAULT_HEADERS,
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

export function getAuthToken(): string | null {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split(";");
  const authCookie = cookies.find((cookie) =>
    cookie.trim().startsWith("app_auth_token="),
  );
  return authCookie ? authCookie.split("=")[1] : null;
}

export function isDevelopment(): boolean {
  return !import.meta.env.PROD;
}

export function getTrackingScriptUrl(): string {
  return getApiUrl(API_CONFIG.ENDPOINTS.TRACKING_SCRIPT);
}
