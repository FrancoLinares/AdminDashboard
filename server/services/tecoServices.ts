import { API_LILI_URLS } from '@/server/urls';
import { APIRequestError } from '@/server/errors';
import { Session } from 'next-auth';
import { authWrapperServer, getHeaders } from '../shared';
import { cacheProps } from '../constants';

const tecoService = {
  async getPartnerships() {
    return authWrapperServer(async (session: Session | null) => {
      const headers = await getHeaders(session);

      console.log('URL', `${API_LILI_URLS.PARTNERSHIPS}`);

      const req = await fetch(`${API_LILI_URLS.PARTNERSHIPS}`, {
        method: 'GET',
        headers,
        ...cacheProps
      });

      const statusCode = req.status;
      const res = await req.json();
      if (!req.ok) {
        const message = res.message || 'Failed to fetch partnerships';
        throw new APIRequestError(message, statusCode);
      }

      const partnerships = res.data?.partnerships || [];

      return partnerships;
    });
  },

  async getUnitsByPartnershipId(partnershipId: string) {
    return authWrapperServer(async (session: Session | null) => {
      const headers = await getHeaders(session);

      const req = await fetch(
        `${API_LILI_URLS.UNITS_PARTNERSHIP_ID}/${partnershipId}`,
        {
          method: 'GET',
          headers,
          next: {
            tags: ['units'],
            ...cacheProps.next
          }
        }
      );

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

export default tecoService;
