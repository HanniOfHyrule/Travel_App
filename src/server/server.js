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

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

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
app.get("/jokes/random", (req, res) => {
  request(
    { url: "https://joke-api-strict-cors.appspot.com/jokes/random" },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error", message: err.message });
      }

      res.json(JSON.parse(body));
    }
  );
});

app.post("/save", (req, res) => {
  if (req.body !== " ") {
    const trip = req.body.trip;
    trips.push(trip);
    res.send(trips);
  } else {
    res.status(400).json("Bad request");
  }
});

// app.post("/forecast", async (req, res) => {
//   if (req.body.endpoint !== " ") {
//     const endpoint = req.body.endpoint;
//     try {
//       const response = await fetch(endpoint);
//       if (response.ok) {
//         const jsonResponse = await response.json();
//         res.status(200).send(jsonResponse);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   } else {
//     res.status(400).json("Bad request");
//   }
// });
