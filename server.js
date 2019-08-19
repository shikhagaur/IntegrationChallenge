const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;
var location = require('./readLocationsFromFile');
var apiKeyAccuWeather = 'oAFYsWAhqPCXx7ao8OOz3ZKRtsG95HiO';
var acuWeatherRequest = require('./AccuWeatherAccess');
var bigPandaRequest = require('./BigPandaAccess');
var appKeybigPanda = 'bb0eb030296150f70753b85e331f9d83';

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  acuWeatherRequest.SendAccuWeatherRequest(location.readLocation(), apiKeyAccuWeather)
  .then((accuWeatherResp) => bigPandaRequest.SendBigPandaRequest(accuWeatherResp, appKeybigPanda))
  .then((bigPandaResp) => res.end('Received from BigPanda: \n'+JSON.stringify(bigPandaResp)+'\n'))
  .catch((error) => console.log(error)); //use Then to chain
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
