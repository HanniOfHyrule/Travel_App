import { handleSearch, getCity, updateUI } from "../client/js/app";
import { JSDOM } from "jsdom";

/**
 * @jest-environment jsdom
 */

describe("testing the functionality from the app.js", () => {
  test("can get city from input element in document", () => {
    const dom = new JSDOM(`<div><input id="city" value="London"></div>`);
    handleSearch(dom.window.document).then((city) => {
      expect(city).toBe("London");
    });
  });

  test("can get arrival date from input element in document", () => {
    const dom = new JSDOM(
      `<div><input id="arrival_date" value="11/11/2022"></div>`
    );
    handleSearch(dom.window.document).then((arrival_date) => {
      expect(arrival_date).toBe("11/11/2022");
    });
  });

  test("can get departure date from input element in document", () => {
    const dom = new JSDOM(
      `<div><input id="departure_date" value="15/11/2022"></div>`
    );
    handleSearch(dom.window.document).then((departure_date) => {
      expect(departure_date).toBe("15/11/2022");
    });
  });
});
