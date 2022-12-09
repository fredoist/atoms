import { api, app } from '@config';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

export default function User() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { username } = useParams<{ username: string }>();
  if (!username) return <Navigate to="/" />;

  useEffect(() => {
    async function getUser() {
      try {
        const req = await fetch(`${api}/user?username=${username}`);
        const user = await req.json();
        setUser(user);
      } catch (error) {
        navigate('/');
      }
    }
    getUser();
  }, [username]);

  if (!user) {
    return (
      <div className="px-4 py-12 mx-auto h-60 max-w-5xl flex flex-col items-center justify-center gap-4 bg-slate-blue/20 animate-pulse rounded-xl" />
    );
  }

  return (
    <>
      <section className="px-4 py-12 mx-auto max-w-5xl flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-spring-green/20 rounded-xl">
        <img
          src={user.avatar_url}
          alt={user.name}
          className="w-24 rounded-full"
        />
        <h1 className="text-2xl text-evergreen font-sans">{user.name}</h1>
        <span className="text-forest-green">{user.bio}</span>
      </section>
    </>
  );
}
