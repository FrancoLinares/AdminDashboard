import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { API_LILI_URLS } from './urls';
import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { Account } from 'next-auth';

export const {
  handlers: { GET, POST },
  auth
} = NextAuth({
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login'
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'username' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        console.log('credentials', credentials);
        console.log('API_LILI_URLS.LOGIN', API_LILI_URLS.LOGIN);
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

        const { user: { name = 'John Doe' } = {}, access_token } =
          await authResponse.json();
        const userParsed = {
          name,
          id: access_token
        };

        return userParsed;
      }
    })
  ],
  callbacks: {
    jwt({ token, account }) {
      if (account?.providerAccountId) {
        (token.access_token = account?.providerAccountId),
          (token.id = token.email);
      }
      return token;
    },
    session({ session, token }: { session: Session; token: JWT }) {
      console.log('------------ SESSION ------------');
      console.log({ session }, { token });
      if (token?.access_token) {
        session.user.access_token = token.access_token;
      }
      return session;
    }
  },
  secret: process.env.ACCESS_TOKEN_PRIVATE_KEY,
  debug: process.env.NODE_ENV === 'development'
});
