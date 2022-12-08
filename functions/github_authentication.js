exports = async (payload) => {
  const { code } = payload;
  const client_id = context.values.get('GITHUB_CLIENT');
  const client_secret = context.values.get('GITHUB_SECRET');

  try {
    const { access_token, error, error_description } = await context.http
      .post({
        url: 'https://github.com/login/oauth/access_token',
        headers: {
          'Content-Type': ['application/json'],
          Accept: ['application/json'],
        },
        body: JSON.stringify({
          client_id,
          client_secret,
          code,
        }),
      })
      .then((res) => JSON.parse(res.body.text()));

    if (error) {
      throw new Error(error_description);
    }

    const { id, name } = await context.http
      .get({
        url: 'https://api.github.com/user',
        headers: {
          Accept: ['application/vnd.github+json'],
          Authorization: [`Bearer ${access_token}`],
        },
      })
      .then((res) => JSON.parse(res.body.text()));

    return { id: id.toString(), name };
  } catch (error) {
    throw new Error(error);
  }
};
