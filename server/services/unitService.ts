import { API_LILI_URLS } from '@/server/urls';
import { APIRequestError } from '@/server/errors';
import { Session } from 'next-auth';
import { authWrapperServer, getHeaders } from '../shared';

const unitsService = {
  async getUnitsByUserId(userId: string) {
    return authWrapperServer(async (session: Session | null) => {
      const headers = await getHeaders(session);

      const req = await fetch(`${API_LILI_URLS.UNITS}/${userId}`, {
        method: 'GET',
        headers
      });

      const statusCode = req.status;
      const res = await req.json();
      if (!req.ok) {
        const message = res.message || 'Failed to fetch units';
        throw new APIRequestError(message, statusCode);
      }

      const units = res.data?.units || [];

      return units;
    });
  }
};

export default unitsService;
