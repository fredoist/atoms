import { useAuth } from '@hooks';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();

  return (
    <>
      <header className="px-4 py-6">
        <nav className="mx-auto max-w-5xl flex items-center justify-between">
          <Link to="/" className="font-bold">
            atoms
          </Link>
          {user?.isLoggedIn ? (
            <div className="flex items-center gap-x-4">
              <Link to="/create" className="text-forest-green hover:bg-forest-green/10 py-px px-2 rounded-xl transition-colors">+ Create</Link>
              <details role="list" className="relative group">
                <summary className="hover:text-forest-green cursor-pointer list-none flex items-center gap-1">
                  <img
                    src={user.customData.avatar_url as string}
                    alt={user.profile.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 group-open:rotate-180 transition-transform duration-200"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </summary>
                <ul className="absolute right-0 translate-y-1 z-10 border border-evergreen bg-white w-28 py-2 rounded-xl">
                  <li>
                    <Link
                      to={`/@${user.customData.username}`}
                      className="py-px px-4 block text-right hover:bg-forest-green/10 hover:text-evergreen"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <a
                      role="button"
                      onClick={logout}
                      className="py-px px-4 block text-right hover:bg-forest-green/10 hover:text-evergreen"
                    >
                      Log Out
                    </a>
                  </li>
                </ul>
              </details>
            </div>
          ) : (
            <Link to="/auth" className="hover:text-forest-green">
              Sign in with GitHub
            </Link>
          )}
        </nav>
      </header>
      <main role="main">{children}</main>
    </>
  );
}
