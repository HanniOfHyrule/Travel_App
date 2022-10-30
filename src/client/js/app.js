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

  handleSearch(trip)
    // .then((location) => postContent(location))
    .then((location) => updateUI(trip, location))
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

//TODO:Fehlerbehandlung Try/catch?
const handleSearch = async ( trip) => {
  try {
    trip.city = getCity(trip);
    trip.start = getTripStart();
    trip.end = getTripEnd();
  } catch (error) {
    console.error(
      error,
      alert("There is something wrong with the entered Trip data.")
    );
  }
  try {
    trip.city = getCity(trip)
    const getLocation = await geoNameLocation(trip.city);
    trip.latitude = getLocation.latitude;
    trip.longitude = getLocation.longitude;
    trip.countryCode = getLocation.countryCode;

    trip.temp = await getWeatherbitForecast(
      getLocation.latitude,
      getLocation.longitude
    );
    trip.clouds = await getWeatherbitForecast(getLocation.latitude,
      getLocation.longitude);
  } catch (error) {
    console.error(error, "There is no current or forecast weather here.");
  }
  try {
    trip.imageURL = await getPixabayImage(trip.city);
  } catch (error) {
    console.error(error, "Sorry, we don't have a photo for you!");
  }
  updateUI(trip, location);
};


function updateUI(trip) {
  const allRecentPosts = document.getElementById("allRecentPosts");
  allRecentPosts.innerHTML = "";

  function createElements(trip) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("entryHolder");

    newDiv.innerHTML = `
    <div class="image" src="${trip.imageURL}">Image of your Destination: </div>
    <div class="city">My City: ${trip.city}, ${trip.countryCode}</div>
    <div class="arrivalDate"> Arrival Date: ${getTripStart(trip.start)}</div>
    <div class="departureDate"> Departure Date: ${getTripEnd(trip.end)}</div>
    <div class="counter"> ${dayCounter(
      trip.start,
      trip.end
    )} days until the start of your trip!</div>
    <div class="weather">Forecast Weather: ${trip.temp.data[0].app_max_temp}°C</div>
    <div> Clouds: ${trip.clouds.data[0].clouds}%</div>
    `;

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
