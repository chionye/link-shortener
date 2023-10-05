/** @format */

const Response = require("../utils/Response");
const { sendResponse, sendError, redirectResponse } = new Response();

class URLShortnerController {
  constructor(urlShortnerService) {
    this.urlShortnerService = urlShortnerService;
  }

  handleResponse(res, statusCode, data) {
    if (data.error) {
      sendError(res, statusCode, data.error);
    } else {
      sendResponse(res, statusCode, { url: data.url });
    }
  }

  encode(req, res) {
    const { url } = req.body || "";
    const data = this.urlShortnerService.shortenUrlAndSave(url);
    this.handleResponse(res, data.statusCode, data);
  }

  decode(req, res) {
    const { url } = req.body || "";
    const data = this.urlShortnerService.retrieveDataByShortenedUrl(url);
    data.then((result) => {
      const { originalURL } = result.url;
      this.handleResponse(res, result.statusCode, { url: originalURL });
    });
  }

  async redirect(req, res) {
    const { slug } = req.params;
    const data = await this.urlShortnerService.retrieveDataByIdandUpdate(slug);
    if (!data.error) {
      redirectResponse(res, data.url);
    } else {
      this.handleResponse(res, data.statusCode, data.error);
    }
  }

  statistic(req, res) {
    const { slug } = req.params;
    const data = this.urlShortnerService.retrieveDataById(slug);
    data.then((result) => {
      this.handleResponse(res, result.statusCode, { url: result.url });
    });
  }
  
}

module.exports = URLShortnerController;
