import { signOut, useSession } from 'next-auth/react';
import { useCallback } from 'react';

export const useAuth = () => {
  const { data: session } = useSession();

  useCallback(() => {
    if (!session?.user?.access_token) {
      signOut({ callbackUrl: '/auth/signin' });
    }
  }, [session]);

  return { session };
};
