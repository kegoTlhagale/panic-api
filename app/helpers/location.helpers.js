const fetch = require("node-fetch");

exports.fetchLocationName = async (lat, long) => {
    return fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyAklbPfjUxrni5NY8RjQOr3oGCc2k_tUKY`
      )
        .then((response) => response.json())
        .then((responseJson) => {
          return responseJson
        });
};
