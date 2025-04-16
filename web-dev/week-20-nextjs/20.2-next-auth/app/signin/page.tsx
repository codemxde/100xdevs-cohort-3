'use client';

import axios from 'axios';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function Signin() {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [signin, setSignin] = useState(false);

  useEffect(() => {
    const signinFn = async () => {
      if (signin) {
        const response = await axios.post('http://localhost:3000/api/signin', {
          username: usernameRef.current?.value,
          password: passwordRef.current?.value,
        });

        const token = response.data.token;
        localStorage.setItem('token', token);
      }
    };

    signinFn();
  }, [signin]);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="flex flex-col gap-y-7 w-2/6 rounded-lg h-auto items-center border">
        <h1 className="text-4xl mt-10">Sign In</h1>

        <div className=" flex flex-col gap-y-7  w-[50%]">
          <input
            ref={usernameRef}
            className="border rounded-md p-2 outline-none"
            type="text"
            placeholder="username"
          />
          <input
            ref={passwordRef}
            className="border rounded-md p-2 outline-none"
            type="password"
            placeholder="password"
          />
          <button
            onClick={() => {
              setSignin(true);
            }}
            className="p-2 bg-green-600 text-white rounded-lg cursor-pointer"
          >
            Sign in
          </button>
        </div>
        <p className="mb-12">
          Don't have an account?{' '}
          <Link className="underline" href={'/signup'}>
            Signup
          </Link>{' '}
          instead
        </p>
      </div>
    </div>
  );
}
