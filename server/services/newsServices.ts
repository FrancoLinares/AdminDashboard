import { API_LILI_URLS } from '@/server/urls';
import { APIRequestError } from '@/server/errors';
import { Session } from 'next-auth';
import { authWrapperServer, getHeaders } from '../shared';
import { cacheProps } from '../constants';

const newsService = {
  async addNews({
    partnershipId,
    title,
    content
  }: {
    partnershipId: string;
    title: string;
    content: string;
  }) {
    return authWrapperServer(async (session: Session | null) => {
      const headers = await getHeaders(session);

      const req = await fetch(`${API_LILI_URLS.NEWS}`, {
        method: 'POST',
        headers,
        ...cacheProps,
        body: JSON.stringify({
          partnership_id: partnershipId,
          title,
          text: content
        })
      });

      const statusCode = req.status;
      const res = await req.json();
      if (!req.ok) {
        const message = res.message || 'Failed to create news';
        throw new APIRequestError(message, statusCode);
      }

      const news = res.data?.news || [];

      return news;
    });
  }
};

export default newsService;
