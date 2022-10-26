import {
  geoNameLocation,
  getWeatherbitForecast,
  getPixabayImage,
} from "./apiRequest";
import { getTripStart, getTripEnd, dayCounter } from "./dateHandler";

//TODO: use here .addEventlistener() our event listeners can’t go there. Where can we put them? To call that exported function?

const trip = {};

function runTravelInfo(event) {
  event.preventDefault();

  handleSearch(document)
    // .then((location) => postContent(location))
    .then((location) => updateUI(trip, location, image))
    .catch((reason) => alert(reason));
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

const handleSearch = async (document) => {
  trip.city = getCity(trip);
  trip.start = getTripStart();
  trip.end = getTripEnd();

  const getLocation = await geoNameLocation(trip.city);

  trip.latitude = getLocation.latitude;
  trip.longitude = getLocation.longitude;
  trip.countryCode = getLocation.countryCode;

  trip.weatherForecast = await getWeatherbitForecast(
    getLocation.latitude,
    getLocation.longitude
  );

  trip.image = await getPixabayImage(trip.city);

  console.log(trip);

  updateUI(trip, location);
};

function updateUI(trip) {
  const allRecentPosts = document.getElementById("allRecentPosts");
  allRecentPosts.innerHTML = "";

  function createElements(trip) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("entryHolder");

    newDiv.innerHTML = `
    <div class="city">My City: ${trip.city}, ${trip.countryCode}</div>
    <div class="arrivalDate"> Arrival Date: ${getTripStart(trip.start)}</div>
    <div class="departureDate"> Departure Date: ${getTripEnd(trip.end)}</div>
    <div class="counter"> ${dayCounter(
      trip.start,
      trip.end
    )} days until the start of your trip!</div>
    <div class="weather">Forecast Weather: ${trip.data}, ${trip.data}</div>
    <div class="image"> ${trip.city.previewURL}</div>`;

    allRecentPosts.appendChild(newDiv);
  }
  return createElements(trip, location);
}

// const handleSave = async (e) => {
//   e.preventDefault();

//   try {
//     const response = await fetch("https://localhost:8080/save", {
//       method: "POST",
//       credentials: "same-origin",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(entries),
//     });
//     if (response.ok) {
//       const jsonResp = await response.json();
//       updateUI(jsonResp);
//       return jsonResp;
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

// async function postAndFetch() {
//   await geoNameLocation(location).then((location) => {
//     postEntry("/", {
//       arrivalDate: arrivalDate.value,
//       departureDate: departureDate.value,
//       city: location.value,
//     }).then((entries) => {
//       updateUI(entries);
//     }, clearInput());
//   });
// }

document.getElementById("button").addEventListener("click", handleSearch);

export { runTravelInfo, getCity, handleSearch };
