import {
  getTravelStart,
  getTravelEnd,
  dayCounter,
  travelStartCounter,
} from "./dateHandler";

function planningTravel(event) {
  event.preventDefault();

  handleSearch(document)
    .then((travelMetrics) => updateUI(travelMetrics, document))
    .catch((reason) => console.error(reason));

  return false;
}

//get the city input
function getCity(document) {
  if (document.getElementById("city").value != null) {
    const trip = document.getElementById("city").value;
    return trip;
  } else {
    console.error("There is something wrong with the City input.");
  }
}

// handle the API requests and pass the data into travelMetrics
const handleSearch = async (document) => {
  return new Promise(async (resolve) => {
    const city = getCity(document);
    const travelStart = getTravelStart(document);
    const travelEnd = getTravelEnd(document);

    const response = await fetch(`/travel/${city}/${travelStart}/${travelEnd}`);
    const body = await response.json();

    resolve(body);
  });
};

// update the UI
async function updateUI(travelMetrics, document) {
  const newDiv = document.createElement("div");
  const allRecentPosts = document.getElementById("allRecentPosts");
  newDiv.classList.add("entryHolder");

  allRecentPosts.innerHTML = "";

  newDiv.innerHTML = `
  <div class="container">
    <div class="image_container">
    <img class="image" src="${travelMetrics.pictureUrl}" 
    alt="Image of your Destination"></img></div>
    <div class ="content_container">
    <div class="city">My City: ${travelMetrics.city}, ${
    travelMetrics.location.countryCode
  }</div>
    <div class="arrivalDate"> Arrival Date: ${travelMetrics.start}</div>
    <div class="departureDate"> Departure Date: ${travelMetrics.end}</div>
    <div class="counter">Your trip is ${dayCounter(
      travelMetrics.start,
      travelMetrics.end
    )} days long!</div>
    <div class="weather">Forecast Weather: ${travelMetrics.weather.temp}°C</div>
    <div class="weatherClouds">Clouds: ${travelMetrics.weather.clouds}%</div>
    <div class="travelStart">Your trip starts in ${travelStartCounter(
      travelMetrics.start
    )} days!</div>
    </div>
    </div>
    `;

  allRecentPosts.appendChild(newDiv);
}

document.getElementById("button").addEventListener("click", () => {
  handleSearch(document);
});

export { planningTravel, getCity, handleSearch, updateUI };
