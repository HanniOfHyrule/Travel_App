// Require Express to run server and routes
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const {
  geoNameLocation,
  getPixabayImage,
  getWeatherbitForecast,
} = require("./apiRequest");

const port = 8080;

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

//Routes
app.get("/travel/:city/:start/:end", async function (req, res) {
  const location = await geoNameLocation(req.params.city);
  const weather = await getWeatherbitForecast(
    location.latitude,
    location.longitude,
    end
  );
  const pictureUrl = await getPixabayImage(req.params.city);

  res.send({
    city: req.params.city,
    start: req.params.start,
    end: req.params.end,
    weather,
    pictureUrl,
    location,
  });
});

// designates what port the app will listen to for incoming requests
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Travel app listening on port ${port}`);
  });
}
