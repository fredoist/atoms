exports = async (request, response) => {
  const { q } = request.query;

  const agg = [
    {
      $search: {
        index: 'code',
        text: {
          query: q,
          path: ['code', 'name', 'username'],
        },
      },
    },
    {
      $limit: 10,
    },
    {
      $project: {
        _id: 0,
        code: 1,
        name: 1,
        username: 1,
      },
    },
  ];

  try {
    const db = await context.services.get('mongodb-atlas').db('app');
    const collection = db.collection('components');
    const results = await collection.aggregate(agg).toArray();

    response.setStatusCode(200);
    response.setBody(JSON.stringify(results))
  } catch (e) {
    response.setStatusCode(400);
    response.setBody(error.message);
  }
};
