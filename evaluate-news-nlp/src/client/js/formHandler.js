import { isValidURL } from "./urlChecker";

function runSentimentAnalysis(event) {
  event.preventDefault();

  handleSubmit(document)
    .then((url) => postContent(url))
    .then((sentiment) => updateUiWithSentiment(sentiment, document))
    .catch((reason) => alert(reason));

  return false;
}

function updateUiWithSentiment(sentiment, document) {
  document.getElementById("results").innerHTML = JSON.stringify(
    sentiment.agreement
  );
  document.getElementById("sentiment").innerHTML = JSON.stringify(
    sentiment.subjectivity
  );
  document.getElementById("polarity").innerHTML = JSON.stringify(
    sentiment.score_tag
  );
  document.getElementById("confidence").innerHTML = JSON.stringify(
    sentiment.confidence
  );
  document.getElementById("irony").innerHTML = JSON.stringify(sentiment.irony);
  document
    .getElementById("results", "sentiment", "polarity", "confidence", "irony")
    .replaceChildren("results", "sentiment", "polarity", "confidence", "irony");
}

async function handleSubmit(document) {
  return new Promise((resolve) => {
    const url = document.getElementById("url").value;

    resolve(url);
  });
}

async function postContent(url) {
  return new Promise((resolve, reject) => {
    if (isValidURL(url)) {
      fetch("/sentiment", {
        method: "POST",
        body: JSON.stringify({ text: url }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async function (res) {
        resolve(await res.json());
      });
    } else {
      reject("Please enter a vaild URL!");
    }
  });
}

export {
  runSentimentAnalysis,
  handleSubmit,
  postContent,
  updateUiWithSentiment,
};
