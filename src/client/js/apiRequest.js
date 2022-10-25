const geonamesURL = "http://api.geonames.org/";
const geonamesKey = "hanni";
const geonamesQuery = "searchJSON?formatted=true&q=";

const pixabayURL = "https://pixabay.com/api/?key=";
const pixabayKey = process.env.API_PIXA_KEY;

async function getWeatherbitForecast(latitude, longitude) {
  const weatherbitKey = process.env.API_WEATHER_KEY;
  const endpoint = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${weatherbitKey}`;

  console.log(endpoint);
  try {
    const response = await fetch("/forecast", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(endpoint),
    });
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);

      return JSON.stringify(jsonResponse);
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
  try {
    let response = await fetch(endpoint);
    if (response.ok) {
      let jsonResponse = await response.json();
      return jsonResponse.hits[0].largeImageURL;
    }
  } catch (error) {
    console.error(error);
  }
}

export { geoNameLocation, getWeatherbitForecast, getPixabayImage };
