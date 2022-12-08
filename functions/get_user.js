exports = async (request, response) => {
  const { username } = request.query;

  try {
    const user = await context.services
      .get('mongodb-atlas')
      .db('app')
      .collection('users')
      .findOne({ username });

    response.setStatusCode(200);
    response.setBody(JSON.stringify(user));
  } catch (e) {
    response.setStatusCode(400);
    response.setBody(error.message);
  }
};
