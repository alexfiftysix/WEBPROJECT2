var NodeGeocoder = require('node-geocoder');

var options = {
    provider: 'google',
   
    // Optional depending on the providers
    httpAdapter: 'https', // Default
    apiKey: 'AIzaSyDEYnxySz0aKX6cYZPK5iP9dWj7_15btz4', // for Mapquest, OpenCage, Google Premier
    formatter: null         // 'gpx', 'string', ...
  };
   
var geocoder = NodeGeocoder(options);

module.exports = geocoder;
