import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="relative text-3xl top-0 text-center">Header</div>
      {children}
      <div className="relative text-3xl bottom-0 text-center">Footer</div>
    </>
  );
}
