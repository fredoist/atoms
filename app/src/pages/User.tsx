import { api } from '@config';
import { ComponentCard, SandpackEditor } from '@components';
import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';

export default function User() {
  const [user, setUser] = useState<any>(null);
  const [components, setComponents] = useState<any>([]);
  const { username } = useParams<{ username: string }>();
  if (!username) return <Navigate to="/" />;

  useEffect(() => {
    async function getUser() {
      try {
        const req = await fetch(`${api}/user?username=${username}`);
        const user = await req.json();
        setUser(user);

        if (user) {
          const req = await fetch(`${api}/components?user_id=${user.user_id}`);
          const data = await req.json();
          setComponents(data);
          console.log(data);
        }
      } catch (error) {
        console.error(error);
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
    <div className="mx-auto max-w-5xl">
      <section className="px-4 py-12 flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-spring-green/20 rounded-xl">
        <img
          src={user.avatar_url}
          alt={user.name}
          className="w-24 rounded-full"
        />
        <h1 className="text-2xl text-evergreen font-sans">{user.name}</h1>
        <span className="text-forest-green">{user.bio}</span>
      </section>
      <section className="py-24 text-evergreen grid md:grid-cols-2 gap-8">
        {components?.map((component: any) => (
          <ComponentCard
            key={component.name}
            name={component.name}
            code={component.code}
            username={component.username}
          />
        ))}
      </section>
    </div>
  );
}
