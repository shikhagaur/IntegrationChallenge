//create a function to send a POST request to BigPanda API to create alerts
exports.SendBigPandaRequest = function(accuWeatherResponse, appKeybigPanda, locationKey)
{
  //define parameters to construct https request to BigPanda API
  var bigPandaUrl = 'api.bigpanda.io';
  const https = require('https'); //include the https nodejs library

  //Add the required fields to BigPanda payload
  accuWeatherResponse[0].app_key = appKeybigPanda;
  accuWeatherResponse[0].status = 'critical';//'status' must exist and be one of: ok,ok-suspect,warning,warning-suspect,critical,critical-suspect,unknown,acknowledged,oksuspect,warningsuspect,criticalsuspect,ok_suspect,warning_suspect,critical_suspect,ok suspect,warning suspect,critical suspect
  accuWeatherResponse[0].host = 'New York';
  accuWeatherResponse[0].check = 'Weather Check';
  accuWeatherResponse[0].incident_identifier = locationKey;
  delete accuWeatherResponse[0].Temperature;
  var weatherData = JSON.stringify(accuWeatherResponse[0]); //see here how to run one after another one
  console.log('\n'+weatherData);
  var options = {
    hostname: bigPandaUrl,
    port: 443,
    path: '/data/v2/alerts',
    method: 'POST',
    headers: {
         'Authorization': 'Bearer 28745ebe3fe6feaae3815a68f37a88ba',
         'Content-Type': 'application/json',
         'Content-Length': weatherData.length
       }
  };

return new Promise(function(resolve, reject) {
    //create https request
    var bigPandaPostRequest = https.request(options, (bigPandaResponse) => {
      console.log('statusCode:', bigPandaResponse.statusCode);
      console.log('headers:', bigPandaResponse.headers);

      //parse the response and write it to standard output
      bigPandaResponse.on('data', (d) => {
        process.stdout.write(d);
      });
    });

    //log the error to the console
    bigPandaPostRequest.on('error', (e) => {
      console.error(e);
      reject(e);
    });

    //send https request
    bigPandaPostRequest.write(weatherData);
    bigPandaPostRequest.end();
    resolve();
  });
};
