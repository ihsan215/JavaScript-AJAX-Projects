import { L2C_API_URL, L2X_API_PARAM } from "../config/config.js";
import { AJAX } from "./helper.js";
import { TIMEOUT_SECONDS } from "../config/config.js";

class GeoLocation {
  coords = {
    lat: undefined,
    lon: undefined,
    city: undefined,
  };

  constructor() {}

  init() {
    // Get User Coordinates
    navigator.geolocation.getCurrentPosition(
      this._succesLocation2City.bind(this),
      this._failLocation2City.bind(this)
    );

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.coords.lat ? resolve() : reject();
      }, 100);
    });
  }

  async assignLatLon(lat, lon) {
    this.coords.lat = lat;
    this.coords.lon = lon;
    this.coords.city = await this._getCity();
  }

  assignCity(city) {
    this.coords.city = city;
  }

  async _getCity() {
    const data = await AJAX(
      L2C_API_URL + `${this.coords.lat},${this.coords.lon}` + L2X_API_PARAM
    );
    return data.city;
  }

  async _succesLocation2City(pos) {
    this.coords.lat = pos.coords.latitude;
    this.coords.lon = pos.coords.longitude;
    this.coords.city = await this._getCity();
  }

  _failLocation2City(err) {
    throw err;
  }
}

export default new GeoLocation();
