//API request Weather
async function getWeatherbitForecast(latitude, longitude) {
  // const weatherbitURL = "http://api.weatherbit.io/v2.0/forecast/daily";
  // const weatherbitKey = process.env.API_WEATHER_KEY;
  // const endpoint =
  //   weatherbitURL +
  //   "?lat=" +
  //   `${latitude}` +
  //   "&lon=" +
  //   `${longitude}` +
  //   "&key=" +
  //   weatherbitKey;

  try {
    // const response = await fetch(endpoint, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ endpoint: endpoint }),
    // });
    const response = {
      data: [
        {
          valid_date: "2017-04-01",
          ts: 1503954000,
          datetime: "2017-04-01",
          wind_gust_spd: 16.7,
          wind_spd: 6.4,
          wind_dir: 45,
          wind_cdir: "NE",
          wind_cdir_full: "northeast",
          temp: 25,
          max_temp: 30,
          min_temp: 26,
          high_temp: 30,
          low_temp: 24.5,
          app_max_temp: 30.64,
          app_min_temp: 23.64,
          pop: 0,
          precip: 0,
          snow: 0,
          snow_depth: 0,
          slp: 1017,
          pres: 1003.5,
          dewpt: 17.8,
          rh: 64.3,
          weather: {
            icon: "c04d",
            code: "804",
            description: "Overcast clouds",
          },
          clouds_low: 25,
          clouds_mid: 100,
          clouds_hi: 50,
          clouds: 100,
          vis: 10,
          max_dhi: 178,
          uv: 2,
          moon_phase: 0.99,
          moon_phase_lunation: 0.48,
          moonrise_ts: 1530341260,
          moonset_ts: 1530351260,
          sunrise_ts: 1530321260,
          sunset_ts: 1530391260,
        },
      ],
      city_name: "Raleigh",
      lon: "-78.63861",
      timezone: "America/New_York",
      lat: "35.7721",
      country_code: "US",
      state_code: "NC",
    };

    if (response) {
      return {
        temp: response.data[0].temp,
        clouds: response.data[0].clouds,
      };
      //TODO: echte API siehe oben = mach es genau so!
      // return await response.json();
    }
  } catch (error) {
    console.error(error, "There is something wrong with the Weather.");
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
      const jsonResponse = await response.json();
      return jsonResponse.hits[0].largeImageURL;
    } //TODO: WAS ist wenn er nix findet?
  } catch (error) {
    console.error(error);
  }
}

export { geoNameLocation, getWeatherbitForecast, getPixabayImage };
