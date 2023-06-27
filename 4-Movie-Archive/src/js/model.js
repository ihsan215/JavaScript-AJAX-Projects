import { AJAX } from "./auxiliary/helper.js";
import { MOVIE_URL } from "./config/config.js";
import { API_OPTIONS } from "./config/config.js";
import { MOVIE_INFO_URL } from "./config/config.js";

export const getMovieList = async function (name) {
  const movieData = await AJAX(MOVIE_URL + name, API_OPTIONS);
  return movieData.results;
};

export const getMovieInfo = async function (id) {
  const movieInfo = await AJAX(MOVIE_INFO_URL + id, API_OPTIONS);
  return movieInfo.results;
};
