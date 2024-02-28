import { APIRequestError } from '../errors';
import { getHeaders } from '../shared';
import { API_LILI_URLS } from '../urls';

const userService = {
  async getAll() {
    const headers = await getHeaders();
    console.log('🚀 ~ getAll ~ headers:', headers);

    const res = await fetch(`${API_LILI_URLS.USERS}`, {
      method: 'GET',
      headers
    });

    console.log('response', res);
    const users = await res.json();
    if (!res.ok) {
      const message = users.message || 'Failed to fetch users';
      throw new APIRequestError(message, res.status);
    }

    console.log('🚀 ~ getAll ~ users:', users);

    return users;
  }
};

export default userService;
