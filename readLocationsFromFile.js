exports.readLocation = function()
{
  const fs = require('fs')

  try {
    const data = fs.readFileSync('/Users/suryabh/AccuWeatherIntegration/locations.txt', 'utf8')
    //console.log(data)
    return data.replace(/(\r\n|\n|\r)/gm, "");
  } catch (err) {
    console.error(err)
  }
}
