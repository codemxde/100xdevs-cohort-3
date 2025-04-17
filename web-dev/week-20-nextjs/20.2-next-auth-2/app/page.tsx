'use client';

import { SessionProvider, signIn, signOut, useSession } from 'next-auth/react';

export default function Home() {
  return (
    <SessionProvider>
      <HomeSession />
    </SessionProvider>
  );
}

function HomeSession() {
  const session = useSession();
  return (
    <div>
      <h1>Hi There</h1>
      {session.status === 'authenticated' && (
        <button
          onClick={() => {
            signOut();
          }}
        >
          Sign Out
        </button>
      )}
      {session.status === 'unauthenticated' && (
        <button
          onClick={() => {
            signIn();
          }}
        >
          Signin
        </button>
      )}
    </div>
  );
}
