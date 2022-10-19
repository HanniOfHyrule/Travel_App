import { JSDOM } from "jsdom";
import runtime from "regenerator-runtime";
import { handleSubmit, postContent } from "../client/js/formHandler";
import { updateUiWithSentiment } from "../client/js/formHandler";

/**
 * @jest-environment jsdom
 */

describe("can run sentiment analysis", () => {
  test("can get url from input element in document", () => {
    const dom = new JSDOM(
      `<div><input id="url" value="https://foo.bar"></div>`
    );

    handleSubmit(dom.window.document).then((url) => {
      expect(url).toBe("https://foo.bar");
    });
  });

  test("will reject Promise if url is not valid", () => {
    expect(postContent("foobar")).rejects.toEqual("Please enter a vaild URL!");
  });

  test("will resolve Promise with sentiment response object", () => {
    const response = { foo: "bar" };

    global.fetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve(response) })
    );

    postContent("https://foobar.com").then((sentiment) => {
      expect(sentiment).toBe(response);
    });
  });

  test("can update ui with sentiment response", () => {
    const sentiment = {
      agreement: "agreement",
      subjectivity: "subjectivity",
      score_tag: "score_tag",
      confidence: "confidence",
      irony: "irony",
    };

    const dom = new JSDOM(
      `<div>
        <div id="results"></div>
        <div id="sentiment"></div>
        <div id="polarity"></div>
        <div id="confidence"></div>
        <div id="irony"></div>
      </div>`
    );

    updateUiWithSentiment(sentiment, dom.window.document);

    expect(dom.window.document.getElementById("results").innerHTML).toBe(
      '"agreement"'
    );
    expect(dom.window.document.getElementById("sentiment").innerHTML).toBe(
      '"subjectivity"'
    );
    expect(dom.window.document.getElementById("polarity").innerHTML).toBe(
      '"score_tag"'
    );
    expect(dom.window.document.getElementById("confidence").innerHTML).toBe(
      '"confidence"'
    );
    expect(dom.window.document.getElementById("irony").innerHTML).toBe(
      '"irony"'
    );
  });
});
