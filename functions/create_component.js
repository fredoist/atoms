exports = async (payload) => {
  const { name, code } = payload;
  const user = context.user;
  if (!user) {
    throw new Error("Unauthorized");
  }

  const { user_id, username } = user.custom_data;

  try {
    const { insertedId } = await context.services
      .get("mongodb-atlas")
      .db("app")
      .collection("components")
      .insertOne({
        userId: user_id,
        username,
        name,
        code,
        createdAt: new Date(),
      });
    return { id: insertedId.toString(), name };
  } catch (error) {
    throw new Error(error);
  }
};
