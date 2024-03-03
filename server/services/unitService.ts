import { API_LILI_URLS } from '@/server/urls';
import { APIRequestError } from '@/server/errors';
import { Session } from 'next-auth';
import { authWrapperServer, getHeaders } from '../shared';
import { cacheProps } from '../constants';

const unitsService = {
  async getUnitsByUserId(userId: string) {
    return authWrapperServer(async (session: Session | null) => {
      const headers = await getHeaders(session);

      const req = await fetch(`${API_LILI_URLS.UNIT}/${userId}`, {
        method: 'GET',
        headers,
        ...cacheProps
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
  },
  async addUnit({ userId, unitId }: { userId: string; unitId: number }) {
    return authWrapperServer(async (session: Session | null) => {
      const headers = await getHeaders(session);

      const req = await fetch(`${API_LILI_URLS.UNIT}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ unit_id: unitId, user_id: userId })
      });

      const statusCode = req.status;
      const res = await req.json();
      if (!req.ok) {
        const message = res.message || 'Failed to create unit';
        throw new APIRequestError(message, statusCode);
      }

      const unit = res.data?.unit || {};

      return unit;
    });
  },
  async removeUnit({ ids }: { ids: string[] }) {
    return authWrapperServer(async (session: Session | null) => {
      const headers = await getHeaders(session);

      const req = await fetch(`${API_LILI_URLS.UNIT}`, {
        method: 'DELETE',
        headers,
        body: JSON.stringify({ ids })
      });

      const statusCode = req.status;
      const res = await req.json();
      if (!req.ok) {
        const message = res.message || 'Failed to delete unit';
        throw new APIRequestError(message, statusCode);
      }

      const unit = res.data?.unit || {};

      return unit;
    });
  }
};

export default unitsService;
