//create a function to send a GET request to AccuWeather API and retrieve the response
exports.SendAccuWeatherRequest = function(location, apiKey)
{
  var AccuWeatherUrl = 'dataservice.accuweather.com';//+'&details=true';
  const http = require('http'); //include the https nodejs library
  var options = {
    hostname: AccuWeatherUrl,
    port: 80, //default http port
    path: '/currentconditions/v1/'+location+'?apikey='+apiKey, //AccuWeather Url for current location uses the lcoation and Api Key parameters
    method: 'GET'
  };

  //create a promise function to return the result/error before the POST request is made to BigPanda
  return new Promise(function(resolve, reject) {
    const responseData = [];
    //create https request
    var accuWeatherGetRequest = http.request(options, (accuWeatherResponse) => {
      console.log('statusCode:', accuWeatherResponse.statusCode);
      console.log('headers:', accuWeatherResponse.headers);

      //parse the response and write it to the response data object and the standard output
      accuWeatherResponse.on('data', (d) => {
        responseData.push(d);
        process.stdout.write(d);
      });

      //return the response data object from the promise function when the query completes
      accuWeatherResponse.on('end', (d) => {
        resolve(JSON.parse(responseData));
      });
    });

    //log the error to the console
    accuWeatherGetRequest.on('error', (e) => {
      console.error(e);
      reject(e);
    });

    //send https request
    accuWeatherGetRequest.end();
  })
};
