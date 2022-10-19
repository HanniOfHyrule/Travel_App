var path = require("path");
const fetch = require("node-fetch");
const express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

//My personal API KEY stored in an enviroment variable
const dotenv = require("dotenv");
dotenv.config();
const apiKey = process.env.API_LICENSE_KEY;

const app = express();
app.use(express.static("dist"));
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

console.log(__dirname);

app.post("/sentiment", async function (req, res) {
  const sentimentResponse = await analyseSentiment(req.body.text);
  res.json(sentimentResponse);
});

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
  console.log("Example app listening on port 8080!");
});

async function analyseSentiment(url) {
  try {
    const responseURL = await fetch(url);
    const bodyURL = await responseURL.text();

    const formdata = new URLSearchParams();
    formdata.append("key", `${apiKey}`);
    formdata.append("txt", bodyURL);
    formdata.append("lang", "auto");

    const response = await fetch("https://api.meaningcloud.com/sentiment-2.1", {
      method: "POST",
      body: formdata,
      redirect: "follow",
    });
    const body = await response.json();

    return body;
  } catch (error) {
    console.error(error);
  }
}
