const geonamesURL = "http://api.geonames.org/";
const geonamesKey = "hanni";
const geonamesQuery = "searchJSON?formatted=true&q=";

const weatherbitURL = "http://api.weatherbit.io/v2.0/forecast/daily";
const weatherbitKey = process.env.API_WEATHER_KEY;

const pixabayURL = "https://pixabay.com/api/?key=";
const pixabayKey = process.env.API_PIXA_KEY;

async function getWeatherbitForecast(latitude, longitude) {
  const endpoint =
    weatherbitURL +
    "?lat=" +
    `${latitude}` +
    "&lon=" +
    `${longitude}` +
    "&key=" +
    weatherbitKey;
  console.log(endpoint);
  try {
    const response = await fetch("http://localhost:8080/forecast", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ endpoint: endpoint }),
    });
    if (response.ok) {
      const jsonRes = await response.json();
      console.log(jsonRes);

      return JSON.stringify(jsonRes);
    }
  } catch (error) {
    console.error(error);
  }
}

async function geoNameLocation(location) {
  const endpoint =
    geonamesURL +
    geonamesQuery +
    location +
    "&username=" +
    geonamesKey +
    "&style=full";
  try {
    const response = await fetch(endpoint);
    if (response.ok) {
      const location = {};
      const jsonResponse = await response.json();

      location.latitude = jsonResponse.geonames[0].lat;
      location.longitude = jsonResponse.geonames[0].lng;
      location.countryCode = jsonResponse.geonames[0].countryCode;
      return location;
    }
  } catch (error) {
    console.log(error);
  }
}

async function getPixabayImage(city) {
  const cityQuery = `&q=${city}&image_type=photo&pretty=true&category=places`;
  const endpoint = pixabayURL + pixabayKey + cityQuery;
  console.log(endpoint);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(endpoint),
    });
    if (response.ok) {
      let jsonResponse = await response.json();
      return jsonResponse.hits[0].largeImageURL;
    }
  } catch (error) {
    console.error(error);
  }
}

export { geoNameLocation, getWeatherbitForecast, getPixabayImage };
