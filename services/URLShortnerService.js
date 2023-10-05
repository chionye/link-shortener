/** @format */

const { URL } = require("url");
const ValidateUrl = require("./validateUrl");
const urlValidator = new ValidateUrl();

class URLShortnerService {
  constructor(storage, idGenerator, baseUrl) {
    this.storage = storage;
    this.idGenerator = idGenerator;
    this.baseUrl = baseUrl;
    this.storage.initializeDatabase();
  }

  shortenUrlAndSave(originalUrl) {
    try {
      urlValidator.setUrl(originalUrl);

      if (!urlValidator.isUrlValid()) {
        return { error: "Invalid Url", statusCode: 422 };
      }

      const id = this.idGenerator.generateID();
      const generatedShortLink = this.generateShortenedUrl(id);

      this.storage.repository.save({
        id,
        shortURL: generatedShortLink,
        originalURL: originalUrl,
        clicks: 0,
        timestamp: new Date().toISOString(),
      });

      return { url: generatedShortLink, statusCode: 200 };
    } catch (error) {
      return { error: `There was an error: ${error}`, statusCode: 500 };
    }
  }

  async retrieveDataById(urlId) {
    try {
      const data = await this.storage.repository.findById(urlId);

      if (!data) {
        return { error: "URL not found", statusCode: 404 };
      }

      return { url: data, statusCode: 200 };
    } catch (error) {
      return { error: `There was an error: ${error}`, statusCode: 500 };
    }
  }

  async retrieveDataByIdandUpdate(url) {
    try {
      const originalURL = await this.storage.repository.findByIdandUpdate(url);

      if (!originalURL) {
        return { error: "URL not found", statusCode: 404 };
      }


      return { url: originalURL, statusCode: 200 };
    } catch (error) {
      return { error: `There was an error: ${error}`, statusCode: 500 };
    }
  }

  retrieveDataByShortenedUrl(url) {
    const urlId = this.extractURLPathname(url);
    return this.retrieveDataById(urlId);
  }

  generateShortenedUrl(id) {
    return `${this.baseUrl}${id}`;
  }

  extractURLPathname(urlString) {
    try {
      const myURL = new URL(urlString);
      const pathname = myURL.pathname;
      const trimmedPathname = pathname.replace(/^\/+/, "");
      return trimmedPathname;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = URLShortnerService;
