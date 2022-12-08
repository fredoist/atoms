import { useEffect, useState } from 'react';
import { useAuth } from '@hooks';
import { useNavigate } from 'react-router-dom';

type Error = {
  type: string;
  description: string;
};

export default function Callback() {
  const { user, login, redirect } = useAuth();
  const [error, setError] = useState<Error | null>(null);
  const [waiting, setWaiting] = useState(false);
  const redirect_uri = redirect();
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.search.includes('error')) {
      const URI = new URLSearchParams(window.location.search);
      const type = URI.get('error') as string;
      const description = URI.get('error_description') as string;
      setError({ type, description });
    }
  }, [window.location.search]);

  useEffect(() => {
    async function loginCallback() {
      const code = new URLSearchParams(window.location.search).get(
        'code'
      ) as string;
      await login(code);
      setWaiting(false);
      navigate('/');
    }
    if (window.location.search.includes('code')) {
      setWaiting(true);
      loginCallback();
    }
  }, [window.location.search]);

  useEffect(() => {
    if (!user?.isLoggedIn && window.location.search === '') {
      window.location.href = redirect_uri as string;
    }
  }, [user, window.location.search]);

  return (
    <div className="px-4 py-24">
      <section className="mx-auto max-w-xl">
        {error && (
          <>
            <span className="text-xs uppercase text-forest-green">
              The following error has ocurred
            </span>
            <h1>{error.type}</h1>
            <p>{error.description}</p>
            <a
              href={redirect_uri}
              className="inline-block mt-12 hover:text-forest-green"
            >
              Try sign in again →
            </a>
          </>
        )}
        {waiting && (
          <>
            <h1>Authenticating</h1>
            <p>Wait while we validate your credentials</p>
          </>
        )}
      </section>
    </div>
  );
}
