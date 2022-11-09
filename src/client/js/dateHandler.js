const getTripStart = () => {
  const date = document.getElementById("arrival-date").value.split("-");
  return date.join("/");
};
const getTripEnd = () => {
  const date = document.getElementById("departure_date").value.split("-");
  return date.join("/");
};

const dayCounter = (start, end) => {
  const tripStart = Date.parse(start);
  const tripEnd = Date.parse(end);

  const countdown = tripEnd - tripStart;

  const remainingDays = Math.ceil(countdown / (1000 * 60 * 60 * 24));

  return remainingDays;
};

const tripStartCounter = (start) => {
  const today = new Date();
  const tripStart = Date.parse(start);

  const counter = today - tripStart;

  const remainingDays = Math.ceil(counter / (1000 * 60 * 60 * 24));

  return remainingDays;
};

export { getTripStart, getTripEnd, dayCounter, tripStartCounter };
