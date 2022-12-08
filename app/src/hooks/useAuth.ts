import { useEffect, useState } from 'react';
import * as Realm from 'realm-web';
import { entity } from 'simpler-state';

const app = new Realm.App({ id: import.meta.env.VITE_REALM_APP_ID as string });
const client_id = import.meta.env.VITE_GITHUB_CLIENT as string;
const user = entity<Realm.User | null>(null);

export default function useAuth() {
  useEffect(() => {
    if (app.currentUser?.isLoggedIn) {
      user.set(app.currentUser);
    }
  }, [app]);

  const login = async (code: string) => {
    const credentials = Realm.Credentials.function({ code });
    const currentUser = await app.logIn(credentials);
    user.set(currentUser);
  };

  const logout = async () => {
    await app.currentUser?.logOut();
    user.set(null);
  };

  const redirect = () => {
    const uri = new URL('/login/oauth/authorize', 'https://github.com');
    uri.searchParams.set('client_id', client_id);
    uri.searchParams.set('scope', 'read:user');
    return uri.toString();
  };

  return { user: user.use(), login, logout, redirect };
}
