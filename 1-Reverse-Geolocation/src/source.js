// Global Variables
const errorAreaDom = document.querySelector(".error-area");
const errorMSGDom = document.querySelector("#error");

// Country Render
const RenderArea = document.querySelector(".country-render-area");

const flagDom = document.querySelector("#flag");
const countryDom = document.querySelector("#country");
const populationDom = document.querySelector("#population");
const languageDom = document.querySelector("#language");
const currencyDom = document.querySelector("#currency");
const capitalDom = document.querySelector("#capital");
const cityDom = document.querySelector("#city");

let map;

class CurrentPos {
  constructor(
    country,
    population,
    city,
    currency,
    language,
    flag,
    borders,
    capital
  ) {
    this.country = country;
    this.population = population;
    this.city = city;
    this.currency = currency;
    this.language = language;
    this.flag = flag;
    this.borders = borders;
    this.capital = capital;
    this.RenderCountry();
  }

  RenderCountry() {
    RenderArea.style.display = "block";
    flagDom.src = this.flag;
    countryDom.innerHTML = this.country;
    populationDom.innerHTML = (this.population / 1_000_000).toFixed(2);
    languageDom.innerHTML = this.language;
    currencyDom.innerHTML = this.currency;
    capitalDom.innerHTML = this.capital;
    cityDom.innerHTML = this.city;
  }
}

// Render Error
const setErrorMsg = function (msg, status) {
  status
    ? (errorAreaDom.style.display = "none")
    : (errorAreaDom.style.display = "block");

  errorMSGDom.innerHTML = msg;
};

// Create Map
const createMap = function (lat, lon, zoom) {
  map = L.map("map").setView([lat, lon], zoom);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  getReverseGeoLocation(lat, lon);
};

// Succes
const succesGetInfo = function (pos) {
  const { latitude: lat, longitude: lon } = pos.coords;
  createMap(lat, lon, 13);
};
const failGetInfo = function (err) {
  console.error(err.message);
  createMap(0, 0, 1);
};

// Get Reverse Geolocation API
const getReverseGeoLocation = async function (lat, lon) {
  try {
    // Send request
    const response = await fetch(
      `https://geocode.xyz/${lat},${lon}?json=1&auth=416538761312609780215x60942`
    );

    // Check response is OK
    if (!response.ok) throw new Error("Country Not Found !!");

    // Get Json Data
    const data = await response.json();
    const country = data.country;
    const city = data.city;

    // Get Country Info
    const countryResponse = await fetch(
      `https://restcountries.com/v3.1/name/${country}`
    );

    // Check response is OK
    if (!countryResponse.ok) throw new Error("Country Info Not Found !!");

    // Get Country Data
    const [countryInfo] = await countryResponse.json();

    // Get Info
    const population = countryInfo.population;
    const currency = Object.values(countryInfo.currencies)[0].name;
    const language = Object.values(countryInfo.languages)[0];
    const flag = countryInfo.flags.png;
    const capital = countryInfo.capital[0];
    const borders = countryInfo.borders;

    const currentPosCl = new CurrentPos(
      country,
      population,
      city,
      currency,
      language,
      flag,
      borders,
      capital
    );

    console.log();
  } catch (err) {
    setErrorMsg(`${err.message}💥💥`);
    console.error(`${err.message}💥💥`);
  }
};

// Get User Location
navigator.geolocation.getCurrentPosition(succesGetInfo, failGetInfo);
