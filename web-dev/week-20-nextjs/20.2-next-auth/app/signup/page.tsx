import Link from 'next/link';

export default function Signup() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="flex flex-col gap-y-9 w-2/6 rounded-lg h-auto items-center border">
        <h1 className="text-4xl mt-10">Sign Up</h1>

        <div className=" flex flex-col gap-y-7  w-[50%]">
          <input
            className="border rounded-md p-2 outline-none"
            type="text"
            placeholder="username"
          />
          <input
            className="border rounded-md p-2 outline-none"
            type="password"
            placeholder="password"
          />
          <input
            className="border rounded-md p-2 outline-none"
            type="password"
            placeholder="confirm password"
          />
          <button className="p-2 bg-green-600 text-white rounded-lg cursor-pointer">
            Sign in
          </button>
        </div>
        <p className="mb-12">
          Already have an account?{' '}
          <Link href={'/signin'} className="underline">
            Signin
          </Link>{' '}
          instead
        </p>
      </div>
    </div>
  );
}
