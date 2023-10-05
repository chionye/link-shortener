const ValidateUrl = require("../../services/validateUrl");

describe("ValidateUrl", () => {
  const urlValidator = new ValidateUrl();

  test("should return true for a valid URL", () => {
    urlValidator.setUrl("https://www.example.com");
    expect(urlValidator.isUrlValid()).toBe(true);
  });

  test("should return false for an invalid URL", () => {
    urlValidator.setUrl("invalid-url");
    expect(urlValidator.isUrlValid()).toBe(false);
  });

  test("should update the URL using setUrl method", () => {
    urlValidator.setUrl("https://www.updated-example.com");
    expect(urlValidator.isUrlValid()).toBe(true);
  });
});