// Require Express to run server and routes
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const fetch = require("node-fetch");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("./dist"));

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
  console.log("Example app listening on port 8080!");
});

// Array that hold the Trips
const trips = [];

//Routes

app.get("/", (req, res) => {
  res.status(200).send("./dist/index.html");
});

app.post("/send", (req, res) => {
  const trip = req.body.trip;
  trips.push(trip);
  res.send(trips);
});
