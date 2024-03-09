import { Session } from 'next-auth';
import { getServerSession } from 'next-auth/next';
import { APIRequestError } from './errors';
import { INVALID_TOKEN } from '@/constants/apiErrors';
import { authOptions } from '../app/api/auth/[...nextauth]/route';

export const getHeaders = async (sessionFromWrapper?: Session | null) => {
  const session = sessionFromWrapper || (await getServerSession(authOptions));
  console.log('🚀 ~ getHeaders ~ session:', session);
  const user = session?.user;
  const token = user?.access_token;

  return {
    'Content-Type': 'application/json',
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
      }
    }

    return err;
  }
};

export const authWrapperServer = async (
  promise: (session: Session | null) => Promise<any>
) => {
  const session = await getServerSession(authOptions);
  console.log('🚀 ~ session:', session);

  try {
    return await promise(session);
  } catch (err: any | APIRequestError) {
    if (err.statusCode === 401 || err.message === INVALID_TOKEN) {
      if (session?.user?.access_token) {
        session.user.access_token = null;
      }
    }

    return [];
  }
};
