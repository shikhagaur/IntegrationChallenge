const http = require('http');

//Define the hostname and port to run the integration server
const hostname = '127.0.0.1';
const port = 3000;
var location = require('./readLocationsFromFile');
var apiKeyAccuWeather = 'yjVovDAkqXCH1o53gDhfZdP5d1MxtHz5'; //API key to access AccuWeather API
var acuWeatherRequest = require('./AccuWeatherAccess');//Include the module
var bigPandaRequest = require('./BigPandaAccess');
var appKeybigPanda = 'bb0eb030296150f70753b85e331f9d83'; //API key to access BigPanda REST API

//Create the localhost server to host/run the integration service
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  //send AccuWeather GET request
  acuWeatherRequest.SendAccuWeatherRequest(location.readLocation(), apiKeyAccuWeather)
  //Once the response comes back from AccuWeather, send the POST request to BigPanda
  .then((accuWeatherResp) => bigPandaRequest.SendBigPandaRequest(accuWeatherResp, appKeybigPanda, location.readLocation()))
  //Once the response comes back from BigPanda, write the response on the screen
  .then((bigPandaResp) => res.end('Alert successfully sent to BigPanda for location '+location.readLocation()))
  //display error messages on the console
  .catch((error) => console.log(error))
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
