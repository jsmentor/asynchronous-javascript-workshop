
export function notFound(req, res) {
  let viewFilePath = '404';
  let statusCode = 404;
  let result = {
    status: statusCode
  };

  res.status(result.status);
  res.render(viewFilePath, (err) => {
    if (err) {
      return res.json(result, result.status);
    }
    res.render(viewFilePath);
  });
};
