import React from 'react';
import { Link } from 'react-router-dom';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="px-4 py-6">
        <nav className="mx-auto max-w-5xl flex items-center justify-between">
          <Link to="/" className="font-bold">
            atoms
          </Link>
          <Link to="/auth/login" className="hover:text-forest-green">
            Sign in with GitHub
          </Link>
        </nav>
      </header>
      <main role="main">{children}</main>
    </>
  );
}
