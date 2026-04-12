import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
      role?: string;
      subscription?: any;
    };
  }

  interface User {
    role?: string;
    subscription?: any;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string;
    subscription?: any;
  }
}