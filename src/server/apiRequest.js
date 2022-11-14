const fetch = require("node-fetch");
const dotenv = require("dotenv");
dotenv.config();

//API request Weather
exports.getWeatherbitForecast = async function (
  latitude,
  longitude,
  start,
  end
) {
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
      body: JSON.stringify({ endpoint: endpoint }),
    });

    const body = await response.json();
    //filter the date to show the weather on this date
    let filtered = body.data.filter((day) => {
      return new Date(day.datetime) >= start && new Date(day.datetime) <= end;
    });

    if (filtered.length == 0) {
      filtered = body.data;
    }

    const tempStart = filtered[0].temp;
    const tempEnd = filtered[filtered.length - 1].temp;

    return {
      temp: [tempStart, tempEnd].sort(),
      clouds: [filtered[0].clouds, filtered[filtered.length - 1].clouds],
    };
  } catch (error) {
    console.error(error, "There is something wrong with the Weather.");
  }
};

//API request Location and lat, lon incl. countryCode
exports.geoNameLocation = async function (location) {
  const geonamesURL = "http://api.geonames.org/";
  const geonamesKey = process.env.API_GEO_KEY;
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
};
//API request Picture of the Location
exports.getPixabayImage = async function (city) {
  const pixabayURL = "https://pixabay.com/api/?key=";
  const pixabayKey = process.env.API_PIXA_KEY;
  const cityQuery = `&q=${city}&image_type=photo&pretty=true&category=places`;
  const endpoint = pixabayURL + pixabayKey + cityQuery;

  try {
    const response = await fetch(endpoint);

    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse.hits[0].largeImageURL;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
