import { TIMEOUT_SECONDS } from "../config/config.js";

/**
 *
 * @param {Number} s
 * @returns {Promise}
 * @description Sets a timeout limit for AJAX calls
 */

const timeout = function (s) {
  // Return timeout Promise
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, TIMEOUT_SECONDS * 1000);
  });
};

/**
 *
 * @param {String} URL
 * @returns {Object} Ajax response
 * @description it makes an AJAX call and returns the incoming response in JSON format
 */
export const AJAX = async function (URL) {
  try {
    // 1) Make AJAX call with timeout
    const response = await Promise.race([fetch(URL), timeout(TIMEOUT_SECONDS)]);

    // 2) Check response is valid
    if (!response) throw new Error(`Weather data not available !☁️☁️`);

    // 3) Get data as json format
    const data = await response.json();

    // 4) Return data
    return data;
  } catch (err) {
    // 1) Return error
    throw err;
  }
};
