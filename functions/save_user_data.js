exports = async function onNewCustomFunctionUser({ user }) {
  const internalId = user.id;

  const customFunctionIdentity = user.identities.find((id) => {
    return id.provider_type === "custom-function";
  });
  const externalId = customFunctionIdentity.id;

  const {
    login: username,
    avatar_url,
    name,
    location,
    bio,
  } = await context.http
    .get({
      url: `https://api.github.com/user/${externalId}`,
      headers: {
        Accept: ["application/vnd.github+json"],
      },
    })
    .then((res) => JSON.parse(res.body.text()));

  const mdb = context.services.get("mongodb-atlas");
  const users = mdb.db("app").collection("users");
  return await users.insertOne({
    user_id: internalId,
    external_id: externalId,
    username,
    avatar_url,
    name,
    location,
    bio,
    created_at: new Date(),
  });
};
