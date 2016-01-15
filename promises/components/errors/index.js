exports.notFound = function(req, res) {
  var viewFilePath = '404',
    statusCode = 404,
    result = {
      status: statusCode
    };

  res.status(result.status);
  res.render(viewFilePath, function(err) {
    if (err) {
      return res.json(result, result.status);
    }
    res.render(viewFilePath);
  });
};
