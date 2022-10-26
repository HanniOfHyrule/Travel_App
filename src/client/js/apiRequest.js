const geonamesURL = "http://api.geonames.org/";
const geonamesKey = "hanni";
const geonamesQuery = "searchJSON?formatted=true&q=";

const weatherbitURL = "http://api.weatherbit.io/v2.0/forecast/daily";
const weatherbitKey = process.env.API_WEATHER_KEY;



async function getWeatherbitForecast(latitude, longitude) {
  const endpoint =
    weatherbitURL +
    "?lat=" +
    `${latitude}` +
    "&lon=" +
    `${longitude}` +
    "&key=" +
    weatherbitKey;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ endpoint: endpoint }),
    });
    if (response.ok) {
      return await response.json();
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
  const pixabayURL = "https://pixabay.com/api/?key=";
  const pixabayKey = process.env.API_PIXA_KEY;
  const cityQuery = `&q=${city}&image_type=photo&pretty=true&category=places`;
  const endpoint = pixabayURL + pixabayKey + cityQuery;
  console.log(endpoint);
  try {
    const response = await fetch(endpoint);
    if (response.ok) {
      let jsonResponse = await response.json();
      return jsonResponse.hits[0].webformatURL;
    }
  } catch (error) {
    console.error(error);
  }
}

export { geoNameLocation, getWeatherbitForecast, getPixabayImage };
