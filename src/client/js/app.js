import { geoNameLocation } from "./apiRequest";

//TODO: use here .addEventlistener() our event listeners can’t go there. Where can we put them? To call that exported function?

const trip = {};

function runTravelInfo(event) {
  event.preventDefault();

  handleSearch(document)
    .then((location) => postContent(location))
    .then((document) => updateUI(location, document))
    .catch((reason) => alert(reason));
  return false;
}

function getCity(document) {
  const location = document.getElementById("city").value;
  console.log(location);
  return location;
}

const handleSearch = async (document) => {
  trip.city = getCity(document);

  const getLocation = await geoNameLocation(trip.city);

  trip.latitude = getLocation.latitude;
  trip.longitude = getLocation.longitude;
  trip.countryCode = getLocation.countryCode;

  console.log(trip);

  updateUI(trip);
};

async function postContent(location) {
  return new Promise((resolve, reject) => {
    if (getCity(location)) {
      fetch("http://localhost:8080/save", {
        method: "POST",
        body: JSON.stringify({ trip: trip }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async function (res) {
        resolve(await res.json());
      });
    } else {
      reject("Please enter a vaild City!");
    }
  });
}

function updateUI(location, document) {
  const allRecentPosts = document.getElementById("allRecentPosts");
  allRecentPosts.innerHTML = "";

  location.forEach(function (element) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("entryHolder");

    newDiv.innerHTML = `
      <div class="arrivalDate"><u>arrival Date:</u> ${element.arrivalDate}</div>
      <div class="departureDate"><u>departure Date:</u> ${element.departureDate}</div>
      <div class="city">My City: ${element.city}</div>`;

    allRecentPosts.appendChild(newDiv);
  });
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

export { runTravelInfo, updateUI, postContent, getCity, handleSearch };
