const API_LILI_BASE_URL = process.env.API_LILI_HOSTNAME;

export const API_LILI_URLS = {
  LOGIN: `${API_LILI_BASE_URL}/api/auth/login`,
  USERS: `${API_LILI_BASE_URL}/api/users`,
  UNITS: `${API_LILI_BASE_URL}/api/unit`
};
