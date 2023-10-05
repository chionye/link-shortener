//server must be running to test this
const axios = require("axios");
const { URL } = require("url");

const getPathname = (urlString) => {
  const myURL = new URL(urlString);
  const pathname = myURL.pathname;
  const trimmedPathname = pathname.replace(/^\/+/, "");
  return trimmedPathname;
};

describe("URL Shortener Routes", () => {
  it("should encode a URL with a request body", async () => {
    const url = "https://example.com";

    const res = await axios.post("http://localhost:7000/encode", { url });

    expect(res).toBeTruthy();
    expect(res.status).toBe(200);
  });

  it("should respond with status 200 for POST /decode", async () => {
    const url = "https://example.com";

    const enc = await axios.post("http://localhost:7000/encode", { url });
    const res = await axios.post("http://localhost:7000/decode", {
      url: enc.data.url.shortURL,
    });
    expect(res).toBeTruthy();
    expect(res.status).toBe(200);
  });

  it("should respond with status 200 for GET /statistic/:slug", async () => {
    const url = "https://example.com";
    const enc = await axios.post("http://localhost:7000/encode", { url });
    const id = getPathname(enc.data.url);
    const res = await axios.get(`http://localhost:7000/statistic/${id}`);
    expect(res).toBeTruthy();
    expect(res.status).toBe(200);
  });
});
