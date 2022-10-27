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

  const countdown = tripStart - tripEnd;

  const remainingDays = Math.ceil(countdown / 86400000);

  return remainingDays;
};

export { getTripStart, getTripEnd, dayCounter };

//TODO: its not working! Check again! still -7days remaining
