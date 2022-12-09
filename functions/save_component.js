exports = async (payload) => {
  const { name, code } = payload;
  const user = context.user;
  if (!user) {
    throw new Error("Unauthorized");
  }

  const { user_id, username } = user.custom_data;

  try {
    const mdb = context.services.get("mongodb-atlas");
    const users = mdb.db("app").collection("components");
    const query = { userId: user_id };
    const update = {
      $set: {
        username,
        code,
        name,
        updated_at: new Date(),
      },
    };

    return await users.updateOne(query, update);
  } catch (error) {
    throw new Error(error);
  }
};
