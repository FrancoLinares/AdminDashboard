import { Session } from 'next-auth';
import { authWrapperServer, getHeaders } from '../shared';
import { API_LILI_URLS } from '../urls';
import { cacheProps } from '../constants';
import { APIRequestError } from '../errors';

const emailService = {
  async addEmail({
    partnership_ids,
    admin_name,
    msg_content
  }: {
    partnership_ids: string[];
    admin_name: string;
    msg_content: string;
  }) {
    return authWrapperServer(async (session: Session | null) => {
      const headers = await getHeaders(session);

      const req = await fetch(`${API_LILI_URLS.EMAIL}`, {
        method: 'POST',
        headers,
        ...cacheProps,
        body: JSON.stringify({
          partnership_ids,
          admin_name,
          msg_content
        })
      });
      console.log('🚀 ~ returnauthWrapperServer ~ req:', req);

      const statusCode = req.status;
      const res = await req.json();
      console.log('🚀 ~ returnauthWrapperServer ~ res:', res);
      if (!req.ok) {
        const message = res.message || 'Failed to create email';
        throw new APIRequestError(message, statusCode);
      }

      const news = res.data?.news || [];

      return news;
    });
  }
};

export default emailService;
