import { handleSearch, getCity, updateUI } from "../client/js/app";

/**
 * @jest-environment jsdom
 */

describe("can run travel metrics", () => {
  test("can get city from input element in document", () => {
    const dom = new JSDOM(`<div><input id="city" value="London"></div>`);
    getCity(dom.window.document).then((travelMetrics) => {
      expect(travelMetrics).toBe("London");
    });
  });

  test("can get arrival date from input element in document", () => {
    const dom = new JSDOM(
      `<div><input id="arrival_date" value="11/11/2022"></div>`
    );

    handleSearch(dom.window.document).then((arrival_date) => {
      expect(arrival_date).toBe("11/11/2022");
    });
  });

  test("can get departure date from input element in document", () => {
    const dom = new JSDOM(
      `<div><input id="departure_date" value="15/11/2022"></div>`
    );

    handleSearch(dom.window.document).then((departure_date) => {
      expect(departure_date).toBe("15/11/2022");
    });
  });

  test("will resolve Promise with metrics response object", async () => {
    const response = { city: "London" };

    global.fetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve(response) })
    );
    await waitFor(() => {
      postContent("London").then((metrics) => {
        expect(metrics).toBe(response);
      });
    });
  });

  test("can update ui with metrics response", () => {
    const travelMetrics = {
      imageURL: "https://foo.bar",
      city: "London",
      start: "11/11/2022",
      end: "15/11/2022",
      latitude: 49.84751,
      longitude: 6.09171,
      countryCode: LU,
      temp: 25,
      clouds: 100,
    };

    const dom = new JSDOM(`<div class="allRecentPosts"><div class="container">
    <div class="image_container">
    <img class="image" src="${
      travelMetrics.imageURL
    }" alt="Image of your Destination"></img></div>
    <div class ="content_container">
    <div class="city">My City: ${travelMetrics.city}, ${
      travelMetrics.countryCode
    }</div>
    <div class="arrivalDate"> Arrival Date: ${getTravelStart(
      travelMetrics.start
    )}</div>
    <div class="departureDate"> Departure Date: ${getTravelEnd(
      travelMetrics.end
    )}</div>
    <div class="counter">Your trip is ${dayCounter(
      travelMetrics.start,
      travelMetrics.end
    )} days long!</div>
    <div class="weather">Forecast Weather: ${travelMetrics.temp}°C</div>
    <div class= "weatherClouds">Clouds: ${travelMetrics.clouds}%</div>
    <div class="travelStart">Your trip starts in ${travelStartCounter(
      travelMetrics.start
    )} days!</div>
    </div>
    </div></div>`);

    updateUI(travelMetrics, dom.window.document);

    expect(dom.window.document.getElementById("image").innerHTML).toBe(
      '"imageURL"'
    );
    expect(dom.window.document.getElementById("city").innerHTML).toBe('"city"');
    expect(dom.window.document.getElementById("arrivalDate").innerHTML).toBe(
      '"start"'
    );
    expect(dom.window.document.getElementById("departureDate").innerHTML).toBe(
      '"end"'
    );
    expect(dom.window.document.getElementById("counter").innerHTML).toBe(
      '"start,end"'
    );
    expect(dom.window.document.getElementById("weather").innerHTML).toBe(
      '"temp"'
    );
    expect(dom.window.document.getElementById("weatherClouds").innerHTML).toBe(
      '"clouds"'
    );
    expect(dom.window.document.getElementById("travelStart").innerHTML).toBe(
      '"start"'
    );
  });
});
