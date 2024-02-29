import { INVALID_TOKEN } from '@/constants/apiErrors';
import { APIRequestError } from '@/server/errors';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export const getHeaders = async (sessionFromWrapper: Session | null) => {
  const session = sessionFromWrapper || (await getSession());
  console.log('🚀 ~ getHeaders ~ session:', session);
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
        redirect('/auth/signin');
      }
    }

    return err;
  }
};
