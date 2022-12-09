exports = async (request, response) => {
  const { user_id } = request.query;

  try {
    const components = await context.services
      .get('mongodb-atlas')
      .db('app')
      .collection('components')
      .find(user_id ? { userId: { $eq: user_id } } : {});

    response.setStatusCode(200);
    response.setBody(JSON.stringify(await components.toArray()));
  } catch (e) {
    response.setStatusCode(400);
    response.setBody(error.message);
  }
};
