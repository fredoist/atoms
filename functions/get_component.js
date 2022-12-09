exports = async (request, response) => {
  const { user_id, name } = request.query;

  try {
    const component = await context.services
      .get('mongodb-atlas')
      .db('app')
      .collection('components')
      .findOne({ userId: user_id, name });

    response.setStatusCode(200);
    response.setBody(JSON.stringify(component));
  } catch (e) {
    response.setStatusCode(400);
    response.setBody(error.message);
  }
};
