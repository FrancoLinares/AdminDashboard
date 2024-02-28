import NextAuth from 'next-auth/next';
import { AuthOptions, Session } from 'next-auth';
import { API_LILI_URLS } from '@/server/urls';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';

export const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt'
  },
  jwt: {
    // 15min
    maxAge: 15 * 60
  },
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout'
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'username' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const authResponse = await fetch(API_LILI_URLS.LOGIN, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        });

        if (!authResponse.ok) {
          return null;
        }

        const { user, access_token } = await authResponse.json();

        if (!access_token) return null;

        const userParsed = {
          id: user._id,
          name: user.name,
          email: user.email,
          access_token: access_token
        };

        return userParsed;
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user?.access_token) {
        token.access_token = user?.access_token;
        token.email = user?.email;
      }

      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token?.access_token && session?.user) {
        session.user.access_token = token.access_token;
        session.user.email = token.email;
      }
      return session;
    }
  },
  secret: process.env.ACCESS_TOKEN_PRIVATE_KEY,
  debug: process.env.NODE_ENV === 'development'
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
