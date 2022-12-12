exports = async (request, response) => {
  const { q } = request.query;

  const agg = [
    {
      $search: {
        compound: {
          should: [
            {
              autocomplete: {
                path: "name",
                query: q,
              },
            },
            {
              autocomplete: {
                path: "username",
                query: q,
              },
            },
            {
              autocomplete: {
                path: "code",
                query: q,
              },
            },
          ],
        },
      },
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
    const db = await context.services.get("mongodb-atlas").db("app");
    const collection = db.collection("components");
    const results = q
      ? await collection.aggregate(agg).toArray()
      : await collection.find().toArray();

    response.setStatusCode(200);
    response.setBody(JSON.stringify(results));
  } catch (error) {
    response.setStatusCode(400);
    response.setBody(error.message);
  }
};
