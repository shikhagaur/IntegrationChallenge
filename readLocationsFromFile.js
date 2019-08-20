exports.readLocation = function()
{
  //include the module to read files
  const fs = require('fs')

    try {
      //read location data from the locations.txt file
      const data = fs.readFileSync('/Users/suryabh/AccuWeatherIntegration/locations.txt', 'utf8');
      //remove new line characters
      return data.replace(/(\r\n|\n|\r)/gm, "");
    } catch (err) {
      console.error(err);
    }
}
