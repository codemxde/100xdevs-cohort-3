import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'your-username' },
        password: { label: 'Password', type: 'password', placeholder: 'your-password' },
      },
      async authorize(credentials, req) {
        const username = credentials?.username;
        const password = credentials?.password;

        const user = {
          name: 'keshav',
          id: 1,
          username: 'codemxde',
        };

        if (user) {
          return user;
        }

        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
