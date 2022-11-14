//geth the arrival date from the input
const getTravelStart = (document) => {
  return new Date(document.getElementById("arrival_date").value);
};

//get the departure date from the input
const getTravelEnd = (document) => {
  return new Date(document.getElementById("departure_date").value);
};

//counts the days of the duration of the journey
const dayCounter = (start, end) => {
  const tripStart = Date.parse(start);
  const tripEnd = Date.parse(end);

  const countdown = tripEnd - tripStart;

  const remainingDays = Math.ceil(countdown / (1000 * 60 * 60 * 24));

  return remainingDays;
};

// counts the days until the trip begins
const travelStartCounter = (start) => {
  const today = new Date();
  const tripStart = Date.parse(start);

  const counter = tripStart - today;

  const remainingDays = Math.ceil(counter / (1000 * 60 * 60 * 24));

  return remainingDays;
};

export { getTravelStart, getTravelEnd, dayCounter, travelStartCounter };
