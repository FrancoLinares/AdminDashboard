import NextAuth, { DefaultSession } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user:
      | ({
          /** The user's postal address. */
          access_token: string | null;
        } & DefaultSession['user'])
      | null;
  }
}
declare module 'next-auth' {
  interface User extends AdapterUser {
    access_token: string | null;
  }
}
declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    access_token?: string;
    id: string;
    email: string | undefined | null;
  }
}
