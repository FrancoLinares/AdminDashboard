import { INVALID_TOKEN } from '@/constants/apiErrors';
import { APIRequestError } from '@/server/errors';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export const getHeaders = async (sessionFromWrapper: Session | null) => {
  const session = sessionFromWrapper || (await getSession());
  const user = session?.user;

  const token = user?.access_token;

  return {
    Authorization: `Bearer ${token}`
  };
};

export const authWrapperClient = async (
  promise: (session: Session | null) => Promise<any>
) => {
  const session = await getSession();

  try {
    return await promise(session);
  } catch (err: any | APIRequestError) {
    if (err.statusCode === 401 || err.message === INVALID_TOKEN) {
      if (session?.user?.access_token) {
        session.user.access_token = null;
      }

      redirect('/auth/signin');
    }

    return err;
  }
};

export const makeRequest = async <T>({
  url,
  method,
  body
}: {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
}): Promise<T> => {
  const headers = await getHeaders(null);
  const req = await fetch(url, {
    method,
    headers,
    body: JSON.stringify(body)
  });
  const statusCode = req.status;
  const res = await req.json();
  if (!req.ok || res.error) {
    const message = res.message || 'Failed to fetch';
    throw new APIRequestError(message, statusCode);
  }

  return res;
};
