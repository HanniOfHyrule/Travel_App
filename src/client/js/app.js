import { geoNameLocation } from "./apiRequest";

//TODO: use here .addEventlistener() our event listeners can’t go there. Where can we put them? To call that exported function?

const trip = {};

function runTravelInfo(event) {
  event.preventDefault();

  handleSearch(document)
    // .then((location) => postContent(location))
    .then((document) => updateUI(location, document))
    .catch((reason) => alert(reason));
  return false;
}

function getCity() {
  if (document.getElementById("city").value != null) {
    const location = document.getElementById("city").value;

    return location;
  }
}

const handleSearch = async (document) => {
  trip.city = getCity(location);

  const getLocation = await geoNameLocation(trip.city);

  trip.latitude = getLocation.latitude;
  trip.longitude = getLocation.longitude;
  trip.countryCode = getLocation.countryCode;

  updateUI(trip);
};

function updateUI(location) {
  const allRecentPosts = document.getElementById("allRecentPosts");
  allRecentPosts.innerHTML = "";

  function createElements(location) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("entryHolder");

    newDiv.innerHTML = `
    <div class="city">My City: ${location.city}, ${location.countryCode}</div>
    

      `;

    allRecentPosts.appendChild(newDiv);
  }
  return createElements(location);
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

export { runTravelInfo, updateUI, getCity, handleSearch };
