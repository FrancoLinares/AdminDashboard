import { cacheProps } from '../constants';
import { APIRequestError } from '../errors';
import { getHeaders } from '../shared';
import { API_LILI_URLS } from '../urls';

const userService = {
  // TODO: refactor this to include authWrapper
  async getAll() {
    const headers = await getHeaders();
    console.log('🚀 ~ getAll ~ headers:', headers);

    const req = await fetch(`${API_LILI_URLS.USERS}`, {
      method: 'GET',
      headers,
      ...cacheProps
    });

    console.log('response', req);
    const statusCode = req.status;
    const res = await req.json();
    if (!req.ok) {
      const message = res.message || 'Failed to fetch users';
      throw new APIRequestError(message, statusCode);
    }

    const users = res.data?.users || [];

    console.log('🚀 ~ getAll ~ users:', users);

    return users;
  },
  async deleteUser(id: string) {
    const headers = await getHeaders();
    console.log('🚀 ~ deleteUser ~ headers:', headers);

    return { status: 'delete' };

    const req = await fetch(`${API_LILI_URLS.USERS}/${id}`, {
      method: 'DELETE',
      headers,
      ...cacheProps
    });

    console.log('response', req);
    const statusCode = req.status;
    const res = await req.json();
    if (!req.ok) {
      const message = res.message || 'Failed to delete user';
      throw new APIRequestError(message, statusCode);
    }

    const users = res.data?.users || [];

    console.log('🚀 ~ getAll ~ users:', users);

    return users;
  }
};

export default userService;
