const API_KEY = "3265874a2c77ae4a04bb96236a642d2f";
const urlToDay = (location) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;

const urlDays = (location) =>
  `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}`;

const search = document.querySelector("#search");
const form = document.querySelector("#form");
const main = document.querySelector("#main");
const container = document.querySelector("#container");

async function getLocation(location) {
  const resp = await fetch(urlToDay(location), { origin: "cors" });
  const respData = await resp.json();
  console.log(respData, KtoC(respData.main.temp));

  addWeatherToPage(respData);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchLocation = search.value;
  if (searchLocation) {
    getLocation(searchLocation);
    GetWeatherDays(searchLocation);
    console.log(searchLocation);
    search.value = "";
  }
});

function addWeatherToPage(data) {
  const temp = KtoC(data.main.temp);

  const weather = document.createElement("div");
  weather.classList.add("weather");

  weather.innerHTML = `
  <h4>${data.name}</h4> <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"  />  ${temp}°C</h2>
  <small>${data.weather[0].description}</small>
  `;
  // --------Cleanup--------
  main.innerHTML = "";
  //-----------------------

  main.appendChild(weather);
}

async function GetWeatherDays(location) {
  const resp = await fetch(urlDays(location));
  const respData = await resp.json();

  console.log(respData, KtoC(respData.list[0].main.temp));

  addWeatherDays(respData);
}

function addWeatherDays(data) {
  console.log(data.list.length);
  container.innerHTML = `<h2>5 DAY FORECAST</h2>`;

  for (let i = 1; i <= data.list.length; i = i + 8) {
    console.log(data.list.length);

    const temp = KtoC(data.list[i].main.temp);
    let date = new Date(data.list[i].dt_txt);
    let WeekDays = date.getDay();

    let WeekDay = getWeekDay(WeekDays);

    const weatherDays = document.createElement("div");
    weatherDays.classList.add("weatherDays");

    weatherDays.innerHTML = `
   <h4>${WeekDay}</h4><h2> ${temp}°C </h2><img src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png"  />`;

    container.appendChild(weatherDays);
  }
}

function KtoC(K) {
  return Math.floor(K - 273.15);
}

function getWeekDay(WeekDays) {
  let days = [
    "Sunday",
    "Monday",
    "Tuestday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[WeekDays];
}
