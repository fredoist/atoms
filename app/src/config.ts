import * as Realm from "realm-web";

export const app = new Realm.App({
  id: import.meta.env.VITE_REALM_APP_ID as string,
});
export const api = import.meta.env.VITE_API_ENDPOINT as string;
