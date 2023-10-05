class Response {
  sendResponse(res, statusCode, data) {
    res.status(statusCode).json(data);
  }

  sendError(res, statusCode, errorMessage) {
    res.status(statusCode).json({ error: errorMessage });
  }

  redirectResponse(res, url) {
    res.redirect(url);
  }
}
module.exports = Response;