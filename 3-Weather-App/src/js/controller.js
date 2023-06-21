import * as model from "./model.js";
import GeoLocation from "./auxiliary/geoLocation.js";
import { renderUI } from "./views/view.js";

// Get Default Pos Weather
const getDefaultPosWeather = async function () {
  // Get Default Pos
  await GeoLocation.init();

  // Assign City
  model.assignCity(GeoLocation.coords.city);

  // Load Default Pos Weather
  await model.loadWeather(GeoLocation.coords.lat, GeoLocation.coords.lon);

  // Render UI
  renderUI(model.state);
};

// Initialize Functions
const init = async function () {
  // Get Defult Weather
  await getDefaultPosWeather();

  // Render Weather
};

init();
