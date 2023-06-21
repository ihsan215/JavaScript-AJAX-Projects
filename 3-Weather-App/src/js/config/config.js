export const TIMEOUT_SECONDS = 5;
export const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast?";
export const WEATHER_API_PARAM =
  "&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m";

export const L2C_API_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client?";
export const L2X_API_PARAM = "&localityLanguage=en";

// Weather Codes Constant
const Weather_Codes = new Map();

Weather_Codes.set(0, "Clear sky");

Weather_Codes.set(1, "Mainly clear");
Weather_Codes.set(2, "Partly cloudy");
Weather_Codes.set(3, "Overcast");

Weather_Codes.set(45, "Fog");
Weather_Codes.set(48, "Depositing rime fog");

Weather_Codes.set(51, "Drizzle light");
Weather_Codes.set(53, "Drizzle moderate");
Weather_Codes.set(55, "Drizzle intensity");

Weather_Codes.set(56, "Freezing Drizzle light");
Weather_Codes.set(57, "Freezing Drizzle intensity");

Weather_Codes.set(61, "Rain slight");
Weather_Codes.set(63, "Rain moderate");
Weather_Codes.set(65, "Rain heavy");

Weather_Codes.set(66, "Freezing Rain light");
Weather_Codes.set(67, "Freezing Rain intensity");

Weather_Codes.set(71, "Snow fall slight");
Weather_Codes.set(73, "Snow fall moderate");
Weather_Codes.set(75, "Snow fall heavy");

Weather_Codes.set(77, "Snow grains");

Weather_Codes.set(80, "Rain showers slight");
Weather_Codes.set(81, "Rain showers moderate");
Weather_Codes.set(82, "Rain showers violent");

Weather_Codes.set(85, "Snow showers slight");
Weather_Codes.set(86, "Snow showers heavy");

Weather_Codes.set(95, "Thunderstorm");

Weather_Codes.set(96, "Thunderstorm slight");
Weather_Codes.set(99, "Thunderstorm heavy");

// Export Weather_Codes
export { Weather_Codes };
