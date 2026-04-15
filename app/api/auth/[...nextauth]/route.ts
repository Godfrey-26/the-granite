import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import API_Caller from '@/src/api_caller';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const res = await API_Caller('POST', null, '/auth/login', {
            email: credentials.email,
            password: credentials.password
          });

          if (res.user) {
            return {
              id: res.user.id,
              email: res.user.email,
              name: res.user.name,
              role: res.user.role,
              subscription: res.user.subscription
            };
          }
          return null;
        } catch (error) {
          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role;
        token.subscription = user.subscription;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token && token.sub) {
        session.user.id = token.sub;
        session.user.role = token.role;
        session.user.subscription = token.subscription;
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin'
  }
});

export { handler as GET, handler as POST };