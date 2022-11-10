import {
  geoNameLocation,
  getWeatherbitForecast,
  getPixabayImage,
} from "./apiRequest";
import {
  getTripStart,
  getTripEnd,
  dayCounter,
  tripStartCounter,
} from "./dateHandler";

function runTravelInfo(event) {
  event.preventDefault();

  handleSearch()
    .then((trip) => updateUI(trip))
    .catch((reason) => console.error(reason));
  return false;
}

function getCity() {
  if (document.getElementById("city").value != null) {
    const trip = document.getElementById("city").value;
    return trip;
  } else {
    console.error("There is something wrong with the City input.");
  }
}
const trip = {
  city: null,
  start: null,
  end: null,
  latitude: null,
  longitude: null,
  countryCode: null,
  temp: null,
  clouds: null,
  imageURL: null,
};

const handleSearch = async () => {
  return new Promise(async (resolve) => {
    trip.city = getCity();
    trip.start = getTripStart();
    trip.end = getTripEnd();

    const getLocation = await geoNameLocation(trip.city);
    trip.latitude = getLocation.latitude;
    trip.longitude = getLocation.longitude;
    trip.countryCode = getLocation.countryCode;

    const { temp, clouds } = await getWeatherbitForecast(
      trip.latitude,
      trip.longitude
    );
    trip.temp = temp;
    trip.clouds = clouds;

    trip.imageURL = await getPixabayImage(trip.city);

    resolve(trip);
  });
};

function updateUI(trip) {
  const allRecentPosts = document.getElementById("allRecentPosts");
  allRecentPosts.innerHTML = "";

  const newDiv = document.createElement("div");
  newDiv.classList.add("entryHolder");

  newDiv.innerHTML = `
  <div class="container">
    <div class="image_container">
    <img class="image" src="${
      trip.imageURL
    }" alt="Image of your Destination"></img></div>
    <div class ="content_container">
    <div class="city">My City: ${trip.city}, ${trip.countryCode}</div>
    <div class="arrivalDate"> Arrival Date: ${getTripStart(trip.start)}</div>
    <div class="departureDate"> Departure Date: ${getTripEnd(trip.end)}</div>
    <div class="counter">Your trip is ${dayCounter(
      trip.start,
      trip.end
    )} days long!</div>
    <div class="weather">Forecast Weather: ${trip.temp}°C</div>
    <div>Clouds: ${trip.clouds}%</div>
    <div>Your trip starts in ${tripStartCounter(trip.start)} days!</div>
    </div>
    </div>
    `;

  allRecentPosts.appendChild(newDiv);
}

document.getElementById("button").addEventListener("click", handleSearch);

export { runTravelInfo, getCity, handleSearch };
