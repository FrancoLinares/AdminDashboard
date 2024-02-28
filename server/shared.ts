import { Session } from 'next-auth';
import { getServerSession } from 'next-auth/next';
import type { APIRequestError } from './errors';
import { INVALID_TOKEN } from '@/constants/apiErrors';
import { authOptions } from '../app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export const getHeaders = async () => {
  const session = await getServerSession(authOptions);
  console.log('🚀 ~ getHeaders ~ session:', session);
  const user = session?.user;
  const token = user?.access_token;

  return {
    Authorization: `Bearer ${token}`
  };
};

export const authWrapper = async (promise: Promise<any>) => {
  const session = await getServerSession(authOptions);

  try {
    return await promise;
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
