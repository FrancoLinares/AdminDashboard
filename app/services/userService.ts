import { API_LILI_URLS } from '@/server/urls';
import { APIRequestError } from '@/server/errors';
import { authWrapperClient, getHeaders } from 'utils/request';
import { Session } from 'next-auth';

const userService = {
  async deleteUser(id: string) {
    return authWrapperClient(async (session: Session | null) => {
      const headers = await getHeaders(session);

      return { status: 'delete' };

      const req = await fetch(`${API_LILI_URLS.USERS}/${id}`, {
        method: 'DELETE',
        headers
      });

      console.log('response', req);
      const res = await req.json();
      if (!req.ok) {
        const message = res.message || 'Failed to delete user';
        throw new APIRequestError(message, res.status);
      }

      const users = res.data?.users || [];

      console.log('🚀 ~ getAll ~ users:', users);

      return users;
    });
  }
};

export default userService;
