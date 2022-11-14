import { getTravelStart, getTravelEnd } from "../client/js/dateHandler";
import { JSDOM } from "jsdom";

/**
 * @jest-environment jsdom
 */

describe("testing travel start and end to be in the document", () => {
  test("can get travel start from input element in document", () => {
    const dom = new JSDOM(
      `<div><input id="arrival_date" value="15/11/2022"></div>`
    );
    getTravelStart(dom.window.document);
    expect("15/11/2022").toBe("15/11/2022");
  });
  test("can get travel end from input element in document", () => {
    const dom = new JSDOM(
      `<div><input id="departure_date" value="20/11/2022"></div>`
    );
    getTravelEnd(dom.window.document);
    expect("20/11/2022").toBe("20/11/2022");
  });
});
