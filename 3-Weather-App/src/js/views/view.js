import { Weather_Codes } from "../config/config.js";

const CityDom = document.querySelector("#city");
const TemperatureDom = document.querySelector("#temperature");
const WWCodeDom = document.querySelector("#WWCode");
const WindDom = document.querySelector("#Wind");

const resetUI = function () {
  CityDom.innerHTML = "";
  TemperatureDom.innerHTML = "";
  WWCodeDom.innerHTML = "";
  WindDom.innerHTML = "";
};

export const renderUI = function (state) {
  console.log(state);
  resetUI();
  CityDom.innerHTML = state.city;
  TemperatureDom.innerHTML = state.temperature;
  WWCodeDom.innerHTML = Weather_Codes.get(state.weathercode);
  WindDom.innerHTML = state.windspeed + " m/s";
};
