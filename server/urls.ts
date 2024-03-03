const API_LILI_BASE_URL =
  process.env.API_LILI_HOSTNAME || process.env.NEXT_PUBLIC_API_LILI_HOSTNAME;

export const API_LILI_URLS = {
  LOGIN: `${API_LILI_BASE_URL}/api/auth/login`,
  USERS: `${API_LILI_BASE_URL}/api/users`,
  UNIT: `${API_LILI_BASE_URL}/api/unit`,
  PARTNERSHIPS: `${API_LILI_BASE_URL}/api/users/getPartnerships`,
  UNITS_PARTNERSHIP_ID: `${API_LILI_BASE_URL}/api/users/getUnits`
};
