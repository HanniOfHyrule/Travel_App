const geonamesURL = "http://api.geonames.org/";
const geonamesKey = "hanni";
const geonamesQuery = "searchJSON?formatted=true&q=";

async function geoNameLocation(location) {
  const endpoint =
    geonamesURL +
    geonamesQuery +
    location +
    "&username=" +
    geonamesKey +
    "&style=full";
  console.log(endpoint);
  try {
    const response = await fetch(endpoint);
    if (response.ok) {
      const location = {};
      const jsonResponse = await response.json();

      location.latitude = jsonResponse.geonames[0].lat;
      location.longitude = jsonResponse.geonames[0].lng;
      location.countryCode = jsonResponse.geonames[0].countryCode;

      console.log(location);
      console.log(jsonResponse);
      return location;
    }
  } catch (error) {
    console.log(error);
  }
}

export { geoNameLocation };
