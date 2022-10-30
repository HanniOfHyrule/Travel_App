//API request Weather
async function getWeatherbitForecast(latitude, longitude) {
  const weatherbitURL = "http://api.weatherbit.io/v2.0/forecast/daily";
  const weatherbitKey = process.env.API_WEATHER_KEY;
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
      body: { endpoint: endpoint },
    });
    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    console.error(error, "There is something wrong with the weather request");
  }
}

//API request Location and lat, lon incl. countryCode
async function geoNameLocation(location) {
  const geonamesURL = "http://api.geonames.org/";
  const geonamesKey = "hanni";
  const geonamesQuery = "searchJSON?formatted=true&q=";
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
      const jsonResponse = await response.json();
      return {
        latitude: jsonResponse.geonames[0].lat,
        longitude: jsonResponse.geonames[0].lng,
        countryCode: jsonResponse.geonames[0].countryCode,
      };
    }
  } catch (error) {
    console.log(error);
  }
}
//API request Picture of the Location
async function getPixabayImage(city) {
  const pixabayURL = "https://pixabay.com/api/?key=";
  const pixabayKey = process.env.API_PIXA_KEY;
  const cityQuery = `&q=${city}&image_type=photo&pretty=true&category=places`;
  const endpoint = pixabayURL + pixabayKey + cityQuery;
  try {
    const response = await fetch(endpoint);
    if (response.ok) {
      let jsonResponse = await response.json();
      console.log(jsonResponse)
      return jsonResponse.hits[0].webformatURL;
    }
  } catch (error) {
    console.error(error);
  }
}

export { geoNameLocation, getWeatherbitForecast, getPixabayImage };
