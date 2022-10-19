import { isValidURL } from "../client/js/urlChecker";

describe("testing URL validation", () => {
  test("Should be defined", () => {
    expect(isValidURL).toBeDefined();
  });
  test("it returns true when the url are entered", () => {
    const urls = [
      "https://example.com",
      "http://example.com",
      "example.com",
      "example.com/path",
      "https://www.example.com",
      "www.example.com",
    ];
    urls.forEach((url) => {
      expect(isValidURL(url)).toBeTruthy;
    });
  });
});
