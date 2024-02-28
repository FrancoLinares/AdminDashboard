import { signOut, useSession } from 'next-auth/react';
import { useCallback } from 'react';

export const useAuth = () => {
  const { data: session } = useSession();
  console.log('🚀 ~ useAuth ~ session:', session);

  useCallback(() => {
    if (!session?.user?.access_token) {
      signOut({ callbackUrl: '/auth/signin' });
      console.log('signed out');
    }
  }, [session]);

  return { session };
};
