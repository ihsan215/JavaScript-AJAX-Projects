import { AJAX } from "./auxiliary/helper.js";
import { WEATHER_API_URL, WEATHER_API_PARAM } from "./config/config.js";

export const state = {
  is_day: undefined,
  temperature: undefined,
  time: undefined,
  weathercode: undefined,
  windspeed: undefined,
  city: undefined,
};

// Load Weather to AJAX Call
export const loadWeather = async function (lat, lon) {
  try {
    const data = await AJAX(
      WEATHER_API_URL + `latitude=${lat}&longitude=${lon}` + WEATHER_API_PARAM
    );

    // Assign State Variable
    state.is_day = data.current_weather.is_day;
    state.temperature = data.current_weather.temperature;
    state.time = data.current_weather.time;
    state.weathercode = data.current_weather.weathercode;
    state.windspeed = data.current_weather.windspeed;
  } catch (err) {
    console.log(err);
  }
};

export const assignCity = function (city) {
  state.city = city;
};
